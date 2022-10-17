import { FormEvent, useContext, useEffect, useState } from 'react'
import { AuthContext, singout } from '../contexts/AuthContext'
import { api } from '../services/api'
import {Header} from '../components/Heder'

function Cadastro() {
  const { user } = useContext(AuthContext)




  return (
    <>
    <Header />
      <div>
      <h1>Cadastros</h1>
    
      <div>
        <button>Lojas</button>
        <button>Funcionarios</button>
        <button>Clientes</button>
        <button>vendas</button>
      </div>
      </div>
      

    </>

  )
}

export default Cadastro