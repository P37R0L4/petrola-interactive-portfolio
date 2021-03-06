import { useColorModeValue } from '@chakra-ui/color-mode';
import { Text } from '@chakra-ui/layout';
import { useContext } from 'react';
import { RecruitersContext } from '../contexts/RecruitersContextProvider';

interface ITitleLikeFunction {
  nameRecruiter?: string;
  nameFunction: string;
}

export function TitleLikeFunction({
  nameRecruiter,
  nameFunction,
}: ITitleLikeFunction) {
  const { name } = useContext(RecruitersContext);

  return (
    <Text
      color={useColorModeValue('black', 'white')}
      fontWeight="medium"
      fontSize={22}
      mb={2}
    >
      <span style={{ color: '#9B5DE5' }}>new </span>p37r0l4()
      <span style={{ color: '#F15BB5' }}>
        .{nameFunction.replace(/ /g, '')}(
        <span style={{ color: useColorModeValue('black', 'white') }}>
          {nameRecruiter !== '' ? nameRecruiter : name !== '' ? name : 'null'}
        </span>
        )
      </span>
    </Text>
  );
}
