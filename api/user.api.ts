import { IUser } from "@/types/user.types";
import api from ".";

export const getAllUsers=async()=>{
    try{
        const response=await api.get("/users");
        return response?.data; 
    }catch(error:any){
       throw error?.response?.data
    }
}


export const updateUser = async (data: IUser) => {
  try {
    const response = await api.put(`/users/${data._id}`, data);
    return response?.data;
  } catch (error: any) {
    throw error?.response.data;
  }
};

export const deleteUser = async (data: IUser) => {
  try {
    const response = await api.delete(`/users/${data._id}`);
    return response?.data;
  } catch (error: any) {
    throw error?.response.data;
  }
};
