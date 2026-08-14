import api from ".";

//* post
export const postAllWishlist = async (productId:string) => {
  try {
    const response = await api.post("/wishlist");
    product_id:productId
    return response?.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};