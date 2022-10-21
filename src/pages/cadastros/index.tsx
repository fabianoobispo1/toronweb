
import { FormEvent, useContext, useEffect, useState } from 'react'
import { AuthContext, singout } from '../../contexts/AuthContext'
import {Header} from '../../components/Heder'
import Head from 'next/head'
import styles from './cadastros.module.scss';
import Router from "next/router";
import { api } from '../../services/api';



function Cadastros() {

  const { user } = useContext(AuthContext)

  const [admin, setAdmin] = useState(false);


  useEffect(() => {
    api.get('/me')
    .then(({ data }) => {
      setAdmin(data.administrador)
      console.log(data.administrador)
    })
      .catch(console.error);
  })




  return (
    <>
     <Head>
        <title>Toron - Cadastros</title>
      </Head>
     
    <Header />
    <main className={styles.contentContainer}>  
      { admin ?<button onClick={()=>{Router.push('/cadastroFuncionario')}} >Funcionarios</button> : ""}
      <button onClick={()=>{Router.push('/cadastroLoja')}} >Lojas</button>        
      <button onClick={()=>{Router.push('/cadastroCliente')}} >Clientes</button>
      <button onClick={()=>{Router.push('/cadastroVenda')}} >vendas</button>


    </main>
      

    </>

  )
}

export default Cadastros