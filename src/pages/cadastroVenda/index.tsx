import {FormEvent, useState, useRef, useEffect} from 'react'
import Head from 'next/head'
import { RiDeleteBin5Line, RiEditLine, RiSearch2Line } from "react-icons/ri";

import Navbar from '../../components/Navbar'
import styles from './cadastroVenda.module.scss'
import { api } from '../../services/api';


interface Transferencia {
  cliente_nome: string;
  cliente_data_nascimento: Date;
  id: string
}

function CadastroVenda() {
  
  const [idCliente, setIdCliente] = useState("")
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [idLoja, setIdLoja] = useState('')
  const [valorVenda, setValorVenda] = useState('')
  const [dataVenda, setDataVenda] = useState('')
 
  const [disableInputUser, setDisableImputUser] = useState(false)

  const [vendaPresente, setVendaPreesente] = useState(false)
  const [admin, setAdmin] = useState(false);

  const [clienteList, setClienteList] = useState<Transferencia>()
  const [lojaList,  setLojaList] = useState([])

  useEffect(() => {
  
    
    
   /*  api.get('/lojalist'  
    ).then(({ data }) => {  
       
      setLojaList(data)
   
    })
    .catch(err => console.log(err))   */

    setDisableImputUser(false)
    if(typeof clienteList !== 'undefined' ){
      if(!!clienteList.cliente_nome){
        setNome(clienteList.cliente_nome);     
        setDataNascimento(new Date(clienteList.cliente_data_nascimento).toLocaleDateString(
          'en-CA',{timeZone: 'UTC'}) )
        setIdCliente(clienteList.id)
          setDisableImputUser(true)
      }else{      
      setNome('');     
      setDataNascimento('')

      setDisableImputUser(false)}
    }

  }, [clienteList]);

  useEffect(() => {
    
      api.get('/lojalist')
      .then(({ data }) => {
        setLojaList(data.resultLoja)
      })
        .catch(console.error);
  

  },[])


   function handleClienteTelefone() {
      api.post('/buscarClienteTelefone',{
      cliente_telefone:telefone,
    }).then(({ data }) => {     
      setClienteList(data)
    })
    .catch(err => console.log(err))  

  }


  function handleCheckPresente(event : any){
   
    if (event) {
      setVendaPreesente(true)
    } else {
      setVendaPreesente(false)
    }
  }





  async function handleSubmit(event: FormEvent){
    event.preventDefault()
    event.isDefaultPrevented()
    console.log(idCliente)
    console.log(telefone)
    console.log(dataNascimento)
    console.log(nome)
    console.log(idLoja)
    console.log(valorVenda)
    console.log(dataVenda)
    console.log(vendaPresente)
  }


  return (
    <>
      <Head>
        <title>Toron - Cadastro Vendas</title>
      </Head>
      <Navbar />
      <div className="container my-12 px-6 mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">
        Cadastrar Venda
        </h2>
        <div className="block p-6 rounded-lg shadow-lg bg-white ">
          <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
          <div className="form-group mb-6 flex flex-row gap-2">
              <input className="form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleInput123"
                aria-describedby="emailHelp123" 
                placeholder="Telefone"
                type="text" 
                value={telefone}
                onChange={e => setTelefone(e.target.value)}  
                         
              />
                  <button className='flex justify-end'   type="button" onClick={() => handleClienteTelefone()}>  
                <RiSearch2Line 
                size={20}
                  color="#737380"
                  className=""              
                />  
              </button>
            </div>  
            <div className="form-group mb-6">
             <input className="form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleInput123"
                aria-describedby="emailHelp123" 
                placeholder="Endereço"
                type="date" 
                value={dataNascimento
                  }
                onChange={e => setDataNascimento(e.target.value)} 
                disabled={disableInputUser}     
              />
            </div>                       
          </div> 
          <div className="grid grid-cols-1 gap-4">
              <div className="form-group mb-6">
                <input className="form-control
                  block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleInput123"
                  aria-describedby="emailHelp123" 
                  placeholder="Nome"
                  type="text"  
                  value={nome} 
                  onChange={e => setNome(e.target.value)}
                  disabled={disableInputUser}     
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="form-group mb-6">
                <select id="Lojas"   onChange={e => setIdLoja(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-600  focus:border-blue-600  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-600  dark:focus:border-blue-600 ">
                  <option  value={"DEFAULT"} selected>Selecionaee a loja</option>
                    {lojaList.map((loja) => ( 
                      <option key={loja.id}  value={loja.id}>{loja.loja_nome}</option>
                    ))}
                  </select>            
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
          <div className="form-group mb-6 flex flex-row gap-2">
              <input className="form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleInput123"
                aria-describedby="emailHelp123" 
                placeholder="Valor venda"
                type="text" 
                value={valorVenda}
                onChange={e => setValorVenda(e.target.value)}  
                         
              />
         
            </div>  
            <div className="form-group mb-6">
             <input className="form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleInput123"
                aria-describedby="emailHelp123" 
                placeholder="Endereço"
                type="date" 
                value={dataVenda}
                onChange={e => setDataVenda(e.target.value)} 
              
              />
            </div>                       
          </div> 

          <div className="form-group form-check text-center mb-6 ">               
                <input 
                  id="checkbox-item-1" 
                  type="checkbox"  
                  checked={vendaPresente} 
                  onChange={e =>handleCheckPresente(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" 
                />         
                <label className="ml-2 form-check-label inline-block text-gray-800">Foi presente?</label> 
              </div>
              
            <div className="grid grid-cols-3 gap-1 max-w-sm">              
              <button 
                type="submit" 
                className="
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
                  ease-in-out"
                value={'test'}>
                cadastrar
              </button>
            </div>
          </form>
        </div>
      </div>
      

    </>

  )
}
export default CadastroVenda