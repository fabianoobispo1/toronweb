import { FormEvent, useContext, useState, useEffect } from 'react'
import { parseCookies} from 'nookies'
import { AuthContext } from '../contexts/AuthContext'
import Head from 'next/head'
//import styles from './index.module.scss';
import { api } from '../services/api';
import Router from 'next/router';
import { InfinitySpin } from 'react-loader-spinner'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function Index() {
  const [cpf, setCpc] = useState("")
  const [password, setPassword] = useState("")
  const {signIn} = useContext(AuthContext)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const {'toron.token':token} = parseCookies()

    if(token){
        api.get('me').then(Response => {
          Router.push("/dashboard")
        })
        
}})

 
 async function handleSubmuit(event: FormEvent) {
    event.preventDefault()
    setLoading(true)
    const data = {
      cpf,
      password
    }
  

    //verifica campos
    if (data.cpf == '' ){
      toast("Campo cpf vazio")
      return 
    }
    if (data.password == '' ){
      toast("Campo Senha vazio")
      return
    }

     await signIn(data)
      setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Toron - Cadastro Cliente</title>
      </Head>
      

      <div className="flex flex-col justify-center items-center m-6">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmuit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" >
            Cpf
            </label>
            <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              id="cpf" 
              type="text" 
              placeholder="XXXXXXXXXXX"
              value={cpf} 
              onChange={e => setCpc(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
            Senha
            </label>
            <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
              id="password" 
              type="password" 
              placeholder="******"
              value={password} 
              onChange={e => setPassword(e.target.value)}
            />
           {/*  <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
          </div>
          <div className="flex items-center justify-between">
            {loading?
            <button 
            className="h-12 w-72 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-16 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
          <div className='-m-2 ml-1'>
           <InfinitySpin
              width='90'
              
              color="white" 
            /> 
          </div>  
          </button>           
            :
            <button 
              className="h-12 w-72 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-16 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Entrar no sistema
            </button>
            }
            {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            Forgot Password?
            </a> */}
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
        &copy;2022 Toron. All rights reserved.
        </p>
      </div>
 


  


      <ToastContainer />
      
    </>
  )
}

export default Index