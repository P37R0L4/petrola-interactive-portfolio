import Link from 'next/link';
import { Button, IconButton } from '@chakra-ui/button';
import { HStack } from '@chakra-ui/layout';
import { AiFillApple, AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import NoScrollLink from './NoScrollLink';

interface IHeader {
  isVisible: boolean;
}

export function Header({ isVisible }: IHeader) {
  return (
    <HStack
      display={!isVisible ? 'none' : 'flex'}
      position="fixed"
      w="full"
      p={6}
      h="2.5rem"
      justifyContent="space-between"
      zIndex={9999}
    >
      <Link href="/home">
        <Button size="small" leftIcon={<AiFillApple size={20} />} p={1}>
          .p37r0l4()
        </Button>
      </Link>

      <HStack>
        <Link href="#">
          <Button size="small" p={1}>
            .work()
          </Button>
        </Link>

        <NoScrollLink href="/profile">
          <Button size="small" p={1}>
            .who.iam()
          </Button>
        </NoScrollLink>

        <Link href="#">
          <Button size="small" p={1}>
            .projects()
          </Button>
        </Link>

        <a
          target="_blank"
          href="https://www.linkedin.com/in/lucas-henrique-novais-de-araujo-petrola-559262123/"
        >
          <IconButton
            aria-label="linkedin"
            color="linkedin.500"
            size="small"
            p={1}
            icon={<AiFillLinkedin />}
          />
        </a>

        <a target="_blank" href="https://github.com/P37R0L4">
          <IconButton
            aria-label="linkedin"
            color="brand.100"
            size="small"
            p={1}
            icon={<AiFillGithub />}
          />
        </a>
      </HStack>
    </HStack>
  );
}
