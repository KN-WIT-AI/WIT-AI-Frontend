import { ChakraProvider, theme } from "@chakra-ui/react";
import { Chat } from "./features/Chat/Chat";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

export const App = () => (
  <ChakraProvider theme={theme}>
    <ColorModeSwitcher />
    <Chat />
  </ChakraProvider>
);
