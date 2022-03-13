import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import type { NextPage } from "next";
import MintingModal from "../components/MintingModal";

const Home: NextPage = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Flex justifyContent="center" alignItems="center" minH="100vh">
        <Button colorScheme="purple" onClick={onOpen}>
          민팅하기
        </Button>
      </Flex>
      <MintingModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Home;
