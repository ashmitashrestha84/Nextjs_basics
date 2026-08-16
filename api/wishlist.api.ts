import api from ".";

export const postAllWishlist = async (productId: string) => {
  try {
    const response = await api.post("/wishlists", {
      product_id: productId,
    });

    return response?.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

export const getAllWishlist = async () => {
  try {
    const response = await api.get("/wishlists");

    return response?.data?.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

export const deleteWishlist = async (productId: string) => {
  try {
    const response = await api.delete(`/wishlists/${productId}`);

    return response?.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};
