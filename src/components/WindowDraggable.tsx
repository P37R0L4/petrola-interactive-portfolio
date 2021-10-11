import { Flex, HStack, Box, Image } from '@chakra-ui/react';

import Draggable from 'react-draggable';

export function WindowDraggable() {
  return (
    <Draggable defaultPosition={{ x: 0, y: 0 }}>
      <Flex
        shadow="dark-lg"
        w="40rem"
        h="24rem"
        border="2px solid #000"
        rounded={8}
        bg="base.200"
        direction="column"
      >
        <HStack
          alignItems="center"
          justifyContent="flex-start"
          px={4}
          w="full"
          bg="brand.100"
          borderBottom="1px solid #000"
          h={8}
          roundedTop={8}
        >
          <Box w={4} h={4} rounded="full" bg="green.400" />
          <Box w={4} h={4} rounded="full" bg="yellow.400" />
          <Box w={4} h={4} rounded="full" bg="red.400" />
        </HStack>

        <Image
          boxSize="24rem"
          src="/images/linkedin_profile_print.png"
          w="full"
          roundedBottom={8}
        />
      </Flex>
    </Draggable>
  );
}
