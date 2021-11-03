import Icon from '@chakra-ui/icon';
import { AiFillLock } from 'react-icons/ai';
import {
  Flex,
  Text,
  ScaleFade,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Center,
  Divider,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

import { TiArrowBack, TiArrowForward } from 'react-icons/ti';
import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { RecruitersContext } from '../../contexts/RecruitersContextProvider';

interface LockProps {
  locked: boolean;
  lockLineAux?: boolean;
  orietation?: 'horizontal' | 'vertical';
}

interface GiveMeAGradeProps {
  show?: boolean;
  color?: string;
}

export function Lock({ locked, lockLineAux }: LockProps) {
  return (
    <Icon
      as={AiFillLock}
      fontSize={60}
      position="fixed"
      top="110vh"
      left="50vw"
      color="red.400"
      transitionDuration="0.5s"
      opacity={locked ? 1 : 0}
      transform={lockLineAux ? 'translateY(-25vh)' : 'translateY(0)'}
    />
  );
}

export function UnlockedScroll({ locked, orietation = 'vertical' }: LockProps) {
  return (
    <Flex right={5} bottom={70} position="fixed" w="10rem">
      <ScaleFade in={locked} initialScale={0.6}>
        <Flex lineHeight={0.9} alignItems="flex-end">
          <Text
            bg={useColorModeValue('black', 'gray.700')}
            color="white"
            p={2}
            w="8rem"
            h="8rem"
            fontSize={30}
            fontWeight="extrabold"
            textAlign="right"
          >
            Now u can <span style={{ color: '#F15BB5' }}> Scroll</span>
          </Text>

          {orietation === 'vertical' ? (
            <Icon
              transform="rotate(90deg) scaleX(-1)"
              fontSize={50}
              color="brand.200"
              as={TiArrowBack}
            />
          ) : (
            <Icon fontSize={50} color="brand.200" as={TiArrowForward} />
          )}
        </Flex>
      </ScaleFade>
    </Flex>
  );
}

export function GiveMeGrade({ show = false, color }: GiveMeAGradeProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [comment, setComment] = useState('');
  const [grade, setGrade] = useState(10);

  const { id } = useContext(RecruitersContext);

  async function sendResponse() {
    await fetch('/api/update-grade', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        comment,
        grade,
      }),
    });

    onClose();
  }

  return (
    <>
      <Flex left={0} bottom={10} right={5} position="fixed" w="10rem">
        <ScaleFade in={show} delay={1} initialScale={0.6}>
          <Flex
            lineHeight={0.9}
            alignItems="flex-end"
            onClick={() => {
              onOpen();
            }}
          >
            <motion.div
              whileTap={{ scale: 1.2 }}
              whileHover={{ scale: 1.4, rotate: '10deg' }}
              transition={{ duration: 0.2 }}
            >
              <Text
                bg={useColorModeValue('black', 'gray.700')}
                color="white"
                p={2}
                w="8rem"
                h="8rem"
                fontSize={30}
                fontWeight="extrabold"
                textAlign="right"
                userSelect="none"
              >
                Give me a <span style={{ color: color }}> grade</span>
              </Text>
            </motion.div>
          </Flex>
        </ScaleFade>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader p={0}>
            <Center
              bg={useColorModeValue('black', 'gray.700')}
              color="white"
              p={2}
              mt={5}
              w="60%"
            >
              Do you like this site?
            </Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Leave your comment and say me from 0 to 10 if you like this site.
            <Divider my={2} />
            <Textarea
              onChange={(evt) => setComment(evt.target.value)}
              placeholder="Your comment"
              resize="none"
            />
            <NumberInput
              my={2}
              defaultValue={10}
              max={10}
              min={0}
              clampValueOnBlur={false}
              onChange={(evt) => setGrade(parseInt(evt))}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button variant="ghost" onClick={() => sendResponse()}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
