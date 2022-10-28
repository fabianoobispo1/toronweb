import { AuthProvider } from '../contexts/AuthContext'
import '../styles/global.css';
import '../styles/global.scss';


function App({Component, pageProps}) {
  return (
  <AuthProvider>
    <Component   {...pageProps}/>
  </AuthProvider>
  )
}

export default App
