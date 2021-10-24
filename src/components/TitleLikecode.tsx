import { Text } from '@chakra-ui/layout';
import { Fade, SlideFade } from '@chakra-ui/transition';

interface ITitleLikeCode {
  title: string;
  subtitle?: string;
  text: string;
  show: boolean;
  color?: string;
  isMaintitle?: boolean;
  subtitleColored?: boolean;
  colorSubtitle?: string;
}

export function TitleLikeCode({
  show,
  title,
  subtitle,
  text,
  color = 'brand.100',
  isMaintitle = false,
  subtitleColored = false,
  colorSubtitle,
}: ITitleLikeCode) {
  return (
    <>
      <SlideFade in={show} offsetY="30px" delay={0.5}>
        <Text color={color} fontSize={60} fontWeight="extrabold">
          {title}
        </Text>
      </SlideFade>

      <Fade in={show} delay={0.5}>
        <Text color="gray.500" mt={4}>
          <Text
            w={isMaintitle ? '40rem' : 'auto'}
            fontSize={30}
            color={subtitleColored ? colorSubtitle : 'gray.400'}
          >
            {subtitle}
          </Text>

          <Text fontSize={18} ml={5} mt={2} color="gray.400">
            {text}
          </Text>
        </Text>
      </Fade>
    </>
  );
}
