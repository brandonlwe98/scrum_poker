import { Button, Input, VStack, HStack, Box, Text, Flex, Spacer, IconButton, Tooltip} from '@chakra-ui/react'
import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'
import { Link, useNavigate} from 'react-router-dom'
import { socket } from '../socket';
import PlayerCard from '../components/PlayerCard';
import { BsClipboard } from 'react-icons/bs';
import * as Toastr from 'toastr'
import '../styles/toastr.css'

const Room = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState([]);
    const {state} = useLocation();
    const navigate = useNavigate();
    const [roundStart, setRoundStart] = useState(0);
    const [averageStory, setAverageStory] = useState(0);
    const [playerName, setPlayerName] = useState(state.name);
    const [playerInput, setPlayerInput] = useState(0);
    const [playerRoom, setPlayerRoom] = useState(state.session);
	const [players, setPlayers] = useState([])
    const [isScrumMaster, setIsScrumMaster] = useState(state.scrumMaster)

    useEffect(() => {
        console.log("ROOM STATE", state);

        socket.connect();
        socket.emit("join", {
            username: state.name,
            room: state.session,
            scrumMaster: state.scrumMaster,
            story: 0
        })

        function onConnect() {
            setIsConnected(true);
        }
      
        function onDisconnect() {
            setIsConnected(false);
        }
      
        function onFooEvent(value) {
            setFooEvents(previous => [...previous, value]);
        }

        function onMessageJoin(value) {
            Toastr.success(value)
        }

        function onDisband(value){
            alert(value);
            socket.disconnect();
            navigate('/');
        }
      
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('foo', onFooEvent);

        socket.on('messageJoin', onMessageJoin);

        socket.on('messageLeave', (data) => {
            Toastr.error(data)
        })

        socket.on('roomData', (data) => {
            console.log("CLIENT RECEIVED ROOM DATA ", data)
            setPlayers(data.users)
        })

        socket.on('message', (data) => {
            if(data.roundStart == 0){ //end round
                Toastr.error(data.message);
                setPlayerInput(document.getElementById('playerInput').value);
                console.log("EMITTING UPDATE STORY " + playerName + " IN ROOM " + playerRoom + " WITH STORY " + playerInput)
                socket.emit("updateStory", {
                    username: playerName,
                    room: playerRoom,
                    story: document.getElementById('playerInput').value
                })
            }
            else if(data.roundStart == 1){ //start round
                Toastr.success(data.message)
            }
            setRoundStart(data.roundStart);
        })

        socket.on('disband', onDisband)

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('foo', onFooEvent);
        };
    }, [])

    useEffect(() => {
        console.log("PLAYERS IN ROOM ARE NOW ",players)
        calculateAverage();
    }, [players])

    useEffect(() => {
        console.log("UPDATING PLAYER INPUT TO ",playerInput)
    }, [playerInput])

    function startRound(){
        socket.emit("sendMessage", {
            message: `Scrum Master has started the round for [${document.getElementById('playerInput').value}]`,
            roundStart: 1,
            room: playerRoom
        })
    }

    function endRound(){
        socket.emit("sendMessage", {
            message: `Scrum Master has ended the round!`,
            roundStart: 0,
            room: playerRoom
        })
    }

    function calculateAverage(){
        var sum = 0;
        var count = 0;
        if(players.length <= 2){
            setAverageStory(0); //skip calculating average until at least 2 other players arrive
        }
        else{ //calculate average
            for(const player of players){
                if(player.scrumMaster) //skip scrum master voting
                    continue;
                count++;
                sum+= parseInt(player.story);
            }
            setAverageStory(parseFloat(sum/count).toFixed(2));
        }

    }

    function copyRoom(){
        navigator.clipboard.writeText(playerRoom)
    }

    function leaveRoom(){
        socket.disconnect();
        navigate('/');
    }

    if(!state){ // unable to retrieve room state (refresh page/ etc...)
        alert("Room error")
		window.location.href = "/";
    }

	return (
        <Box py={4}>
            <Flex>
                <Text fontSize="20px" mb={10}>
                    ROOM SESSION: {state.session}
                </Text>
                <Tooltip label="Copy room code" fontSize='md'>
                    <IconButton colorScheme='blue' size='sm' ml={2} icon={<BsClipboard/>} onClick={copyRoom}/>
                </Tooltip>

                <Spacer/>
                <Button colorScheme='red' onClick={leaveRoom}>
                    Leave Room
                </Button>
            </Flex>

            {
                state.scrumMaster ?
                    <HStack mb={5} spacing='20px'>
                        <Button colorScheme="blue" isDisabled={roundStart == 0 ? false : true}
                        onClick={startRound}>
                            Start round
                        </Button>
                        <Button colorScheme="blue" isDisabled={roundStart == 1 ? false : true}
                        onClick={endRound}>
                            End round
                        </Button>
                    </HStack>
                    :
                    <Text>

                    </Text>
            }
            <HStack>
                <VStack w='50%' alignItems='left'>
                    <Box w='50%'>
                        {
                            players.map((player, index) => (
                                <PlayerCard
                                    key={index}
                                    id={player.id}
                                    name={player.username}
                                    input={roundStart == 1 ? '-' : player.story}
                                    scrumMaster={player.scrumMaster}
                                />
                            ))
                        }
                    </Box>
                </VStack>
                <Box w='50%'>
                    <Input id='playerInput' placeholder={isScrumMaster ? 'Enter story/issue name' : 'Enter story points'} size='lg' isDisabled={roundStart == 0 && !isScrumMaster? true : false}/>
                    <Text fontSize='20px' my={5}>
                        Average Story Points: {averageStory}
                    </Text>
                </Box>

            </HStack>
            

        </Box>


	)
}

export default Room
