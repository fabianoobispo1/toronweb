import {FormEvent, useState, useRef, useEffect} from 'react'
import Head from 'next/head'
import styles from './cadastroCliente.module.scss'
import { api } from '../../services/api';
import { RiDeleteBin5Line, RiEditLine } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { InfinitySpin } from 'react-loader-spinner'
import Navbar from '../../components/Navbar';

function CadastroLoja() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");




  const [idModal, setIdModal] = useState("");
  const [nomeModal, setNomeModal] = useState("");
  const [telefoneModal, setTelefoneModal] = useState("");
  const [dataNascimentoModal, setDataNascimentoModal] = useState("");

  const [idModalConfirm, setIdModalConfirm] = useState("");
  const [nomeModalConfirm, setNomeModalConfirm] = useState("");
  const [loadingConfirm, setLoadingConfirm] = useState(false)

  const [admin, setAdmin] = useState(false);
  const [lojaList, setLojaList] = useState([])
  const [clienteList, setClienteList] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);

  const ref = useRef(null);
 
  //verifica se usuario logado e administrador
  useEffect(() => {
    api.get('/me')
    .then(({ data }) => {
      setAdmin(data.administrador)
     // console.log(data)
    })
      .catch(console.error);
      setLoading(false)
      api.get('/clienteslist')
      .then(({ data }) => {
        setLoading(true)
        console.log(data)
        setClienteList(data.resultClientes)
      })
        .catch(console.error);
  
  },[])




  async function handleSubmit(event: FormEvent){
    event.preventDefault()

    //verifica campos
    if (nome == '' ){
      toast("Campo nome vazio")
      return 
    }
    if (dataNascimento == '' ){
      toast("Campo data nascimento vazio")
      return
    }
    if (telefone == '' ){
      toast("Campo telefone vazio")
      return 
    }
     
    const response = await api.post('/cadastrarCliente',{
      cliente_nome:nome,     
      cliente_data_nascimento: dataNascimento, 
      cliente_telefone: telefone
    }).then(Response =>{
      console.log(Response)
      setNome('')
      setDataNascimento('')
      setTelefone('')

      
    })
    .catch(err => console.log(err))  

    api.get('/clienteslist')
    .then(({ data }) => {
      setLoading(true)
      setClienteList(data.resultClientes)
    })
      .catch(console.error);
    setShowModal(false)

  }

  function handleEditCliente(idCliente: any){
    const cliente =  clienteList.find(obj => {
      return obj.id === idCliente;
    })

    setIdModal(cliente.id)
    setNomeModal(cliente.cliente_nome)
    setTelefoneModal(cliente.cliente_telefone)
    setDataNascimentoModal(cliente.cliente_data_nascimento)   
    
    setShowModal(true)
  }

 async function handleSubmuitModal(){
    
  //verifica campos
  if (nomeModal == '' ){
    toast("Campo nome vazio")
    return 
  }
  if (dataNascimentoModal == '' ){
    toast("Campo data nascimento vazio")
    return
  }
  if (telefoneModal == '' ){
    toast("Campo telefone vazio")
    return 
  }

  const response = await api.post('/atualizarCliente',{
    id:idModal,
    cliente_nome:nomeModal,     
    cliente_data_nascimento: dataNascimentoModal, 
    cliente_telefone: telefoneModal
  }).then(Response =>{
    setLoadingConfirm(false)
    
  })
  .catch(err => console.log(err))

  api.get('/clienteslist')
  .then(({ data }) => {
    setLoading(true)
    setClienteList(data.resultClientes)
  })
    .catch(console.error);
  
    setShowModal(false)
  }

  function handleRemoveCliente(idCliente: any, clientenome:any){
    setIdModalConfirm(idCliente)
    setNomeModalConfirm(clientenome)    
    setShowModalConfirm(true)
  }
  
  async function handleModalconfirmOK(){
    setLoadingConfirm(true)
    const response = await api.post('/removerCliente',{
      id: idModalConfirm
    }).then(Response =>{
      setLoadingConfirm(false)
     
    })
    .catch(err => console.log(err))

    api.get('/clienteslist')
    .then(({ data }) => {
      setLoading(true)
      setClienteList(data.resultClientes)
    })
      .catch(console.error);
    
      
    setShowModalConfirm(false)
  }

  return (
    <>
      <Head>
        <title>Toron - Cadastro Cliente</title>
      </Head>
      <Navbar />
      <div className="container my-12 px-6 mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">
        Cadastrar Cliente
        </h2>
        <div className="block p-6 rounded-lg shadow-lg bg-white ">
          <form onSubmit={handleSubmit}>
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
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
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
                  value={dataNascimento}
                  onChange={e => setDataNascimento(e.target.value)} 
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
                  placeholder="Telefone"
                  type="text" 
                  value={telefone}
                  onChange={e => setTelefone(e.target.value)} 
                />
              </div>             
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
                >
                cadastrar
              </button>
            </div>
          </form>
        </div>
        
        {loading?
        <div className="block p-6 rounded-lg shadow-lg bg-white my-4 ">
          {clienteList.map((cliente) => (
          <div key={cliente.id}  className="p-2 rounded-lg shadow-lg bg-white text-black flex flex-row my-1">
            <div className=" basis-11/12">
              <div className="flex flex-row gap-x-3">
                <p>Nome: </p> <p>{cliente.cliente_nome}</p> 
              </div>
             
              <div className="flex flex-row gap-x-3">
              
                <p>Data Nascimento: </p> <p>{ new Date(cliente.cliente_data_nascimento).toLocaleDateString(
              'pt-br',)}</p> 
              </div>
              <div className="flex flex-row gap-x-3">
                <p>Telefone: </p> <p>{cliente.cliente_telefone}</p> 
              </div>
            </div>               
            <div className=" basis-1/12  flex flex-col justify-between">
              <button className='flex justify-end' onClick={() => handleEditCliente(cliente.id)}>  
                <RiEditLine 
                  color="#737380"
                  className=""              
                />  
              </button>

              <button className='flex justify-end'  onClick={() =>  handleRemoveCliente(cliente.id, cliente.cliente_nome)}>  
                <RiDeleteBin5Line 
                color="#737380"
                className=""            
                />
              </button>          
            </div>
          </div>           
          ))}
        </div>
        :
        <div className="flex justify-center p-6 rounded-lg shadow-lg bg-white my-4 "> 
          <div className='-m-2 -ml-16'>
            <InfinitySpin
              width="80"
              color="blue"  
            />
          </div>       
        </div>}
      </div>
     
      <ToastContainer />
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-gray-600">
                    Alterar Cliente
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-gray-600 opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {                     
                      setShowModal(false)}}
                    >
                    <span className="bg-transparent text-gray-600 opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none ">
                      X
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="block p-6 rounded-lg shadow-lg bg-white ">          
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
                          type="text"  value={nomeModal} onChange={e => setNomeModal(e.target.value)}
                        />
                      </div>                      
                    </div>
                    <div className="grid grid-cols-2 gap-4">
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
                          type="text"  value={  new Date(dataNascimentoModal).toLocaleDateString(
                            'pt-br',)} onChange={e => setDataNascimentoModal(e.target.value)} 
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
                          placeholder="Telefone"
                          type="text"  value={telefoneModal} onChange={e => setTelefoneModal(e.target.value)} 
                        />
                      </div>
                    </div>          
                  </div>                 
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-3 border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setNome('')
                      
                      setShowModal(false)}}>
                    Voltar
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSubmuitModal}>
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {showModalConfirm ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-gray-200 bg-opacity-50"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-gray-600">
                    Aviso
                  </h3>              
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <p className='text-black'>Deseja Remover o CLiente {nomeModalConfirm}?</p>
                 
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-3 border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                    setShowModalConfirm(false)}}
                  >
                    Cancelar
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleModalconfirmOK}
                  >
                  {loadingConfirm?
                   <InfinitySpin
                   width="70"
                   color="green"  
                   /> :
                    "Confirmar"  
    
                   }
                  
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
     
    </>

  )
}
export default CadastroLoja