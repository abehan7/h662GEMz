import { Flex } from "@chakra-ui/react";
import { FC } from "react";
import Header from "./Header";

const Layout: FC = ({ children }) => {
  return (
    <Flex h="100vh" direction="column">
      <Header />
      {children}
    </Flex>
  );
};

export default Layout;
