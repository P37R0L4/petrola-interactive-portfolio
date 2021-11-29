import { Box, Text, HStack } from '@chakra-ui/layout';
import { useEffect, useState, useContext } from 'react';
import { RecruitersContext } from '../../contexts/RecruitersContextProvider';

interface ContentMinigameProps {
  position: number;
}

let lockpointEminem = true;
let lockpointPlayer = true;

export function ContentMinigame({ position }: ContentMinigameProps) {
  const [blink, setBlink] = useState(false);
  const [blinkEminen, setBlinkEminen] = useState(false);

  const [positionEminen, setpPositionEminen] = useState(50);
  const [ballBositionX, setBallBositionX] = useState(50.5);
  const [ballBositionY, setBallBositionY] = useState(50.5);
  const [invertX, setInvertX] = useState(1);

  const [randomY, setRandomY] = useState(1);

  const [pointsEminen, setPointsEminen] = useState(0);
  const [pointsPlayer, setPointsPlayer] = useState(0);

  const { setMinigamePoints } = useContext(RecruitersContext);

  function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

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
    setMinigamePoints(pointsPlayer);
  }, [pointsPlayer]);

  useEffect(() => {
    setTimeout(() => {
      if (ballBositionX >= 97) {
        setInvertX(-1);
      } else if (ballBositionX <= 3) {
        setInvertX(1);
      }

      if (ballBositionY >= 97) {
        setRandomY(getRandomArbitrary(-1, -3));
      } else if (ballBositionY <= 3) {
        setRandomY(getRandomArbitrary(1, 3));
      }

      if (lockpointEminem) {
        if (
          ballBositionX <= 3 &&
          ((ballBositionY > 0 && ballBositionY < position - 25) ||
            (ballBositionY > position && ballBositionY < 100))
        ) {
          setPointsEminen(pointsEminen + 1);
          lockpointEminem = false;

          setTimeout(() => {
            lockpointEminem = true;
          }, 1000);
        }
      }
      if (lockpointPlayer) {
        if (
          ballBositionX >= 97 &&
          ((ballBositionY > 0 && ballBositionY < positionEminen - 25) ||
            (ballBositionY > positionEminen && ballBositionY < 100))
        ) {
          setPointsPlayer(pointsPlayer + 1);
          lockpointPlayer = false;

          setTimeout(() => {
            lockpointPlayer = true;
          }, 1000);
        }
      }

      setBallBositionY(ballBositionY + randomY);
      setBallBositionX(ballBositionX + invertX);
    }, 50);
  }, [ballBositionX]);

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
      position="relative"
      _after={{
        content: '""',
        width: '50%',
        height: '100%',
        position: 'absolute',
        borderRight: '1px solid #FEE440',
      }}
    >
      <HStack
        justifyContent="space-between"
        w="50%"
        position="absolute"
        left="25%"
        top="5%"
      >
        <Text fontSize={60} fontWeight="bold">
          {pointsPlayer}
        </Text>
        <Text fontSize={60} fontWeight="bold">
          {pointsEminen}
        </Text>
      </HStack>

      <Box
        transition="0.5"
        opacity={blink ? 0 : 1}
        position="relative"
        top={`calc(${position}% - 20%)`}
        h="25%"
        w={3}
        bg="brand.100"
        rounded="sm"
        float="left"
      />

      <Box
        w={3}
        h={3}
        bg="red.300"
        top={`${ballBositionY}%`}
        left={`${ballBositionX}%`}
        position="absolute"
      />

      <Box
        transition="0.5"
        opacity={blinkEminen ? 0 : 1}
        position="relative"
        top={`calc(${positionEminen}% - 20%)`}
        h="25%"
        w={3}
        bg="brand.200"
        rounded="sm"
        float="right"
      />
    </Box>
  );
}
