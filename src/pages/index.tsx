import { useRouter } from 'next/router';

import { Center, Text, VStack } from '@chakra-ui/layout';
import { Fade } from '@chakra-ui/transition';
import { Progress } from '@chakra-ui/progress';

import { useEffect, useState } from 'react';
import { AiFillApple } from 'react-icons/ai';

export default function Index() {
  const [loading, setLoading] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      loading <= 100
        ? setLoading(loading + Math.floor(Math.random() * (20 - 1) + 1))
        : setTimeout(() => {
            router.push(`/home`);
          }, 500);
    }, 300);
  }, [loading]);

  return (
    <Center w="full" h="100vh">
      <Fade in={loading >= 0 && loading <= 100}>
        <VStack spacing={10}>
          <AiFillApple size={60} />
          <Text textAlign="center">
            Hello recruiter, alright!?...
            <br /> My portfolio is loading...
          </Text>

          <Progress
            w="full"
            mb={10}
            size="xs"
            colorScheme="purple"
            value={loading}
          />
        </VStack>
      </Fade>
    </Center>
  );
}
