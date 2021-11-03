import {
  Icon,
  HStack,
  VStack,
  useColorMode,
  Box,
  Text,
  Center,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { UnlockedScroll } from '../components/animated/lock';
import { Layout } from '../components/Layout';
import { TitleLikeCode } from '../components/TitleLikecode';
import { TitleLikeFunction } from '../components/TitleLikeFunction';

import { techDoll } from '../components/svg/techDoll';
import { motion } from 'framer-motion';
import { moon } from '../components/svg/moon';

import moment from 'moment';
import QRCode from 'react-qr-code';
import { RecruitersContext } from '../contexts/RecruitersContextProvider';
import Draggable from 'react-draggable';
import { ContentMinigame } from '../components/miniGame';

export default function Profile() {
  const { asPath, push } = useRouter();
  const [scroolState, setScroolState] = useState(0);
  const [minigameStarted, setMinigameStarted] = useState(0);
  const [minigamePosition, setMinigamePosition] = useState(0);
  const { id } = useContext(RecruitersContext);

  const { setColorMode } = useColorMode();

  const countAge = () =>
    moment('1997011007', 'YYYYMMDD').fromNow().replace('ago', 'old');

  function transformScroll(event: any) {
    setColorMode('dark');

    if (!event.deltaY) {
      return;
    }

    if (asPath === '/profile') {
      setScroolState(event.currentTarget.scrollLeft);
      event.currentTarget.scrollLeft += event.deltaY + event.deltaX;
    }

    event.preventDefault();
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    var element = document.scrollingElement || document.documentElement;
    element.addEventListener('wheel', transformScroll);

    let intervalMiniGame = setInterval(async () => {
      if (id) {
        const response = await fetch(`/api/get-one/${id}`);
        const arrJson = await response.json();

        setMinigameStarted(arrJson.game.started ?? false);
        setMinigamePosition(arrJson.game.position ?? 50);
      } else {
        push('/home');
        clearInterval(intervalMiniGame);
      }
    }, 300);

    return () => {
      element.removeEventListener('wheel', transformScroll);
      intervalMiniGame && clearInterval(intervalMiniGame);
    };
  }, [asPath]);

  return (
    <>
      <Layout>
        {/***
         *
         *
         * First apresentation
         *
         * */}
        <HStack
          top={260}
          left="30vw"
          position="absolute"
          color="brand.200"
          borderBottom="1px solid"
          w="90vw"
          h="20rem"
          _before={{
            content: '""',
            width: 5,
            height: 5,
            bg: 'brand.200',
            left: -2.5,
            top: 308,
            borderRadius: 'full',
            position: 'absolute',
          }}
        >
          <VStack pl={10} alignItems="flex-start" w="50vw" lineHeight={1}>
            <TitleLikeFunction nameFunction="profile" />

            <TitleLikeCode
              title="My name's Lucas Henrique."
              subtitle="<I'm a Front end and Mobile Developer />"
              text="I Currently work with NextJS and ReactJS/Native."
              show
            />
          </VStack>
        </HStack>

        {/***
         *
         *
         * Seccond apresentation
         *
         * */}
        <HStack
          top={260}
          left="120vw"
          position="absolute"
          color="brand.400"
          borderBottom="1px solid"
          alignItems="flex-end"
          w="150vw"
          h="20rem"
          _before={{
            content: '""',
            width: 5,
            height: 5,
            bg: 'brand.400',
            left: -2.5,
            top: 308,
            borderRadius: 'full',
            position: 'absolute',
          }}
        >
          <VStack pl={10} mb={10} alignItems="flex-start" lineHeight={1}>
            <TitleLikeCode
              subtitleColored
              color="brand.400"
              title="In july 2015, I start my carrer"
              subtitle="<I graduated from Projeção in System Analysis and Development degree />"
              text="All my stack is JavaScript, and i have more experience with web front-end.
              but I have the goal of working with mobile too"
              show
            />
          </VStack>
        </HStack>

        {/***
         *
         *
         * Third apresentation
         *
         * */}
        <HStack
          top={260}
          left="220vw"
          position="absolute"
          color="brand.300"
          borderBottom="1px solid"
          alignItems="flex-end"
          w="90vw"
          h="20rem"
          _before={{
            content: '""',
            width: 5,
            height: 5,
            bg: 'brand.300',
            left: -2.5,
            top: 308,
            borderRadius: 'full',
            position: 'absolute',
          }}
        >
          <VStack
            maxW="60vw"
            pl={10}
            mb={10}
            alignItems="flex-start"
            lineHeight={1}
          >
            <TitleLikeCode
              isMaintitle
              subtitleColored
              colorSubtitle="brand.300"
              title={`I'm ${countAge()}`}
              subtitle="<I was born in Taguatinga, Brasília/DF - Brazil />"
              text="In my free time i draw, print 3d objects in my ender3D printer, and i code my projects.
              Programming is a hobby for me too. "
              show
            />
          </VStack>
        </HStack>

        {/***
         *
         *
         * fourth apresentation
         *
         * */}
        <HStack
          top={260}
          left="310vw"
          position="absolute"
          color="brand.100"
          borderBottom="1px solid"
          alignItems="flex-end"
          w="90vw"
          h="20rem"
          _before={{
            content: '""',
            width: 5,
            height: 5,
            bg: 'brand.100',
            left: -2.5,
            top: 308,
            borderRadius: 'full',
            position: 'absolute',
          }}
        >
          <VStack
            maxW="60vw"
            pl={10}
            mb={10}
            alignItems="flex-start"
            lineHeight={1}
          >
            <TitleLikeCode
              isMaintitle
              subtitleColored
              colorSubtitle="brand.400"
              title={`I love geek culture`}
              subtitle="<Sometime i play videogames and watch series and movies>"
              text="In my free time i draw, print 3d objects in my ender3D printer, and i code my projects.
              Programming is a hobby for me too. "
              show
            />
          </VStack>
        </HStack>

        {/* right gradient */}
        <Box
          backgroundImage="linear-gradient(to right, rgba(26, 32, 44, 0), rgba(26, 32, 44, 1) 50%)"
          w="20rem"
          h="100vh"
          position="absolute"
          left="380vw"
        />
      </Layout>

      {/***
       *
       *
       * Spacer
       *
       *   */}
      <motion.div
        style={{ position: 'fixed', scaleY: -1, rotate: '-40deg' }}
        initial={{ translateY: -1000 }}
        animate={{
          translateY:
            scroolState < 1080
              ? scroolState - 1000
              : scroolState > 1900
              ? scroolState - 1800
              : 60,
        }}
      >
        <motion.div
          initial={{ rotate: '-3deg' }}
          animate={{
            rotate: ['-3deg', '3deg', '-3deg'],
          }}
          transition={{ repeat: Infinity, duration: 10 }}
        >
          <Icon position="absolute" fontSize={1400} as={techDoll} />
        </motion.div>
      </motion.div>

      {/***
       *
       *
       * Moon
       *
       *  */}
      {scroolState > 2500 && scroolState < 4300 && (
        <motion.div
          style={{ position: 'fixed', left: '-20vw', top: '-50vh' }}
          initial={{ translateY: -1000, translateX: -1000 }}
          animate={{
            translateY:
              scroolState < 3000 ? -1000 : scroolState > 3300 ? -1000 : 0,
            translateX:
              scroolState < 3000 ? -1000 : scroolState > 3300 ? -1000 : 0,
          }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <motion.div
            initial={{ rotate: '-3deg' }}
            animate={{
              rotate: ['-3deg', '3deg', '-3deg'],
            }}
            transition={{ repeat: Infinity, duration: 10, type: 'keyframes' }}
          >
            <Icon position="absolute" fontSize={800} as={moon} />
          </motion.div>
        </motion.div>
      )}

      {/***
       *
       *
       * QR Code
       *
       *  */}
      {scroolState > 4300 && (
        <motion.div
          style={{
            position: 'fixed',
            right: '10vw',
            top: '10vh',
          }}
          initial={{ scale: 0 }}
          animate={{ scale: scroolState > 4300 ? 1 : 0 }}
        >
          <motion.div
            initial={{ rotate: '2deg', translateY: -5 }}
            transition={{ repeat: Infinity, duration: 4, type: 'keyframes' }}
            animate={{
              translateY: [5, -5, 5],
              rotate: ['2deg', '-2deg', '2deg'],
            }}
          >
            <Center
              style={{
                width: '20rem',
                height: '20rem',
                background: 'rgba(58, 72, 100, 1)',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <QRCode
                title="P37R0L4 mini game"
                value={`http://172.17.172.207:3000/mini-game/control/${id}`}
                size={300}
                fgColor="#1A202C"
                bgColor="rgba(58, 72, 100, 1)"
              />
            </Center>

            <Text
              m={5}
              fontSize="md"
              fontWeight="bold"
              color="rgba(58, 72, 100, 1)"
            >
              PUT YOUR MOBILE CAMERA HERE..
            </Text>
          </motion.div>

          <Draggable>
            <Center
              transition="0.1s"
              display={minigameStarted === 1 ? 'flex' : 'none'}
              opacity={minigameStarted === 1 ? 1 : 0}
              left="-45vw"
              top="0vh"
              zIndex="tooltip"
              position="absolute"
              w="50rem"
              h="40rem"
              bg="rgba(58, 72, 100, 1)"
              shadow="outline"
              rounded="lg"
              p={1}
            >
              <ContentMinigame position={minigamePosition} />
            </Center>
          </Draggable>
        </motion.div>
      )}

      {/* Down gradient */}
      <Box
        zIndex={-999}
        backgroundImage="linear-gradient(to bottom, #1A202C, rgba(58, 72, 100, 1))"
        w="full"
        position="fixed"
        top="40vh"
        h="60vh"
        transitionDuration="1s"
        opacity={scroolState > 900 && scroolState < 3800 ? 1 : 0}
      />

      <UnlockedScroll
        orietation="horizontal"
        locked={true}
        lockLineAux={false}
      />
    </>
  );
}
