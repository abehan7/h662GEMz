import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";
import { useAccount } from "../hooks";

const Header: FC = () => {
  const { account } = useAccount();

  return (
    <Flex w="full" p={4} justifyContent="space-between">
      <Box>h662GEMz</Box>
      <Box>
        <Link href="/">
          <Button size="sm" variant="ghost">
            Minting
          </Button>
        </Link>
        <Link href="my-gemz">
          <Button size="sm" variant="ghost" ml={2}>
            My GEMz
          </Button>
        </Link>
      </Box>
      <Box>
        <Text fontSize="sm">
          {account
            ? `${account.substr(0, 4)}...${account.substr(
                account.length - 4,
                account.length
              )}님 환영합니다`
            : "카이카스 지갑을 연결해주세요"}
        </Text>
      </Box>
    </Flex>
  );
};

export default Header;
