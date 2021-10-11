import Icon from '@chakra-ui/icon';
import { AiFillLock } from 'react-icons/ai';
import { Flex, Text, ScaleFade } from '@chakra-ui/react';
import { TiArrowBack } from 'react-icons/ti';

interface LockProps {
  locked: boolean;
  lockLineAux?: boolean;
}

export function Lock({ locked, lockLineAux }: LockProps) {
  return (
    <Icon
      as={AiFillLock}
      fontSize={60}
      position="fixed"
      top="110vh"
      left="50vw"
      color="red.400"
      transitionDuration="0.5s"
      opacity={locked ? 1 : 0}
      transform={lockLineAux ? 'translateY(-25vh)' : 'translateY(0)'}
    />
  );
}

export function UnlockedScroll({ locked }: LockProps) {
  return (
    <Flex right={5} bottom={70} position="fixed" w="10rem">
      <ScaleFade in={locked} initialScale={0.6}>
        <Flex lineHeight={0.9} alignItems="flex-end">
          <Text fontSize={30} fontWeight="extrabold" textAlign="right">
            Now u can Scroll
          </Text>

          <Icon
            transform="rotate(90deg) scaleX(-1)"
            fontSize={50}
            as={TiArrowBack}
          />
        </Flex>
      </ScaleFade>
    </Flex>
  );
}
