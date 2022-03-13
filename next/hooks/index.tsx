import Caver, { Contract } from "caver-js";
import { useEffect, useState } from "react";
import { MINT_GEM_ABI, MINT_GEM_ADDRESS } from "../caverConfig";

export const useAccount = () => {
  const [account, setAccount] = useState<string>("");

  const getAccount = async () => {
    try {
      const response = await window.klaytn.enable();

      setAccount(response[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (window.klaytn) {
      getAccount();
    }
  }, []);

  return { account };
};

export const useCaver = () => {
  const [caver, setCaver] = useState<Caver | undefined>(undefined);
  const [mintGemContract, setMintGemContract] = useState<Contract | undefined>(
    undefined
  );

  useEffect(() => {
    if (window.klaytn) {
      setCaver(new Caver(window.klaytn));
    }
  }, []);

  useEffect(() => {
    if (!caver) return;

    setMintGemContract(caver.contract.create(MINT_GEM_ABI, MINT_GEM_ADDRESS));
  }, [caver]);

  return { caver, mintGemContract };
};
