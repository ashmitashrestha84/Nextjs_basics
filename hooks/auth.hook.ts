import { AuthContext } from "@/context/auth.context.api"
import { useContext } from "react"



export const useAuth = ()=>{
    if(!AuthContext){
        console.log("auth use hook must be inside suth provider")
    }
    return useContext(AuthContext)
}