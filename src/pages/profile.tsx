import { HStack, Text, VStack } from '@chakra-ui/layout';
import { Fade, SlideFade } from '@chakra-ui/transition';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Layout } from '../components/Layout';

export default function Profile() {
  const { asPath } = useRouter();

  function transformScroll(event: any) {
    if (!event.deltaY) {
      return;
    }

    if (asPath === '/profile') {
      event.currentTarget.scrollLeft += event.deltaY + event.deltaX;
    }

    event.preventDefault();
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    var element = document.scrollingElement || document.documentElement;
    element.addEventListener('wheel', transformScroll);

    return () => {
      element.removeEventListener('wheel', transformScroll);
    };
  }, [asPath]);

  return (
    <Layout>
      <HStack
        top={260}
        left="30vw"
        position="absolute"
        color="brand.200"
        borderBottom="1px solid"
        w="150vw"
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
        <VStack alignItems="flex-start" w="50vw" lineHeight={1}>
          <SlideFade in={true} offsetY="30px" delay={0.5}>
            <Text color="brand.100" fontSize={60} fontWeight="extrabold">
              My name's Lucas Henrique.
            </Text>
          </SlideFade>

          <Fade in={true} delay={0.7}>
            <Text color="gray.500" fontSize={18} mt={2}>
              <Text
                fontSize={30}
                color="gray.400"
              >{`<I'm a Front end and Mobile Developer />`}</Text>
              <Text ml={5} mt={2} color="gray.400">
                I Currently work with NextJS and ReactJS/Native.
              </Text>
            </Text>
          </Fade>
        </VStack>
      </HStack>
    </Layout>
  );
}
