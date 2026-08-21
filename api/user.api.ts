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

export const getUserById = async (id: string) => {
  try {
    const response = await api.get(`/users/${id}`);

    return response?.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};


export const updateUser = async (id:string,formData:FormData) => {
  try {
    const response = await api.put(`/users/${id}`, formData);
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
