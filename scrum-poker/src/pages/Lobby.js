import { Button, Text, VStack, Box } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Lobby = () => {
	return (
        <Box py={4}>
            <VStack>
                <Text fontSize='38px'>
                    Scrum Poker v1
                </Text>
                <Link to='/host'>
                    <Button size='lg' colorScheme='blue' mx='auto' my='auto'>
                        Host Session
                    </Button>
                </Link>

                <Link to='/join'>
                    <Button size='lg' colorScheme='blue' mx='auto' my='auto'>
                        Join Session
                    </Button>
                </Link>

            </VStack>
        </Box>
	)
}

export default Lobby
