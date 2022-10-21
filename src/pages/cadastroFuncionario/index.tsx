import {FormEvent, useState} from 'react'
import {Header} from '../../components/Heder'
import Head from 'next/head'
import styles from './cadastroFuncionario.module.scss'
import { api } from '../../services/api';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CadastroFuncionario() {
  const [ nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  async function handleSubmuit(event: FormEvent){
    event.preventDefault()

          //verifica campos
          if (cpf == '' ){
            toast("Campo cpf vazio")
            return 
          }
          if (password == '' ){
            toast("Campo Senha vazio")
            return
          }

    const response = await api.post('/createuser',{
      nome, cpf, email, password
    }).then(Response =>{
      console.log(Response)
      setNome('')
      setCpf('')
      setEmail('')
      setpassword('')
    })
    .catch(err => console.log(err)) 

    console.log({/* nome, cpf, email, password */})
  }

  return (
    <>
      <Head>
        <title>Toron - Cadastro Usuarios</title>
      </Head>
      <Header />
      <main className={styles.contentContainer}>  
        <h1>Cadastrar Funcionario</h1>  
        <form onSubmit={handleSubmuit}  className={styles.form}>
        <div >  
        <strong> CPF: </strong>
        <input type="text"  value={cpf} onChange={e => setCpf(e.target.value)}/>
        </div>
        <div>
        <strong> Nome: </strong>
        <input type="text"  value={nome} onChange={e => setNome(e.target.value)}/>
        </div>
     
        <div>
        <strong> Senha: </strong>
        <input type="text"  value={password} onChange={e => setpassword(e.target.value)}/>
        </div>
        <div>
        <strong> Email: </strong>
        <input type="text"  value={email} onChange={e => setEmail(e.target.value)}/>
        </div>
     

         
      
      </form>
      <button type="submit">
         Salvar
        </button>
 

        <ToastContainer />
      </main>
    </>

  )
}
export default CadastroFuncionario