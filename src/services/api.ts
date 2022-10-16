import axios, { AxiosError } from 'axios'
import {parseCookies} from 'nookies'
import { singout } from '../contexts/AuthContext';


const cookies = parseCookies();

export const api = axios.create({
    baseURL: 'http://192.168.0.10:5000/',
  /*   baseURL: 'http://localhost:5000', */
    headers: {
        Authorization: `Bearer ${cookies['toron.token']}`
    }
})

api.interceptors.response.use(response => {
    return response;
}, (error: AxiosError) =>{
    if(error.response.status === 401){
      //se tiver refresh token seria aqui 
      //mas no momento vamos somente realizar o logoff

      singout();

    }
    return Promise.reject(error)
 
})