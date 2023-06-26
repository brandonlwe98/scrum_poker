import React from 'react'
import {Input,Box,VStack,Text,Button} from '@chakra-ui/react'
import { Link, useNavigate} from 'react-router-dom'
import { hostRoom } from '../utils/ApiCalls';
import { MdKeyboardBackspace } from "react-icons/md"

const Host = () => {
    const navigate = useNavigate();
    const back = () => {
        navigate(-1);
    }
	return (
		<Box py={4}>
            <VStack alignItems='center'>
                <Box>
                    <Text fontSize='xl'> Host Session as Scrum Master </Text>
                </Box>

                <Box>
                    <Input id='name' placeholder='Enter name' size='lg'/>
                </Box>

                <Box>
                    <Button size='lg' colorScheme='blue' mx='auto' my='auto'
                    onClick={async () =>{
                        if(document.getElementById('name').value == ""){
                            alert('Name field is not allowed to be empty!')
                            console.log("INVALID name");
                        }
                        else{
                            const res = await hostRoom(document.getElementById('name').value)
                            if(res)
                                navigate('/room', {state: { name: res.name, session: res.session, scrumMaster: true}});
                            else
                                alert("Failed to host room: ");
                        }
                    }}>
                        Start Session
                    </Button>
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

export default Host
