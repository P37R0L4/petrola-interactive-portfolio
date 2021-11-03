import { useColorMode } from '@chakra-ui/color-mode';
import { Box, HStack, VStack } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { CommingSoon } from '../components/animated/CommingSoon';
import { Layout } from '../components/Layout';
import { TitleLikeCode } from '../components/TitleLikecode';
import { TitleLikeFunction } from '../components/TitleLikeFunction';
import { RecruitersContext } from '../contexts/RecruitersContextProvider';

export default function Projects() {
  const { asPath, push } = useRouter();
  const { id } = useContext(RecruitersContext);
  const [scroolState, setScroolState] = useState(0);
  const [unlockFade, setUnlockFade] = useState(false);
  const { setColorMode } = useColorMode();

  function transformScroll(event: any) {
    if (!event.deltaY) {
      return;
    }

    if (asPath === `/projects`) {
      setScroolState(event.currentTarget.scrollLeft);
      // eslint-disable-next-line no-param-reassign
      event.currentTarget.scrollLeft += event.deltaY + event.deltaX;
    }

    event.preventDefault();
  }

  useEffect(() => {
    setColorMode(`dark`);
    if (!id) push(`/home`);
    document.body.style.overflow = `hidden`;

    const element = document.scrollingElement || document.documentElement;
    element.addEventListener(`wheel`, transformScroll);

    setInterval(() => {
      setUnlockFade(true);
    }, 1000);

    return () => {
      element.removeEventListener(`wheel`, transformScroll);
    };
  }, [asPath]);

  return (
    <>
      <Layout>
        {/** *
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
          w="70vw"
          h="20rem"
          _before={{
            content: `""`,
            width: 5,
            height: 5,
            bg: `brand.200`,
            left: -2.5,
            top: 308,
            borderRadius: `full`,
            position: `absolute`,
          }}
        >
          <VStack pl={10} alignItems="flex-start" w="50vw" lineHeight={1}>
            <TitleLikeFunction nameFunction="projects" />

            <TitleLikeCode
              title="Comming soon!"
              subtitle="<I will show my works here soon />"
              text="For now, visit my linkedin"
              show
            />
          </VStack>
        </HStack>
      </Layout>
      <CommingSoon show />

      {/* Down gradient */}
      <Box
        zIndex={-999}
        backgroundImage="linear-gradient(to bottom, #1A202C, rgba(58, 72, 100, 1))"
        w="full"
        position="fixed"
        top="40vh"
        h="60vh"
        transitionDuration="1s"
        opacity={unlockFade ? 1 : 0}
      />
    </>
  );
}
