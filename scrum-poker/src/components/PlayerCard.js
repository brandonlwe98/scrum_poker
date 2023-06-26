import React from 'react'
import { Box, Flex, Spacer, Text } from '@chakra-ui/react'


const PlayerCard = ({ id, name, input, scrumMaster }) => {
    const playerId = id;

    return(
        <Box bg={scrumMaster ? 'tomato' : 'blue.500'} p={4} color='white' mb={5}>
            <Flex>
                <Text>
                    {name}
                </Text>
                <Spacer/>
                {scrumMaster ? 
                    <Text fontWeight='bold'>
                        [Scrum Master]
                    </Text>
                    :
                    <Text fontWeight='bold'>
                        {input}    
                    </Text>
            }

            </Flex>

        </Box>

    )
}

export default PlayerCard
