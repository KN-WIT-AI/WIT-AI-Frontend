import { ChakraProvider } from "@chakra-ui/react";
import { Chat } from "./features/Chat/Chat";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: `'Open Sans', sans-serif`,
  },
})

export const App = () => (
  <ChakraProvider theme={theme}>
    <ColorModeSwitcher />
    <Chat />
  </ChakraProvider>
);
