import { FormEvent, useContext, useState, useEffect } from 'react'
import { parseCookies} from 'nookies'
import { AuthContext } from '../contexts/AuthContext'
import Head from 'next/head'
import styles from './index.module.scss';
import { api } from '../services/api';
import Router from 'next/router';



function Index() {
  const [cpf, setCpc] = useState("")
  const [password, setPassword] = useState("")
  const {signIn} = useContext(AuthContext)

  useEffect(() => {
    const {'toron.token':token} = parseCookies()

    if(token){
        api.get('me').then(Response => {
          Router.push("/dashboard")
        })
        .catch(() => {
           singout()
        })
}})

 
 async function handleSubmuit(event: FormEvent) {
    event.preventDefault()
    const data = {
      cpf,
      password
    }

    

    await signIn(data)
  }

  return (
    <>
      <Head>
        <title>Toron - Cadastro Cliente</title>
      </Head>
      <main className={styles.contentContainer}>
    
      <form onSubmit={handleSubmuit}  className={styles.form}>
        <strong>CPF</strong>
        <input type="text" placeholder="XXXXXXXXXXX" value={cpf} onChange={e => setCpc(e.target.value)}/>
        <strong>SENHA</strong>
        <input type="password" placeholder="*********" value={password} onChange={e => setPassword(e.target.value)}/>
        <button type="submit">
         Entrar no sistema
        </button>
      
      </form>
 
      </main>
    </>
  )
}

export default Index