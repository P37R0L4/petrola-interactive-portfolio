import { GetServerSideProps } from 'next';
import { dehydrate } from 'react-query';
import { getAccessData, useAccessData } from '../services/hooks/useAccessData';
import { queryClient } from '../services/queryClient';
import { useQueryClient } from 'react-query';

import { Layout } from '../components/Layout';
import {
  VStack,
  Flex,
  Text,
  FormControl,
  Input,
  useColorModeValue,
  Button,
  HStack,
  Icon,
  SlideFade,
  Fade,
  useColorMode,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';
import { useEffect, useReducer, useState } from 'react';
import { TiArrowBack } from 'react-icons/ti';

import { Lock, UnlockedScroll } from '../components/animated/lock';
import { LogosContainer } from '../components/animated/LogosContainer';
import { WrapBecameDeveloper } from '../components/animated/WrapBecameDeveloper';
import ShowMoreMinions from '../components/animated/ShowMoreMinions';

let lockWheel = true;
let timer: any = null;

export default function Home() {
  const { data } = useAccessData();
  const [queryPrefetched, setQueryPrefetched] = useState(data);
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  const query = useQueryClient();

  const [nameRecruiter, setNameRecruiter] = useState('');
  const [lockMore, setLockMore] = useState(true);
  const {
    isOpen: changeName,
    onClose: closeChangeName,
    onOpen: openChangeName,
  } = useDisclosure();
  const [lockLineAux, setLockLineAux] = useState(false);
  const [logged, setLogged] = useState(false);
  const [scrollToShow, setScrollToShow] = useState([true, false, false, false]);

  const { setColorMode } = useColorMode();

  useEffect(() => {
    closeChangeName();

    setTimeout(() => {
      openChangeName();
      !lockMore && setLogged(true);
    }, 500);
  }, [lockMore]);

  useEffect(() => {
    scrollToShow[2] ? setColorMode('dark') : setColorMode('light');
  }, [scrollToShow]);

  const debounceLock = () => {
    clearInterval(timer);
    timer = setInterval(() => {
      setLockLineAux(false);
      lockWheel = true;
    }, 2000);
  };

  const unlockMore = async () => {
    if (nameRecruiter !== '') {
      setLockMore(false);
      document.body.style.overflow = 'auto';

      await fetch(`/api/insert/${nameRecruiter}`);
      query.invalidateQueries('getAccessData');
      setQueryPrefetched(data);
      forceUpdate();
    } else {
      setLockLineAux(true);
      debounceLock();
    }
  };

  useEffect(() => {
    setColorMode('light');
    setQueryPrefetched(data);
  }, [data]);

  useEffect(() => {
    setColorMode('light');
    if (lockMore) {
      document.body.style.overflow = 'hidden';
    }

    const handleWeel = () => {
      if (lockMore) {
        if (lockWheel) {
          setLockLineAux(true);
        }

        lockWheel = false;
      }
    };

    const handScroll = () => {
      console.log('scroll', window.scrollY);

      /**
       *
       *
       *  Seccond Scroll
       */
      if (window.scrollY > 950 && window.scrollY < 2000) {
        setScrollToShow([scrollToShow[0], true, false, false]);
      } else if (window.scrollY <= 950) {
        setScrollToShow([scrollToShow[0], false, false, false]);
      } else if (window.scrollY > 2000 && window.scrollY < 2600) {
        setScrollToShow([scrollToShow[0], scrollToShow[1], true, false]);
      } else if (window.scrollY < 2000 && window.scrollY > 950) {
        setScrollToShow([scrollToShow[0], scrollToShow[1], false, false]);
      } else if (window.scrollY >= 2600) {
        setScrollToShow([scrollToShow[0], scrollToShow[1], true, true]);
      }
    };

    debounceLock();

    window.addEventListener('wheel', handleWeel);
    window.addEventListener('scroll', handScroll);

    return () => {
      window.removeEventListener('wheel', handleWeel);
      window.removeEventListener('scroll', handScroll);
    };
  }, []);

  return (
    <>
      <Layout>
        <VStack
          left="20%"
          top={350}
          position="absolute"
          h="150vh"
          alignItems="flex-start"
          color="brand.200"
          borderLeft="1px solid"
          px="4rem"
        >
          <Flex
            mt={-20}
            lineHeight={1}
            maxW="32rem"
            h="full"
            direction="column"
            _before={{
              content: '""',
              width: 5,
              height: 5,
              bg: 'brand.200',
              left: -2.5,
              top: 0,
              borderRadius: 'full',
              position: 'absolute',
            }}
          >
            <Text
              color={useColorModeValue('black', 'white')}
              fontWeight="medium"
              fontSize={18}
              mt={10}
            >
              <span style={{ color: '#9B5DE5' }}>new </span>p37r0l4()
              <span style={{ color: '#F15BB5' }}>
                .start(
                <span style={{ color: useColorModeValue('black', 'white') }}>
                  {nameRecruiter !== '' ? `"${nameRecruiter}"` : 'null'}
                </span>
                )
              </span>
            </Text>

            <SlideFade in={changeName} offsetY="20px">
              <Text color="brand.100" fontSize={60} fontWeight="extrabold">
                Hello {logged ? nameRecruiter.split(' ')[0] : 'recruiter'},{' '}
                {logged ? `let's go on!` : 'Alright!?'}
              </Text>
            </SlideFade>

            <Text color="gray.500" fontSize={18} mt={4}>
              I'm a Front-end Developer, this is my portfolio.&nbsp;
              <span
                style={{
                  color: '#F15BB5',
                  fontWeight: 'bold',
                }}
              >
                {queryPrefetched?.length}
              </span>{' '}
              another persons was visited this page. So if you want to give me a
              grade too, say me your name.
              <Icon
                transform="rotate(90deg) scaleX(-1)"
                mb={-7}
                fontSize={50}
                as={TiArrowBack}
                color={lockMore && lockLineAux ? 'red.400' : 'brand.200'}
              />
            </Text>

            <FormControl>
              <HStack py={10}>
                <Input
                  onChange={(e) => setNameRecruiter(e.target.value)}
                  size="lg"
                  variant="filled"
                  id="name"
                  autoComplete="off"
                  colorScheme="pink"
                  placeholder={
                    lockLineAux
                      ? `Write your name here, i'm obrigatory`
                      : 'Your name'
                  }
                  border={lockMore && lockLineAux ? ' 1px solid' : '1px solid'}
                  borderColor={
                    lockMore && lockLineAux ? 'red.400' : 'brand.100'
                  }
                  focusBorderColor={
                    lockMore && lockLineAux ? 'red.400' : 'brand.100'
                  }
                  disabled={logged}
                />
                <Button
                  onClick={() => {
                    unlockMore();
                  }}
                  size="lg"
                  bg={lockMore && lockLineAux ? 'red.400' : 'brand.200'}
                  colorScheme="brand"
                  disabled={logged}
                >
                  SEND
                </Button>
              </HStack>
            </FormControl>
          </Flex>
        </VStack>

        <Lock locked={lockMore} lockLineAux={lockLineAux} />

        {/**
         *
         *
         * Seccond Page
         *
         */}

        <VStack
          left="20%"
          top="150vh"
          position="absolute"
          h="130vh"
          alignItems="flex-start"
          color="brand.100"
          borderLeft="1px solid"
          px="4rem"
        >
          <Flex
            mt={-20}
            lineHeight={1}
            h="full"
            direction="column"
            _before={{
              content: '""',
              width: 5,
              height: 5,
              bg: 'brand.100',
              left: -2.5,
              top: 0,
              borderRadius: 'full',
              position: 'absolute',
            }}
          >
            {/**
             *
             *
             *  First apresentation
             */}
            <SlideFade in={scrollToShow[1]} offsetY="30px" delay={0.5}>
              <Text color="brand.100" fontSize={60} fontWeight="extrabold">
                I Start my carreer in 2015 at Comunix Tecnologia.
              </Text>
            </SlideFade>

            <Fade in={scrollToShow[1]} delay={0.7}>
              <Text color="gray.500" fontSize={18} mt={4} mb="7rem">
                <Text
                  fontSize={30}
                  color="gray.400"
                >{`<I was technical support />`}</Text>
                <Text ml={5} mt={2} color="gray.400">
                  I fixed computers and the network. I solved tickets and served
                  customers
                </Text>
              </Text>
            </Fade>

            <LogosContainer show={scrollToShow[1]} />
          </Flex>
        </VStack>

        {/**
         *
         *
         * third Page
         *
         */}
        <VStack
          left="20%"
          top="280vh"
          position="absolute"
          h="120vh"
          alignItems="flex-start"
          color="brand.300"
          borderLeft="1px solid"
          px="4rem"
        >
          <Flex
            mt={-20}
            lineHeight={1}
            // maxW="32rem"
            h="full"
            direction="column"
            _before={{
              content: '""',
              width: 5,
              height: 5,
              bg: 'brand.300',
              left: -2.5,
              top: 0,
              borderRadius: 'full',
              position: 'absolute',
            }}
          >
            <SlideFade in={scrollToShow[2]} offsetY="30px" delay={0.5}>
              <Text fontSize={60} fontWeight="extrabold">
                So in 2017, i became Developer!
              </Text>
            </SlideFade>

            <Fade in={scrollToShow[2]} delay={0.5}>
              <Text color="gray.500" fontSize={18} mt={4}>
                <Text
                  fontSize={30}
                  color="gray.400"
                >{`<I joined a separate team />`}</Text>
                <Text ml={5} mt={2} color="gray.400">
                  I start to develop the omnichannel's front-end in partnership
                  with the Comunix innovation team.
                </Text>
              </Text>
            </Fade>

            <WrapBecameDeveloper isOpen={scrollToShow[2]} />
          </Flex>
        </VStack>

        {/**
         *
         *
         * fourth Page
         *
         */}
        <VStack
          left="20%"
          top="380vh"
          position="absolute"
          h="50vh"
          alignItems="flex-start"
          color="brand.400"
          borderLeft="1px solid"
          px="4rem"
          _after={{
            content: '""',
            position: 'fixed',
            width: '100vw',
            height: '15rem',
            left: 0,
            top: '410vh',
            pointerEvents: 'none',
            backgroundImage: `linear-gradient(to bottom,  rgba(26, 32, 44, 0),  rgba(26, 32, 44, 1) 50%)`,
          }}
        >
          <Flex
            mt={-20}
            lineHeight={1}
            h="full"
            direction="column"
            _before={{
              content: '""',
              width: 5,
              height: 5,
              bg: 'brand.400',
              left: -2.5,
              top: 0,
              borderRadius: 'full',
              position: 'absolute',
            }}
          >
            <SlideFade in={scrollToShow[3]} offsetY="30px">
              <Text fontSize={60} fontWeight="extrabold">
                I love be a develop, my dream are work in another coutries, out
                of Brazil.
              </Text>
            </SlideFade>
          </Flex>

          {scrollToShow[3] && <ShowMoreMinions show={scrollToShow[3]} />}
        </VStack>

        {/***
         *
         *  Scroll enabled alert
         * */}
      </Layout>

      <UnlockedScroll
        locked={!lockMore && !scrollToShow[1] && !scrollToShow[2]}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  await queryClient.prefetchQuery('getAccessData', getAccessData);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
