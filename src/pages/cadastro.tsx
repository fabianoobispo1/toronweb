import { FormEvent, useContext, useEffect, useState } from 'react'
import { AuthContext, singout } from '../contexts/AuthContext'
import { api } from '../services/api'
import {Header} from '../components/Heder'

function Cadastro() {
  const { user } = useContext(AuthContext)




  return (
    <>
    <Header />
       <h1>Cadastros</h1>
       <p> {user?.nome}</p>

    </>

  )
}

export default Cadastro