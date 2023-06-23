import React from 'react'
import { Button, ButtonGroup, Stack, Flex, Spacer } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import { Outlet, Link } from 'react-router-dom'
import { PageNotFoundSVG } from '../components/404svg'

const NoPage = () => {
	return (
		<div>
			<Heading as='h1' size='lg' className='flex justify-center mx-auto py-10'>
				Error 404: Page Not Found
			</Heading>
			<div className='flex justify-center my-10'>
				<PageNotFoundSVG />
			</div>
			<div className='flex justify-center mx-auto flex-col w-1/3'>
				<Link to='/' className='flex'>
					<Button className='my-5 py-5' width='100%'>
						Return
					</Button>
				</Link>
			</div>
		</div>
	)
}

export default NoPage
