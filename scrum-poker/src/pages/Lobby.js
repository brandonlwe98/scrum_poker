import { Button, Center, VStack, Box } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Lobby = () => {
	return (
        <Box py={4}>
            <VStack>
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

                {/* <div className='flex flex-col w-96 mx-auto'>
                    <Link className='flex justify-center' to='/'>
                        <Button id="btnSingle" className='my-5 py-7' colorScheme={'green'} w='100%' variant='solid'>
                            <p className='text-xl'>Play Game</p>
                        </Button>
                    </Link> */}
                {/* {sessionStorage.getItem('username') ? <></> : <Box>
                    <Link className='flex justify-center' to='/login'>
                        <Button id="btnCreate" className='my-5 py-7' colorScheme={'green'} variant='outline' w='100%'>
                        <p className='text-xl'>Sign In</p>
                        </Button>
                    </Link>
                    <Link className='flex justify-center' to='/register'>
                        <Button id="btnJoin" className='my-5 py-7' colorScheme={'green'} variant='outline' w='100%'>
                        <p className='text-xl'>Sign Up</p>
                        </Button>
                    </Link>
                </Box>} */}
                {/* </div> */}

        </Box>


	)
}

export default Lobby
