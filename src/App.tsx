import IndexLayout from '@layouts/IndexLayout'
import { LoadingProvider } from '@providers/loading'
import './App.scss'

function App() {
  return (
    <LoadingProvider>
      <IndexLayout />
    </LoadingProvider>
  )
}

export default App
