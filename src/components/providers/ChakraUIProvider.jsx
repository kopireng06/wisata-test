import { ChakraProvider } from '@chakra-ui/react'

function ChakraUIProvider({ children }) {
  return <ChakraProvider>{children}</ChakraProvider>
}

export default ChakraUIProvider
