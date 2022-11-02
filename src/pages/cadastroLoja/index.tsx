import {FormEvent, useState, useRef, useEffect} from 'react'
import Head from 'next/head'
import styles from './CadastroLoja.module.scss'
import { api } from '../../services/api';
import { RiDeleteBin5Line, RiEditLine } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { InfinitySpin } from 'react-loader-spinner'
import Navbar from '../../components/Navbar';


function CadastroLoja() {
  const [nome, setNome] = useState("");
  const [sigla, setSigla] = useState("");
  const [endereco, setEndereco] = useState("");

  const [administrador, setAdministrador] = useState(false)

  const [nomeModal, setNomeModal] = useState("");
  const [cpfModal, setCpfModal] = useState("");
  const [emailModal, setEmailModal] = useState("");
  const [passwordModal, setpasswordModal] = useState("");
  const [administradorModal, setAdministradorModal] = useState(false)

  const [admin, setAdmin] = useState(false);
  const [userList, setUserList] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false);

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
      api.get('/userlist')
      .then(({ data }) => {
        setLoading(true)
        setUserList(data.resultAllUser)
       // console.log(data.resultAllUser)
      })
        .catch(console.error);
  

  },[])


 
  


  

/*   useEffect(() => {
    let mounted =true 
 
     async function fetch() {
       const res = await axios.get(`${genUrl()}`);
       if(mounted ){
            set_state(res.data);
       }
      
     }
     fetch();
 
     //this is for cleaning up use effect to prevent updating state when component is unmounted
     return ()=>mounted =false
   },[]);
   const fetchedData = state.results; */







  async function handleSubmuit(event: FormEvent){
    event.preventDefault()

          //verifica campos
          if (nome == '' ){
            toast("Campo nome vazio")
            return 
          }
          if (sigla == '' ){
            toast("Campo sigla vazio")
            return
          }
          if (endereco == '' ){
            toast("Campo endereço vazio")
            return 
          }
     
    /* const response = await api.post('/createuser',{
      nome, cpf, email, password
    }).then(Response =>{
      console.log(Response)
      setNome('')
      setCpf('')
      setEmail('')
      setpassword('')

      
    })
    .catch(err => console.log(err))  
 */
    console.log({ nome, sigla, endereco})
  }

  function handleCheckAdm(event: FormEvent){
    event.preventDefault()
    if (ref.current.checked) {
      setAdministrador(true)
    } else {
      setAdministrador(false)
    }

  }

  function handleEditFuncionrio(idUser: any){
    const user =  userList.find(obj => {
      return obj.id === idUser;
    })

    setNomeModal(user.nome)
    setCpfModal(user.cpf)
    setEmailModal(user.email)
    setpasswordModal("")

    
    setShowModal(true)
  }

  function handleSubmuitModal(){
    
          //verifica campos
          if (cpfModal == '' ){
            toast("Campo cpf vazio")
            return 
          }
          if (emailModal == '' ){
            toast("Campo email vazio")
            return 
          }
          if (nomeModal == '' ){
            toast("Campo nome vazio")
            return
          }


    console.log(cpfModal,emailModal, nomeModal, administradorModal)      
    setShowModal(false)
  }
  

  return (
    <>
      <Head>
        <title>Toron - Cadastro Usuarios</title>
      </Head>
      <Navbar />
      <div className="container my-12 px-6 mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">
        Cadastrar Loja
        </h2>
        <div className="block p-6 rounded-lg shadow-lg bg-white ">
          <form onSubmit={handleSubmuit}>
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
                  placeholder="Nome"
                  type="text"  
                  value={nome} 
                  onChange={e => setNome(e.target.value)}
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
                  id="exampleInput124"
                  aria-describedby="emailHelp124" 
                  placeholder="Sigla"
                  type="text"  
                  value={sigla} 
                  onChange={e => setSigla(e.target.value)} />
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
                  placeholder="Endereço"
                  type="text" 
                  value={endereco}
                  onChange={e => setEndereco(e.target.value)} />
              </div>            
            </div>
             
            <div className="grid grid-cols-3 gap-1 max-w-sm">              
              <button type="submit" 
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
          {userList.map((users) => (
          <div key={users.id}  className="p-2 rounded-lg shadow-lg bg-white text-black flex flex-row my-1">
            <div className=" basis-11/12">
              <div className="flex flex-row gap-x-3">
                <p>nome: </p> <p>{users.nome}</p> 
              </div>
              <div className="flex flex-row gap-x-3">
                <p>cpf: </p> <p>{users.cpf}</p> 
              </div>
              <div className="flex flex-row gap-x-3">
                <p>email: </p> <p>{users.email}</p> 
              </div>
            </div>               
            <div className=" basis-1/12  flex flex-col justify-between">
              <button className='flex justify-end' onClick={() => handleEditFuncionrio(users.id)}>  
                <RiEditLine 
                  color="#737380"
                  className=""              
                />  
              </button>

              <button className='flex justify-end'  onClick={() => handleEditFuncionrio(users.id)}>  
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
                    Alterar Cadastro
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
                          placeholder="Nome"
                          type="text"  value={nome} onChange={e => setNome(e.target.value)}
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
                          id="exampleInput124"
                          aria-describedby="emailHelp124" 
                          placeholder="Sigla"
                          type="text"  value={sigla} onChange={e => setSigla(e.target.value)}
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
                          placeholder="Endereço"
                          type="text"  value={endereco} onChange={e => setEndereco(e.target.value)} 
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
     
    </>

  )
}
export default CadastroLoja