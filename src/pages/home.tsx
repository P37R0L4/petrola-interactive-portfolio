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
  Button,
  HStack,
  SlideFade,
  useColorMode,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';
import { useContext, useEffect, useState } from 'react';

import { Lock, UnlockedScroll } from '../components/animated/lock';
import { LogosContainer } from '../components/animated/LogosContainer';
import { WrapBecameDeveloper } from '../components/animated/WrapBecameDeveloper';
import ShowMoreMinions from '../components/animated/ShowMoreMinions';
import { useRouter } from 'next/router';
import { TitleLikeCode } from '../components/TitleLikecode';
import { TitleLikeFunction } from '../components/TitleLikeFunction';
import { RecruitersContext } from '../contexts/RecruitersContextProvider';

let lockWheel = true;
let timer: any = null;

export default function Home() {
  const { data } = useAccessData();
  const [queryPrefetched, setQueryPrefetched] = useState(data);

  const { setColorMode } = useColorMode();
  const { setState, state } = useContext(RecruitersContext);

  const query = useQueryClient();
  const { asPath } = useRouter();

  const [nameRecruiter, setNameRecruiter] = useState('');

  const {
    isOpen: changeName,
    onClose: closeChangeName,
    onOpen: openChangeName,
  } = useDisclosure();
  const [lockLineAux, setLockLineAux] = useState(false);
  const [auxLoggedAnimation, setauxLoggedAnimation] = useState(false);
  const [scrollToShow, setScrollToShow] = useState([true, false, false, false]);

  useEffect(() => {
    closeChangeName();

    setTimeout(() => {
      openChangeName();
      state.name !== '' && setauxLoggedAnimation(true);
    }, 500);
  }, [state.name]);

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
      document.body.style.overflow = 'auto';

      // Save the name
      setState({ name: nameRecruiter });

      await fetch(`/api/insert/${nameRecruiter}`);
      query.invalidateQueries('getAccessData');
      setQueryPrefetched(data);
    } else {
      setLockLineAux(true);
      debounceLock();
    }
  };

  useEffect(() => {
    setQueryPrefetched(data);
    setColorMode('light');
  }, [data]);

  useEffect(() => {
    setColorMode('light');

    if (state.name !== '') {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }

    const handleWeel = () => {
      if (state.name === '') {
        if (lockWheel) {
          setLockLineAux(true);
        }

        lockWheel = false;
      }
    };

    const handScroll = () => {
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
  }, [asPath]);

  return (
    <>
      <Layout>
        <VStack
          left="20vw"
          top={420}
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
            maxW="34rem"
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
            <TitleLikeFunction
              nameRecruiter={nameRecruiter}
              nameFunction="start"
            />

            <SlideFade in={changeName} offsetY="20px">
              <Text color="brand.100" fontSize={60} fontWeight="extrabold">
                Hello{' '}
                {auxLoggedAnimation && state.name
                  ? state.name.split(' ')[0]
                  : 'recruiter'}
                ,{' '}
                {auxLoggedAnimation && state.name
                  ? `let's go on!`
                  : 'Alright!?'}
              </Text>
            </SlideFade>

            <Text w="40rem" mt={4} fontSize={30} color="gray.400">
              {`<I'm a Front-end Developer, this is my portfolio />`}
            </Text>

            <Text ml={5} mt={2} fontSize={18} color="gray.400">
              I have {queryPrefetched?.length} visits, say me your name, and
              give me a grade too!
            </Text>

            <FormControl>
              <HStack py={8}>
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
                  border={
                    state.name === '' && lockLineAux
                      ? ' 1px solid'
                      : '1px solid'
                  }
                  borderColor={
                    state.name === '' && lockLineAux ? 'red.400' : 'brand.100'
                  }
                  focusBorderColor={
                    state.name === '' && lockLineAux ? 'red.400' : 'brand.100'
                  }
                  disabled={auxLoggedAnimation && state.name !== ''}
                />
                <Button
                  onClick={() => {
                    unlockMore();
                  }}
                  size="lg"
                  bg={
                    state.name === '' && lockLineAux ? 'red.400' : 'brand.200'
                  }
                  colorScheme="brand"
                  disabled={auxLoggedAnimation && state.name !== ''}
                >
                  SEND
                </Button>
              </HStack>
            </FormControl>
          </Flex>
        </VStack>

        <Lock locked={state.name === ''} lockLineAux={lockLineAux} />

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
            <TitleLikeCode
              color="brand.100"
              show={scrollToShow[1]}
              title="I Start my carreer in 2015 at Comunix Tecnologia."
              subtitle="<I was technical support />"
              text="I fixed computers and the network. I solved tickets and served
              customers"
            />

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
            <TitleLikeCode
              color="brand.300"
              show={scrollToShow[2]}
              title="So in 2017, i became Developer!"
              subtitle="<I joined a separate team />"
              text="I start to develop the omnichannel's front-end in partnership with
              the Comunix innovation team."
            />

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
                I love be a develop, my dream is work in another coutries, out
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
        locked={state.name !== '' && !scrollToShow[1] && !scrollToShow[2]}
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
