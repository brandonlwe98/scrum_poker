import { Button, Center, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Lobby = () => {
	return (
        <Center py={4} display={{md:'flex'}} borderWidth={2} borderColor='black'>
            <VStack>
                <Link to='/host'>
                    <Button size='lg' colorScheme='blue' mx='auto'>
                        Host Session
                    </Button>
                </Link>

                <Button size='lg' colorScheme='blue' mx='auto'>
                    Join Session
                </Button>
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

        </Center>


	)
}

export default Lobby
