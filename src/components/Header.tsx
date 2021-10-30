import { Button, IconButton } from '@chakra-ui/button';
import { HStack, useColorModeValue } from '@chakra-ui/react';
import { AiFillApple, AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import NoScrollLink from './NoScrollLink';
import { ReactNode, useContext } from 'react';
import { RecruitersContext } from '../contexts/RecruitersContextProvider';
import { useRouter } from 'next/router';

interface IHeaderButton {
  children: ReactNode;
  href: string;
  isBrand?: boolean;
  disabled?: boolean;
}

function HeaderButton({ children, href, isBrand, disabled }: IHeaderButton) {
  return (
    <NoScrollLink href={href}>
      <Button
        disabled={disabled}
        variant={isBrand ? 'solid' : 'link'}
        color={isBrand ? useColorModeValue('black', 'white') : 'white'}
        size="small"
        leftIcon={isBrand ? <AiFillApple size={20} /> : <> </>}
        p={1}
      >
        {children}
      </Button>
    </NoScrollLink>
  );
}

export function Header() {
  const { name } = useContext(RecruitersContext);
  const { asPath } = useRouter();

  return (
    <HStack
      display={
        asPath === '/' || asPath.indexOf('/mini-game') !== -1 ? 'none' : 'flex'
      }
      position="fixed"
      w="full"
      p={6}
      h="2.5rem"
      justifyContent="space-between"
      zIndex={9999}
    >
      <HeaderButton isBrand href="/home" disabled={asPath === '/home'}>
        .p37r0l4()
      </HeaderButton>

      <HStack bg={useColorModeValue('black', 'brand.200')} p={3} color="white">
        <HeaderButton
          href="/projects"
          disabled={name === '' || asPath === '/projects'}
        >
          .my.projects()
        </HeaderButton>

        <HeaderButton
          href="/profile"
          disabled={name === '' || asPath === '/profile'}
        >
          .who.iam()
        </HeaderButton>

        <HeaderButton
          href="/visited"
          disabled={name === '' || asPath === '/visited'}
        >
          .who.visited()
        </HeaderButton>

        <a
          target="_blank"
          href="https://www.linkedin.com/in/lucas-henrique-novais-de-araujo-petrola-559262123/"
        >
          <IconButton
            aria-label="linkedin"
            colorScheme="white"
            variant="outline"
            size="sm"
            icon={<AiFillLinkedin />}
          />
        </a>

        <a target="_blank" href="https://github.com/P37R0L4">
          <IconButton
            aria-label="linkedin"
            colorScheme="white"
            variant="outline"
            size="sm"
            icon={<AiFillGithub />}
          />
        </a>
      </HStack>
    </HStack>
  );
}
