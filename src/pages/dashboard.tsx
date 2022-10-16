import { FormEvent, useContext, useEffect, useState } from 'react'
import { AuthContext, singout } from '../contexts/AuthContext'
import { api } from '../services/api'
import {Header} from '../components/Heder'

function Dashboard() {
    const { user } = useContext(AuthContext)

useEffect(() => {
  api.get('/me')
  .then(Response => console.log(Response))
  .catch(err => console.log(err))
}, [])

    async function handleButton() {
      singout()
    }
console.log(user)
  return (
    <>
    <Header />
       <h1>Dashboard</h1>
       <p> {user?.nome}</p>
   <button onClick={handleButton}>sair </button>
    </>

  )
}

export default Dashboard