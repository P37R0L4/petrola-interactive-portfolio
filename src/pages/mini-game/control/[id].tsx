import { useColorMode } from '@chakra-ui/color-mode';
import { Center, VStack, Icon, Button, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';

export default function Control() {
  const { asPath } = useRouter();
  const { setColorMode } = useColorMode();
  const [started, setStarted] = useState(false);

  const { query } = useRouter();

  useEffect(() => {
    setColorMode('dark');
  }, [asPath]);

  async function startGame() {
    const hasStarted: number = started ? 0 : 1;
    await fetch(`/api/game-command/started/${query.id}/${hasStarted}`);

    setStarted(hasStarted === 1);
  }

  async function Move(toMove: number) {
    await fetch(`/api/game-command/position/${query.id}/${toMove}`);
  }

  return (
    <VStack w="full" h="90vh" position="absolute" flex={1} p={10}>
      <Center
        onClick={() => {
          Move(-25);
        }}
        as={Button}
        bg="brand.100"
        rounded="lg"
        h="50vh"
        w="full"
      >
        <Icon fontSize={100} as={BiUpArrow} />
      </Center>

      <Center
        onClick={() => startGame()}
        as={Button}
        bg="brand.400"
        rounded="lg"
        h="50vh"
        w="full"
      >
        <Text fontSize={30} transform="rotate(90deg)">
          {started ? 'STOP' : 'START'}
        </Text>
      </Center>

      <Center
        onClick={() => {
          Move(25);
        }}
        as={Button}
        bg="brand.200"
        rounded="lg"
        h="50vh"
        w="full"
      >
        <Icon fontSize={100} as={BiDownArrow} />
      </Center>
    </VStack>
  );
}
