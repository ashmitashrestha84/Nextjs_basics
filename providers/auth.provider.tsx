"use client"

import { getProfile, logoutUser } from "@/api/auth.api"
import { AuthContext } from "@/context/auth.context.api"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"


const AuthProvider = ({children}:{children:React.ReactNode}) => {
    const router=useRouter();
    const {data,isLoading}=useQuery({
        queryFn:getProfile,
        queryKey:["auth","me"],
        retry:false,
        refetchInterval:5 * 60 * 1000,
        refetchOnWindowFocus:true
    })

    const {mutate:logoutMutation,isPending}=useMutation({
        mutationFn:logoutUser,
        onSuccess:(response)=>{
            toast.success( response.message ?? "logout success")
            router.replace("/")
        },
        onError:(error:any)=>{
            toast.error(error.message ?? "logout failed")
        }
    })
  const login=()=>{

  }
  const logout=()=>{

  }

const register=()=>{

}

return (
  <AuthContext.Provider
    value={{
      isLoading: !!isLoading || !!isPending,
      login,
      logout:logoutMutation,
      register,
      user: data?.data ?? null,
    }}
  >
    {children}
  </AuthContext.Provider>
);
}

export default AuthProvider