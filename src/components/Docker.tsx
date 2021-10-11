import { IconButton } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Center, Text, VStack, Box } from '@chakra-ui/layout';
import { Fade, SlideFade } from '@chakra-ui/transition';
import {
  AiFillGithub,
  AiFillLinkedin,
  AiOutlineChrome,
  AiOutlineWhatsApp,
} from 'react-icons/ai';
import { GrDocumentPdf, GrDocumentPerformance } from 'react-icons/gr';
import { TiArrowBack } from 'react-icons/ti';
import { RiGamepadFill } from 'react-icons/ri';
import Icon from '@chakra-ui/icon';
import { useEffect, useState } from 'react';
import { useColorModeValue } from '@chakra-ui/color-mode';

const COLORS = [
  '#9B5DE5',
  '#F15BB5',
  '#FEE440',
  '#00BBF9',
  '#00F5D4',
  '#1a202c',
];

export function Docker() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [scroll, setScroll] = useState(0);
  const [showDock, setShowDock] = useState(true);
  const [dockColor, setDockColor] = useState(
    COLORS[Math.floor(Math.random() * (5 - 0) + 0)]
  );

  useEffect(() => {
    let timer: any = null;

    const handleScroll = () => {
      setScroll(window.scrollY);
      let OldScroll;

      if (scroll != OldScroll) {
        OldScroll = scroll;
        setShowDock(false);
      } else {
        setShowDock(true);
      }

      clearInterval(timer);
      timer = setInterval(() => {
        setShowDock(true);
      }, 500);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setDockColor(COLORS[Math.floor(Math.random() * (5 - 0) + 0)]);
    }, 10000);
  }, [dockColor]);

  return (
    <Center
      position="fixed"
      h="full"
      px={6}
      onMouseEnter={() => onOpen()}
      onMouseLeave={() => onClose()}
      borderLeft={`10px solid ${dockColor}`}
      transitionDuration="0.6s"
      left={!showDock ? '-10px' : 0}
    >
      <Fade in={showDock}>
        <Box w={40} position="absolute" top={20} right="-12rem" lineHeight={1}>
          <Icon
            transform="rotate(-30deg)"
            ml={-10}
            mb={-3}
            fontSize={50}
            as={TiArrowBack}
          />
          <Text fontSize={30} fontWeight="extrabold">
            Here <br />
            have a{' '}
            <span
              style={{
                color: dockColor,
              }}
            >
              dock!
            </span>
          </Text>
        </Box>
      </Fade>

      <SlideFade in={isOpen} offsetX="20px">
        <VStack alignItems="flex-end" justifyContent="space-between">
          <VStack
            spacing={4}
            borderBottom={`1px solid ${useColorModeValue('black', 'white')}`}
            pb={6}
          >
            <IconButton
              variant="ghost"
              size="lg"
              aria-label="first-doc"
              color={useColorModeValue('black', 'white')}
              icon={<GrDocumentPdf size={60} />}
            />

            <IconButton
              variant="ghost"
              size="lg"
              aria-label="sec-doc"
              color={useColorModeValue('black', 'white')}
              icon={<GrDocumentPerformance size={60} />}
            />
          </VStack>

          <VStack
            spacing={4}
            borderBottom={`1px solid ${useColorModeValue('black', 'white')}`}
            pb={6}
          >
            <IconButton
              variant="ghost"
              size="lg"
              aria-label="first-doc"
              icon={<AiOutlineChrome size={60} />}
            />

            <IconButton
              variant="ghost"
              size="lg"
              aria-label="first-doc"
              color="whatsapp.400"
              icon={<AiOutlineWhatsApp size={60} />}
            />

            <a target="_blank" href="https://github.com/P37R0L4">
              <IconButton
                variant="ghost"
                size="lg"
                aria-label="first-doc"
                icon={<AiFillGithub size={60} />}
              />
            </a>

            <a
              target="_blank"
              href="https://www.linkedin.com/in/lucas-henrique-novais-de-araujo-petrola-559262123/"
            >
              <IconButton
                variant="ghost"
                size="lg"
                aria-label="first-doc"
                color="linkedin.600"
                icon={<AiFillLinkedin size={60} />}
              />
            </a>
          </VStack>

          <VStack spacing={4}>
            <IconButton
              variant="ghost"
              size="lg"
              aria-label="first-doc"
              icon={<RiGamepadFill size={60} />}
            />
          </VStack>
        </VStack>
      </SlideFade>
    </Center>
  );
}
