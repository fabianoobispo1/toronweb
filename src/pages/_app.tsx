import { FormEvent, useContext, useState } from 'react'
import { AuthProvider } from '../contexts/AuthContext'
import '../styles/global.scss';
import { AuthContext } from '../contexts/AuthContext'
//import {Header} from '../components/Heder'


function App({Component, pageProps}) {

  return (
  <AuthProvider>
    <Component   {...pageProps}/>
  </AuthProvider>
  )
}

export default App
