import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect } from "react";

import { useCaver } from "../hooks";

const Home: NextPage = () => {
  const { caver, mintGemContract } = useCaver();

  useEffect(() => console.log(caver), [caver]);
  useEffect(() => console.log(mintGemContract), [mintGemContract]);

  return <Box>Home</Box>;
};

export default Home;
