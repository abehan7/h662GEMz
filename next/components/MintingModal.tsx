import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { FC, useState } from "react";
import { MINT_GEM_ADDRESS } from "../caverConfig";
import { useAccount, useCaver } from "../hooks";
import { IGem } from "../interfaces";

interface MintingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MintingModal: FC<MintingModalProps> = ({ isOpen, onClose }) => {
  const [metaDataURI, setMetadataURI] = useState<IGem | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { account } = useAccount();
  const { mintGemContract, caver } = useCaver();

  const onClickMint = async () => {
    try {
      if (!account || !mintGemContract || !caver) return;

      setIsLoading(true);

      const mintGemResponse = await caver.klay.sendTransaction({
        type: "SMART_CONTRACT_EXECUTION",
        from: account,
        to: MINT_GEM_ADDRESS,
        value: caver.utils.convertToPeb(1, "KLAY"),
        gas: "3000000",
        data: mintGemContract.methods.mintGem().encodeABI(),
      });

      if (mintGemResponse.status) {
        const getTokenResponse = await mintGemContract.methods
          .getLatestMintedGem(account)
          .call();

        const metadataResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_METADATA_URI}/${getTokenResponse[0]}/${getTokenResponse[1]}.json`
        );

        setMetadataURI(metadataResponse.data);
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error);

      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>민팅하기</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {metaDataURI ? (
            <Flex justifyContent="center">
              <Box w={200}>
                <Image
                  src={metaDataURI.image}
                  fallbackSrc="loading.png"
                  alt="h662GEMz"
                />
                <Text>{metaDataURI.name}</Text>
                <Text>{metaDataURI.description}</Text>
              </Box>
            </Flex>
          ) : (
            <>
              <Text>민팅을 진행하시겠습니까?</Text>
              <Text>(1 Klay가 소모됩니다.)</Text>
            </>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="purple"
            variant="ghost"
            mr={2}
            onClick={onClickMint}
            isLoading={isLoading}
            disabled={isLoading}
          >
            민팅하기
          </Button>
          <Button onClick={onClose}>닫기</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MintingModal;
