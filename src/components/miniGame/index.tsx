import { Box } from '@chakra-ui/layout';
import { useEffect, useState } from 'react';

interface ContentMinigameProps {
  position: number;
}

export function ContentMinigame({ position }: ContentMinigameProps) {
  const [blink, setBlink] = useState(false);
  const [blinkEminen, setBlinkEminen] = useState(false);
  const [positionEminen, setpPositionEminen] = useState(50);

  useEffect(() => {
    setBlink(true);

    setTimeout(() => {
      setBlink(false);
    }, 20);
  }, [position]);

  useEffect(() => {
    setBlinkEminen(true);

    setTimeout(() => {
      setBlinkEminen(false);
    }, 20);
  }, [positionEminen]);

  useEffect(() => {
    setTimeout(() => {
      if (positionEminen > 10 && positionEminen < 90) {
        setpPositionEminen(positionEminen + 25);
      } else if (positionEminen >= 90) {
        setpPositionEminen(11);
      } else if (positionEminen <= 0) {
        setpPositionEminen(89);
      }
    }, 1000);
  }, [positionEminen]);

  return (
    <Box
      w="full"
      h="full"
      overflowY="scroll"
      rounded="lg"
      _after={{
        content: '""',
        width: '50%',
        height: '100%',
        position: 'absolute',
        borderRight: '1px solid #FEE440',
      }}
    >
      <Box
        transition="0.5"
        opacity={blink ? 0 : 1}
        position="relative"
        top={`calc(${position}% - 10rem)`}
        h="10rem"
        w={3}
        bg="brand.100"
        rounded="sm"
        float="left"
      />

      <Box
        transition="0.5"
        opacity={blinkEminen ? 0 : 1}
        position="relative"
        top={`calc(${positionEminen}% - 10rem)`}
        h="10rem"
        w={3}
        bg="brand.200"
        rounded="sm"
        float="right"
      />
    </Box>
  );
}
