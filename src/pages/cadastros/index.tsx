
import { FormEvent, useContext, useEffect, useState } from 'react'
import { AuthContext, singout } from '../../contexts/AuthContext'
import Head from 'next/head'
import styles from './cadastros.module.scss';
import Router from "next/router";
import { api } from '../../services/api';
import Navbar from '../../components/Navbar';



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
      <Navbar />
      <div className="container my-12 px-6 mx-auto">
        <div className="p-6 rounded-lg shadow-lg bg-white grid md:grid-cols-4 gap-4">
          { admin ?
          <button type="submit" className="
          w-full
          px-6
          py-2.5
          bg-blue-600
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-blue-700 hover:shadow-lg
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg
          transition
          duration-150
          ease-in-out" onClick={()=>{Router.push('/cadastroFuncionario')}} >Funcionarios</button> 
          : ""}
          <button type="submit" className="
                  w-full
                  px-6
                  py-2.5
                  bg-blue-600
                  text-white
                  font-medium
                  text-xs
                  leading-tight
                  uppercase
                  rounded
                  shadow-md
                  hover:bg-blue-700 hover:shadow-lg
                  focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                  active:bg-blue-800 active:shadow-lg
                  transition
                  duration-150
                  ease-in-out" onClick={()=>{Router.push('/cadastroLoja')}} >Lojas</button>        
          <button type="submit" className="
                  w-full
                  px-6
                  py-2.5
                  bg-blue-600
                  text-white
                  font-medium
                  text-xs
                  leading-tight
                  uppercase
                  rounded
                  shadow-md
                  hover:bg-blue-700 hover:shadow-lg
                  focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                  active:bg-blue-800 active:shadow-lg
                  transition
                  duration-150
                  ease-in-out" onClick={()=>{Router.push('/cadastroCliente')}} >Clientes</button>
          <button type="submit" className="
                  w-full
                  px-6
                  py-2.5
                  bg-blue-600
                  text-white
                  font-medium
                  text-xs
                  leading-tight
                  uppercase
                  rounded
                  shadow-md
                  hover:bg-blue-700 hover:shadow-lg
                  focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                  active:bg-blue-800 active:shadow-lg
                  transition
                  duration-150
                  ease-in-out" onClick={()=>{Router.push('/cadastroVenda')}} >vendas</button>

        </div>
      </div>
      

    </>

  )
}

export default Cadastros