import ChakraUIProvider from './components/providers/ChakraUIProvider'
import ReactQueryProvider from './components/providers/ReactQueryProvider'
import Home from './components/pages/Home'

function App() {
  return (
    <ChakraUIProvider>
      <ReactQueryProvider>
        <Home />
      </ReactQueryProvider>
    </ChakraUIProvider>
  )
}

export default App
