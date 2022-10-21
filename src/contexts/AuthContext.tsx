import Router from "next/router";
import {setCookie, parseCookies, destroyCookie} from 'nookies'
import {createContext, ReactNode, useEffect, useState} from "react";
import { api } from "../services/api";
import {  toast } from 'react-toastify';

type User = {
    id: number
    administrador: boolean,
    cpf?: number,
    email?: string,
    nome?: string
}
type SignInCredentials = {
    cpf: string;
    password: string
}

type AuthContextData = {
    signIn: (credentials: SignInCredentials)=> Promise<void>;
    singout: () => void
    user: User;
    isAuthenticated: boolean
}

type AuthProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function singout() {
    destroyCookie(undefined,'toron.token')

    Router.push('/')
}

export function AuthProvider({children}:AuthProviderProps) {   
    const [user, setuser] = useState<User>();
    const isAuthenticated = !!user;
 

    useEffect(() => {
        const {'toron.token':token} = parseCookies()

        if(token){
            api.get('me').then(Response => {
            const {administrador, cpf, email, id, nome} = Response.data;

            setuser({administrador, cpf, email, id, nome})
            })
            .catch(() => {
               singout()
            })
        }
    }, [])

    async function signIn({cpf, password}: SignInCredentials){

       try {
        const response = await api.post('sessioncpf',{
            cpf, 
            password
        })
        const {id, administrador, nome} = response.data.user;
        const {token} = response.data

        setCookie(
            undefined,
            'toron.token',
            token,
            {
                maxAge: 60 * 60 * 24 * 30, //30 dias 
                path: '/'
            })

        setuser({id, administrador, nome})
        
        api.defaults.headers['Authorization'] = `Bearer ${token}`;

        Router.push('/dashboard')

       } catch (error) {
        const eer = error.toJSON()

        if (eer.status == 401){
            toast("Dados invalidos")
        }
        
        
       
     
       }
    }

    return (
        <AuthContext.Provider value={{ signIn,singout, isAuthenticated, user }}>
            {children}
        </AuthContext.Provider>
    )
}