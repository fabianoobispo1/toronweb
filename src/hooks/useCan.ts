import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

type UseCanParams = {
    administrador?: boolean
}

export function useCan({administrador}:UseCanParams){
    const {user, isAuthenticated} = useContext(AuthContext)

    if(!isAuthenticated) {
        return false;
    }

    if (user.administrador){
        return true
    }else{
        return false
    }
 
}