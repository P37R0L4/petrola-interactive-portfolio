import { Flex, VStack, useColorMode } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { dehydrate } from 'react-query';
import { UnlockedScroll } from '../components/animated/lock';
import { Layout } from '../components/Layout';
import { TitleLikeCode } from '../components/TitleLikecode';
import { TitleLikeFunction } from '../components/TitleLikeFunction';
import { getAccessData, useAccessData } from '../services/hooks/useAccessData';
import { RecruitersContext } from '../contexts/RecruitersContextProvider';
import { queryClient } from '../services/queryClient';

export default function WhosVisited() {
  const { push } = useRouter();
  const { id } = useContext(RecruitersContext);
  const { data } = useAccessData();
  const { setColorMode } = useColorMode();
  const [queryPrefetched, setQueryPrefetched] = useState(data);

  useEffect(() => {
    !id && push('/home');

    setColorMode('light');
    setQueryPrefetched(data);
    document.body.style.overflow = 'auto';
  }, [data]);

  const convertTimestamp = (unix_timestamp: number): string => {
    var a = new Date(unix_timestamp * 1000);
    var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();

    return date + ' ' + month + ' ' + year;
  };

  const getRandomBrand = (): number => Math.floor(Math.random() * (5 - 1) + 1);

  return (
    <>
      <Layout>
        {queryPrefetched &&
          Object.values(queryPrefetched).map((item, index) => {
            const brand = `brand.${getRandomBrand()}00`;
            const isEven = (index + 1) % 2 === 0;

            return (
              <VStack
                left={isEven ? '60vw' : '20vw'}
                top={`${60 * (index + 1)}vh`}
                position="absolute"
                h="60vh"
                w="40.06vw"
                alignItems="flex-start"
                color={brand}
                borderLeft={isEven ? '1px solid' : 'none'}
                borderRight={!isEven ? '1px solid' : 'none'}
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
                    bg: brand,
                    left: isEven ? -2.5 : '98.5%',
                    top: 0,
                    borderRadius: 'full',
                    position: 'absolute',
                  }}
                >
                  {/**
                   *
                   *
                   *  Loop apresentation
                   */}
                  <TitleLikeFunction
                    nameRecruiter="null"
                    nameFunction={item.name}
                  />

                  <TitleLikeCode
                    color="brand.100"
                    show={true}
                    title={`Give me ${item.grade} points`}
                    subtitle={`<Visited in ${convertTimestamp(item.data)} />`}
                    text={`<He get's ${item.game.minigamePoints} Points in minigame />`}
                  />
                </Flex>
              </VStack>
            );
          })}
      </Layout>

      <UnlockedScroll locked />
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
