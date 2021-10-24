import {
  Wrap,
  useColorModeValue,
  Icon,
  SimpleGrid,
  Center,
  Text,
  ScaleFade,
  Tooltip,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  DiChrome,
  DiFirefox,
  DiGit,
  DiOpera,
  DiSafari,
  DiSwift,
} from 'react-icons/di';
import { GrGraphQl } from 'react-icons/gr';
import { BiMobile } from 'react-icons/bi';
import { FiMonitor } from 'react-icons/fi';

import {
  SiAndroid,
  SiIos,
  SiNextDotJs,
  SiNodeDotJs,
  SiReact,
  SiSass,
  SiTypescript,
} from 'react-icons/si';
import moment from 'moment';
import { GetServerSideProps } from 'next';
import { queryClient } from '../../services/queryClient';
import { dehydrate } from 'react-query';
import {
  getTecnologies,
  useTecnologies,
} from '../../services/hooks/useTecnologies';

const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

interface IWrapBecameDeveloper {
  isOpen: boolean;
}

export function WrapBecameDeveloper({ isOpen }: IWrapBecameDeveloper) {
  const colorWrapFrame = useColorModeValue('gray.300', 'gray.700');
  const { data } = useTecnologies();

  const getExperienceYears = (
    since: string | undefined = moment.now().toString(),
    text: string = 'this year'
  ): string => {
    const startedYear = moment(since, 'YYYY')
      .fromNow()
      .replace('years ago', '');

    return Number(startedYear) > 1 ? startedYear : text;
  };

  return (
    <Wrap position="relative" w="full" h="full" mt={30}>
      <ScaleFade in={isOpen} delay={0.2} initialScale={0.9}>
        <SimpleGrid
          fontSize={100}
          color="red.400"
          minChildWidth={100}
          p={2}
          bg={colorWrapFrame}
          w="20.5rem"
          h="15rem"
          rounded={10}
        >
          <motion.span
            whileTap={{ rotate: 360 }}
            whileHover={{ scale: [1, 1.4, 1.2] }}
          >
            <Icon as={DiChrome} />
          </motion.span>

          <motion.span
            whileTap={{ rotate: 360 }}
            whileHover={{ scale: [1, 1.4, 1.2] }}
          >
            <Icon as={DiFirefox} />
          </motion.span>

          <motion.span
            whileTap={{ rotate: 360 }}
            whileHover={{ scale: [1, 1.4, 1.2] }}
          >
            <Icon as={BiMobile} />
          </motion.span>

          <motion.span
            whileTap={{ rotate: 360 }}
            whileHover={{ scale: [1, 1.4, 1.2] }}
          >
            <Icon as={FiMonitor} />
          </motion.span>

          <motion.span
            whileTap={{ rotate: 360 }}
            whileHover={{ scale: [1, 1.4, 1.2] }}
          >
            <Icon as={DiOpera} />
          </motion.span>

          <motion.span
            whileTap={{ rotate: 360 }}
            whileHover={{ scale: [1, 1.4, 1.2] }}
          >
            <Icon as={DiSafari} />
          </motion.span>
        </SimpleGrid>
      </ScaleFade>

      <ScaleFade in={isOpen} delay={0.3} initialScale={0.9}>
        <Center
          color="white"
          bg={colorWrapFrame}
          fontWeight="light"
          w="40rem"
          h="15rem"
          rounded={10}
          p={5}
        >
          <Text fontSize={35} opacity={0.7} textAlign="center" lineHeight={1.2}>
            I develop my front-end projects using React with NextJS, Sass in a
            linux server with Nginx, NodeJs and PM2.
          </Text>
        </Center>
      </ScaleFade>

      <ScaleFade in={isOpen} delay={0.6} initialScale={0.9}>
        <Center
          color="white"
          bg={colorWrapFrame}
          fontWeight="light"
          w="30rem"
          h="20rem"
          rounded={10}
          p={5}
        >
          <Text fontSize={35} opacity={0.7} textAlign="center" lineHeight={1.2}>
            And my Mobile Apps with React Native, Java and Kotlin. I start to
            study Swift too.
          </Text>
        </Center>
      </ScaleFade>

      <ScaleFade in={isOpen} delay={0.4} initialScale={0.9}>
        <SimpleGrid
          fontSize={80}
          minChildWidth="50%"
          bg={colorWrapFrame}
          w="15rem"
          h="20rem"
          rounded={10}
          p={5}
        >
          <Tooltip
            bg="brand.300"
            hasArrow
            rounded={10}
            label={`${getExperienceYears(
              data?.typescript.since
            )} years with Typescript`}
            placement="left"
            p={2}
          >
            <motion.span whileHover={{ y: -10 }}>
              <Icon as={SiTypescript} />
            </motion.span>
          </Tooltip>

          <Tooltip
            bg="brand.200"
            rounded={10}
            hasArrow
            label="Only 6 moths using GraphQL"
            placement="left"
            p={2}
          >
            <motion.span whileHover={{ y: -10, scale: 0.9 }}>
              <Icon as={GrGraphQl} />
            </motion.span>
          </Tooltip>

          <Tooltip
            bg="brand.500"
            rounded={10}
            hasArrow
            label={`I code with NodeJS for ${getExperienceYears(
              data?.node?.since
            )} years.`}
            placement="top"
            p={2}
          >
            <motion.span whileHover={{ y: -10 }}>
              <Icon as={SiNodeDotJs} />
            </motion.span>
          </Tooltip>

          <Tooltip
            bg="brand.300"
            rounded={10}
            hasArrow
            label="My first mobile Love, I code with React Native and Java too!"
            placement="bottom"
            p={2}
          >
            <motion.span whileHover={{ y: -10, rotate: 15 }}>
              <Icon as={SiAndroid} />
            </motion.span>
          </Tooltip>

          <Tooltip
            bg="brand.400"
            rounded={10}
            hasArrow
            label="I buy a MacBook and a IPhone only for this guy xD. I code With React Native."
            placement="top"
            p={2}
          >
            <motion.span whileHover={{ x: -15 }}>
              <Icon as={SiIos} />
            </motion.span>
          </Tooltip>
        </SimpleGrid>
      </ScaleFade>

      <ScaleFade in={isOpen} delay={0.5} initialScale={0.9}>
        <SimpleGrid
          fontSize={80}
          minChildWidth={80}
          bg={colorWrapFrame}
          w="15rem"
          h="20rem"
          rounded={10}
          p={5}
        >
          <Tooltip
            bg="brand.200"
            rounded={10}
            hasArrow
            label={`I love Sass. That's amazing! I code for ${getExperienceYears(
              data?.sass.since
            )} years!`}
            placement="left"
            p={2}
          >
            <motion.span whileHover={{ y: -10 }}>
              <Icon as={SiSass} />
            </motion.span>
          </Tooltip>

          <Tooltip
            bg="brand.500"
            rounded={10}
            hasArrow
            label="NextJS is one of 7 wonders of the world, This page are NextJS!"
            placement="top"
            p={2}
          >
            <motion.span whileHover={{ x: 20 }}>
              <Icon as={SiNextDotJs} />
            </motion.span>
          </Tooltip>

          <Tooltip
            bg="brand.400"
            rounded={10}
            hasArrow
            label={`${getExperienceYears(
              data?.react.since
            )} Years using React and React Native, i was code with Angular and VueJS for a litte time too.`}
            placement="top"
            p={2}
          >
            <motion.span whileHover={{ y: -10, scale: 1.5 }}>
              <Icon as={SiReact} />
            </motion.span>
          </Tooltip>

          <Tooltip
            bg="brand.500"
            rounded={10}
            hasArrow
            label={`I start to study Swift ${getExperienceYears(
              data?.swift.since
            )}.`}
            placement="top"
            p={2}
          >
            <motion.span whileHover={{ x: -10 }}>
              <Icon as={DiSwift} />
            </motion.span>
          </Tooltip>

          <Tooltip
            bg="brand.500"
            rounded={10}
            hasArrow
            label="I version my apps using GIT from the start my carreer."
            placement="top"
            p={2}
          >
            <motion.span whileHover={{ x: -10 }}>
              <Icon as={DiGit} />
            </motion.span>
          </Tooltip>
        </SimpleGrid>
      </ScaleFade>
    </Wrap>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  await queryClient.prefetchQuery('useTecnologies', getTecnologies);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
