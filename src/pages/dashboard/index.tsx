import { FormEvent, useContext, useEffect, useState } from 'react'
import { AuthContext, singout } from '../../contexts/AuthContext'
import { api } from '../../services/api'
import {Header} from '../../components/Heder'
import Head from 'next/head'
import styles from './dashboard.module.scss'

function Dashboard() {
  const { user } = useContext(AuthContext)

  useEffect(() => {
    api.get('/me')
    .then(Response => console.log(Response))
    .catch(err => console.log(err))
  }, [])



  return (
    <>
       <Head>
        <title>Toron - Dashboard</title>
      </Head>
    <Header />
    <main className={styles.contentContainer}>  
       <p> {user?.nome}</p>
    </main>
    </>

  )
}

export default Dashboard