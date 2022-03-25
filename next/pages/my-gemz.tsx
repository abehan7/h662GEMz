import { Grid } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import GemCard from "../components/GemCard";
import { useAccount, useCaver } from "../hooks";

const MyGemz: NextPage = () => {
  const [myGemz, setMyGemz] = useState<
    { gemRank: string; gemType: string }[] | undefined
  >(undefined);

  const { account } = useAccount();
  const { mintGemContract } = useCaver();

  const getGemTokens = async () => {
    try {
      if (!account || !mintGemContract) return;

      const response = await mintGemContract.methods
        .getGemTokens(account)
        .call();

      setMyGemz(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!account || !mintGemContract) return;

    getGemTokens();
  }, [account, mintGemContract]);

  return (
    <Grid mt={4} templateColumns="repeat(4, 1fr)" gap={8} justifyItems="center">
      {myGemz?.map((v, i) => {
        return <GemCard key={i} gemRank={v.gemRank} gemType={v.gemType} />;
      })}
    </Grid>
  );
};

export default MyGemz;
