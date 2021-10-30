import Icon from '@chakra-ui/icon';
import { Box, Text } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/tooltip';
import { motion, MotionStyle } from 'framer-motion';
import { DiLinux } from 'react-icons/di';
import { ImWarning } from 'react-icons/im';

interface CommingSoonProps {
  show: boolean;
}

export function CommingSoon({ show }: CommingSoonProps) {
  const turnBackAnimation = { rotate: 0, scale: 0 };
  const defaultBlockStyle = {
    width: '100px',
    height: '100px',
    background: '#FEE440',
    position: 'absolute',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    color: 'white',
  } as MotionStyle;

  return (
    <Box mt="5rem" w="full" h="full" position="fixed">
      <motion.div
        initial={{ rotate: '-3deg' }}
        animate={{
          rotate: ['-3deg', '3deg', '-3deg'],
        }}
        transition={{ repeat: Infinity, duration: 10, delay: 2 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={show ? { scale: 2 } : turnBackAnimation}
          style={{
            ...defaultBlockStyle,
            left: '5vw',
            top: '30vh',
          }}
          transition={{
            delay: 0.1,
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
        >
          <Icon as={ImWarning} fontSize={50} />
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ rotate: '3deg' }}
        animate={{
          rotate: ['3deg', '-3deg', '3deg'],
        }}
        transition={{ repeat: Infinity, duration: 10, delay: 3 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={show ? { scale: 1 } : turnBackAnimation}
          style={{
            ...defaultBlockStyle,
            left: '40vw',
            top: '10%',
          }}
          transition={{
            delay: 0.3,
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
        >
          <Icon as={ImWarning} fontSize={50} />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ rotate: '-3deg' }}
        animate={{
          rotate: ['-3deg', '3deg', '-3deg'],
        }}
        transition={{ repeat: Infinity, duration: 10, delay: 0.7 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={show ? { scale: 2.4 } : turnBackAnimation}
          style={{ ...defaultBlockStyle, top: '60%', left: '20%' }}
          transition={{
            delay: 0.6,
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
        >
          <Icon as={ImWarning} fontSize={50} />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ rotate: '-3deg' }}
        animate={{
          rotate: ['-3deg', '3deg', '-3deg'],
        }}
        transition={{ repeat: Infinity, duration: 10, delay: 0.4 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={show ? { scale: 3 } : turnBackAnimation}
          style={{
            ...defaultBlockStyle,
            top: '30%',
            left: '80%',
          }}
          transition={{
            delay: 0.3,
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
        >
          <Icon as={ImWarning} fontSize={50} />
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ rotate: '3deg' }}
        animate={{
          rotate: ['3deg', '-3deg', '3deg'],
        }}
        transition={{ repeat: Infinity, duration: 10, delay: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={show ? { scale: 3 } : turnBackAnimation}
          style={{
            ...defaultBlockStyle,
            top: '80vh',
            right: '80%',
          }}
          transition={{
            delay: 0.3,
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
        >
          <Icon as={ImWarning} fontSize={50} />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ rotate: '-3deg' }}
        animate={{
          rotate: ['3deg', '-3deg', '3deg'],
        }}
        transition={{ repeat: Infinity, duration: 10 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={show ? { scale: 3 } : turnBackAnimation}
          style={{
            ...defaultBlockStyle,
            top: '60vh',
            left: '80%',
          }}
          transition={{
            delay: 0.3,
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
        >
          <Icon as={ImWarning} fontSize={50} />
        </motion.div>
      </motion.div>
    </Box>
  );
}
