import api from ".";

export const postAllWishlist = async (productId: string) => {
  try {
    const response = await api.post("/wishlist", {
      product_id: productId,
    });

    return response?.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

// Get wishlist
export const getAllWishlist = async () => {
  try {
    const response = await api.get("/wishlist");

    return response?.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};


// Get wishlist
export const deleteWishlist = async (productId:string) => {
  try {
    const response = await api.delete(`/wishlist/${productId}`);

    return response?.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};
