import api from ".";

export const getFeaturedAllProducts=async()=>{
    try{
        const response=await api.get("/products/featured");
        return response?.data; 
    }catch(error:any){
       throw error?.response?.data
    }
}