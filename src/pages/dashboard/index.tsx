import { FormEvent, useContext, useEffect, useState } from 'react'
import { AuthContext, singout } from '../../contexts/AuthContext'
import { api } from '../../services/api'
import Head from 'next/head'
import styles from './dashboard.module.scss'
import { useCan } from '../../hooks/useCan'
import Navbar from '../../components/Navbar'


function Dashboard() {
  const { user } = useContext(AuthContext)
  const [nome, setNome] = useState('')

  useEffect(() => {
    api.get('/me')
    .then(Response => {
      setNome(Response.data.nome)
      console.log(Response.data.nome)
    })
    .catch(err => console.log(err))

   
  }, [])



  return (
    <>
       <Head>
        <title>Toron - Dashboard</title>
      </Head>
      <Navbar />
    <main className={styles.contentContainer}>  
       <p> {nome}</p>
     
    </main>
    </>

  )
}

export default Dashboard