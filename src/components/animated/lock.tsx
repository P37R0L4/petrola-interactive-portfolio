import Icon from '@chakra-ui/icon';
import { AiFillLock } from 'react-icons/ai';
import { Flex, Text, ScaleFade, useColorModeValue } from '@chakra-ui/react';
import { TiArrowBack, TiArrowForward } from 'react-icons/ti';

interface LockProps {
  locked: boolean;
  lockLineAux?: boolean;
  orietation?: 'horizontal' | 'vertical';
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

export function UnlockedScroll({ locked, orietation = 'vertical' }: LockProps) {
  return (
    <Flex right={5} bottom={70} position="fixed" w="10rem">
      <ScaleFade in={locked} initialScale={0.6}>
        <Flex lineHeight={0.9} alignItems="flex-end">
          <Text
            bg={useColorModeValue('black', 'gray.700')}
            color="white"
            p={2}
            w="8rem"
            h="8rem"
            fontSize={30}
            fontWeight="extrabold"
            textAlign="right"
          >
            Now u can <span style={{ color: '#F15BB5' }}> Scroll</span>
          </Text>

          {orietation === 'vertical' ? (
            <Icon
              transform="rotate(90deg) scaleX(-1)"
              fontSize={50}
              color="brand.200"
              as={TiArrowBack}
            />
          ) : (
            <Icon fontSize={50} color="brand.200" as={TiArrowForward} />
          )}
        </Flex>
      </ScaleFade>
    </Flex>
  );
}
