import React from 'react'
import {Input,Box,VStack,Text,Button} from '@chakra-ui/react'
import { Link, useNavigate} from 'react-router-dom'
import { joinRoom } from '../utils/ApiCalls';
import { MdKeyboardBackspace } from "react-icons/md"

const Join = () => {
    const navigate = useNavigate();
    const back = () => {
        navigate(-1);
    }

	return (
		<Box py={4}>
            <VStack alignItems='center'>
                <Box>
                    <Text fontSize='xl'> Join a Session </Text>
                </Box>

                <Box>
                    <Input id='name' placeholder='Enter name' size='lg'/>
                </Box>

                <Box>
                    <Input id='session' placeholder='Enter session' size='lg'/>
                </Box>

                <Box>
                    <Box>
                        <Button size='lg' colorScheme='blue' mx='auto' my='auto'
                        onClick={async () =>{
                            if(document.getElementById('name').value == ""){
                                alert('Name field is not allowed to be empty!')
                            }
                            else if(document.getElementById('session').value == ""){
                                alert('Session field is not allowed to be empty!')
                            }
                            else{
                                var join = await joinRoom(document.getElementById('name').value, document.getElementById('session').value);
                                if(join.status == 200){
                                    navigate('/room', { state: {name: join.name, session: join.session, scrumMaster: false}});
                                }
                                else{
                                    alert('Error joining room: ' + join.message)
                                }
                            }
                        }}>
                            Join Session
                        </Button>
                    </Box>
                </Box>

                <Box>
                    <Button leftIcon={<MdKeyboardBackspace/>} size='lg' colorScheme='blue' mx='auto' my='auto'
                    onClick={back}>
                        Back
                    </Button>
                </Box>
                

            </VStack>

		</Box>
	)
}

export default Join
