import { Box, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import { FC, useEffect, useState } from "react";

import { IGem } from "../interfaces";

interface GemCardProps {
  gemRank: string;
  gemType: string;
}

const GemCard: FC<GemCardProps> = ({ gemRank, gemType }) => {
  const [metadataURI, setMetadataURI] = useState<IGem | undefined>(undefined);

  const getMetadata = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_METADATA_URI}/${gemRank}/${gemType}.json`
      );

      setMetadataURI(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMetadata();
  }, []);

  return (
    <Box w={200}>
      <Image
        src={metadataURI?.image}
        fallbackSrc="loading.png"
        alt="h662GEMz"
      />
      <Text>{metadataURI?.name}</Text>
      <Text>{metadataURI?.description}</Text>
    </Box>
  );
};

export default GemCard;
