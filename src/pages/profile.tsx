import { HStack, VStack } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { UnlockedScroll } from '../components/animated/lock';
import { Layout } from '../components/Layout';
import { TitleLikeCode } from '../components/TitleLikecode';
import { TitleLikeFunction } from '../components/TitleLikeFunction';

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
    <>
      <Layout>
        <HStack
          top={260}
          left="30vw"
          position="absolute"
          color="brand.200"
          borderBottom="1px solid"
          w="70vw"
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
          left="100vw"
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
          <VStack pl={10} mb={10} alignItems="flex-start" lineHeight={1}>
            <TitleLikeCode
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

      <UnlockedScroll
        orietation="horizontal"
        locked={true}
        lockLineAux={false}
      />
    </>
  );
}
