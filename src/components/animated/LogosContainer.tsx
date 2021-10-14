import { Box } from '@chakra-ui/layout';
import { Image, Text, Icon, Tooltip } from '@chakra-ui/react';
import { motion, MotionStyle } from 'framer-motion';

import { DiLinux } from 'react-icons/di';

interface ILogosContainer {
  show: boolean;
}

export function LogosContainer({ show }: ILogosContainer) {
  const turnBackAnimation = { rotate: 0, scale: 0 };
  const defaultBlockStyle = {
    width: '100px',
    height: '100px',
    background: '#00BBF9',
    position: 'absolute',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    color: 'white',
  } as MotionStyle;

  return (
    <Box mt="5rem" w="full" h="full">
      <Tooltip
        p={5}
        rounded={10}
        hasArrow
        placement="right"
        fontSize={20}
        label="I'm a ITIL V3 certified, the foudation level!"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={show ? { rotate: 370, scale: 2 } : turnBackAnimation}
          style={{ ...defaultBlockStyle, background: '#FEE440' }}
          whileTap={{
            scale: 0.8,
            rotate: -90,
          }}
          transition={{
            delay: 0.1,
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
        >
          <Text userSelect="none" fontSize={40} fontWeight="extrabold">
            ITIL
          </Text>
        </motion.div>
      </Tooltip>

      <Tooltip
        p={5}
        rounded={10}
        hasArrow
        placement="left"
        fontSize={20}
        label="I have structured wiring from SENAI too. My house is all wired by me."
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={show ? { rotate: 350, scale: 1 } : turnBackAnimation}
          style={{
            ...defaultBlockStyle,
            background: '#00F5D4',
            left: '40%',
            top: '20%',
          }}
          whileTap={{
            scale: 0.8,
            rotate: -90,
          }}
          transition={{
            delay: 0.3,
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
        >
          <Text userSelect="none" fontWeight="extrabold" fontSize={28}>
            SENAI
          </Text>
        </motion.div>
      </Tooltip>

      <Tooltip
        p={5}
        rounded={10}
        hasArrow
        placement="right"
        fontSize={20}
        label="I learned linux because i was used debian a lot!"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={show ? { rotate: 340, scale: 2.4 } : turnBackAnimation}
          style={{ ...defaultBlockStyle, top: '60%', left: '20%' }}
          whileTap={{
            scale: 0.8,
            rotate: -90,
          }}
          transition={{
            delay: 0.6,
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
        >
          <Icon as={DiLinux} fontSize={50} />
        </motion.div>
      </Tooltip>

      <Tooltip
        p={5}
        rounded={10}
        hasArrow
        placement="left"
        fontSize={20}
        label="I work here for 6 years. I need others experiences too!"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={show ? { rotate: 380, scale: 3 } : turnBackAnimation}
          style={{
            ...defaultBlockStyle,
            background: '#1a202c',
            top: '40%',
            left: '80%',
          }}
          whileTap={{
            scale: 0.8,
            rotate: -90,
          }}
          transition={{
            delay: 0.3,
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
        >
          <Image src="/images/comunix.png" />
        </motion.div>
      </Tooltip>
    </Box>
  );
}
