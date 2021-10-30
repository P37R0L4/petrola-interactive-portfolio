import { motion, useAnimation } from 'framer-motion';
import {
  Icon,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverArrow,
  PopoverTrigger,
  Wrap,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import { GoDeviceMobile, GoDeviceDesktop, GoBrowser } from 'react-icons/go';
import { ImProfile } from 'react-icons/im';
import { VscOctoface } from 'react-icons/vsc';
import { MdCardTravel } from 'react-icons/md';

import { useEffect } from 'react';
import NoScrollLink from '../NoScrollLink';

interface IShowMoreMinions {
  show: boolean;
}

export default function ShowMoreMinions({ show }: IShowMoreMinions) {
  const controls = useAnimation();
  const controlBalls = useAnimation();

  const { onOpen, isOpen } = useDisclosure();

  useEffect(() => {
    controls.start({
      x: show ? '100vw' : 0,
      transition: { duration: show ? 5 : 0 },
    });

    controlBalls.start({
      y: [0, -50, 0],
    });
  }, [show]);

  return (
    <>
      <Popover
        arrowSize={20}
        offset={[0, 40]}
        isOpen={isOpen}
        placement="right"
      >
        <PopoverTrigger>
          <motion.div
            animate={controls}
            style={{
              zIndex: 999,
              left: '-50vw',
              position: 'absolute',
              display: 'flex',
              top: 200,
            }}
            onAnimationComplete={() => {
              onOpen();
            }}
          >
            <motion.div
              style={{
                width: '5rem',
                height: '5rem',
                background: '#00BBF9',
                display: 'flex',
                alignItems: 'center',
                color: 'white',
                justifyContent: 'center',
                borderRadius: 100,
                marginRight: 20,
              }}
              transition={{ repeat: Infinity }}
              animate={controlBalls}
            >
              <Icon fontSize={40} as={GoDeviceMobile} />
            </motion.div>

            <motion.div
              style={{
                width: '5rem',
                height: '5rem',
                background: '#9B5DE5',
                display: 'flex',
                alignItems: 'center',
                color: 'white',
                justifyContent: 'center',
                borderRadius: 100,
                marginRight: 20,
              }}
              transition={{ repeat: Infinity, delay: 0.3 }}
              animate={controlBalls}
            >
              <Icon fontSize={40} as={GoDeviceDesktop} />
            </motion.div>

            <motion.div
              style={{
                width: '5rem',
                height: '5rem',
                background: '#F15BB5',
                display: 'flex',
                alignItems: 'center',
                color: 'white',
                justifyContent: 'center',
                borderRadius: 100,
                marginRight: 20,
              }}
              transition={{ repeat: Infinity, delay: 0.5 }}
              animate={controlBalls}
            >
              <Icon fontSize={40} as={GoBrowser} />
            </motion.div>
          </motion.div>
        </PopoverTrigger>

        <PopoverContent p={1} w="40vw" bg="gray.700">
          <PopoverArrow />
          <PopoverBody>
            <Wrap>
              <NoScrollLink href="/projects" scroll={false}>
                <Button leftIcon={<VscOctoface />} size="lg">
                  .my.projects()
                </Button>
              </NoScrollLink>

              <NoScrollLink href="/profile" scroll={false}>
                <Button leftIcon={<ImProfile />} size="lg">
                  .who.iam()
                </Button>
              </NoScrollLink>

              <NoScrollLink href="/visited" scroll={false}>
                <Button leftIcon={<MdCardTravel />} size="lg">
                  .who.visited()
                </Button>
              </NoScrollLink>
            </Wrap>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
}
