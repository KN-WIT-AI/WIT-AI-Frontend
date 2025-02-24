import { ChakraProvider } from "@chakra-ui/react";
import { Chat } from "./features/Chat/Chat";
import { extendTheme } from '@chakra-ui/react'


const config = {
  fonts: {
    heading: `'Open Sans', sans-serif`,
  },
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

// 3. extend the theme
const theme = extendTheme({ config });

export const App = () => (
  <ChakraProvider theme={theme}>
    <Chat />
  </ChakraProvider>
);
