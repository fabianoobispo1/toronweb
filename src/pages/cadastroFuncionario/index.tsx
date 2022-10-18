import {FormEvent, useState} from 'react'
import {Header} from '../../components/Heder'
import Head from 'next/head'
import styles from './cadastroFuncionario.module.scss'
import { api } from '../../services/api';

function cadastroFuncionario() {

  const [ nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  async function handleSubmuit(event: FormEvent){
    event.preventDefault()
    const response = await api.post('/createuser',{
      nome, cpf, email, password
    })
    console.log(response)
/*     .then(Response => console.log(Response))
    .catch(err => console.log(err)) */

    console.log({nome, cpf, email, password})
  }

  return (
    <>
      <Head>
        <title>Toron - Cadastro Usuarios</title>
      </Head>
      <Header />
      <main className={styles.contentContainer}>  

       <form onSubmit={handleSubmuit}  className={styles.form}>
        <div>
        <strong>Nome: </strong>
        <input type="text"  value={nome} onChange={e => setNome(e.target.value)}/>
        </div>
        <div>
        <strong>CPF:</strong>
        <input type="text"  value={cpf} onChange={e => setCpf(e.target.value)}/>
        </div>
        <div>
        <strong>Email:</strong>
        <input type="text"  value={email} onChange={e => setEmail(e.target.value)}/>
        </div>
        <div>
        <strong>Senha:</strong>
        <input type="text"  value={password} onChange={e => setpassword(e.target.value)}/>
        </div>

       
        <button type="submit">
         Salvar
        </button>
      
      </form>
    
 


      </main>
    </>

  )
}
export default cadastroFuncionario