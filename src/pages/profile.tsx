import {
  Icon,
  HStack,
  VStack,
  useColorMode,
  Box,
  Fade,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { UnlockedScroll } from '../components/animated/lock';
import { Layout } from '../components/Layout';
import { TitleLikeCode } from '../components/TitleLikecode';
import { TitleLikeFunction } from '../components/TitleLikeFunction';

import { techDoll } from '../components/svg/techDoll';
import { motion } from 'framer-motion';

export default function Profile() {
  const { asPath } = useRouter();
  const [scroolState, setScroolState] = useState(0);

  const { setColorMode } = useColorMode();

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
    console.log('hor scrool', scroolState);
  }, [scroolState]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    var element = document.scrollingElement || document.documentElement;
    element.addEventListener('wheel', transformScroll);

    return () => {
      element.removeEventListener('wheel', transformScroll);
    };
  }, [asPath]);

  return (
    <>
      <Layout>
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
              text="I'm a front-end developer for 7 years, My all
            stack is JavaScript, with Typescript, NodeJS, ReactJS, React
            Native, NextJs and More."
              show
            />
          </VStack>
        </HStack>

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
              title=""
              subtitle="<I graduated from Projeção in System Analysis and Development degree />"
              text="I am 24 Years old, and i am front-end developer for 7 years, My
            stack all JavaScript, with Typescript, NodeJS, ReactJS, React
            Native, NextJs and More."
              show
            />
          </VStack>
        </HStack>
      </Layout>

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
          transition={{ repeat: Infinity, duration: 10, type: 'keyframes' }}
        >
          <Icon position="absolute" fontSize={1400} as={techDoll} />
        </motion.div>
      </motion.div>

      <Box
        zIndex={-999}
        backgroundImage="linear-gradient(to bottom, #1A202C, rgba(58, 72, 100, 1))"
        w="full"
        position="fixed"
        top="40vh"
        h="60vh"
        transitionDuration="1s"
        opacity={scroolState > 900 ? 1 : 0}
      />

      <UnlockedScroll
        orietation="horizontal"
        locked={true}
        lockLineAux={false}
      />
    </>
  );
}
