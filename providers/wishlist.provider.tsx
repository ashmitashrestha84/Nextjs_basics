"use client";

import {
  deleteWishlist,
  getAllWishlist,
  postAllWishlist,
} from "@/api/wishlist.api";
import { WishlistContext } from "@/context/wishlist.context";

import { TWishlist } from "@/types/wishlist.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";
import toast from "react-hot-toast";

interface IProps {
  children: ReactNode;
}

const WishlistProvider = ({ children }: IProps) => {
  const queryClient = useQueryClient();

  // Get wishlist
  const { data: wishList } = useQuery({
    queryKey: ["get-wishlist"],
    queryFn: getAllWishlist,
  });

  // Add wishlist
  const { mutate: addWishlist } = useMutation({
    mutationFn: postAllWishlist,

    onSuccess: (response) => {
      toast.success(response?.message ?? "Product added to wishlist");

      queryClient.invalidateQueries({
        queryKey: ["get-wishlist"],
      });
    },

    onError: (error: any) => {
      toast.error(error?.message ?? "Something went wrong");
    },
  });

  // Delete wishlist
  const { mutate: removeWishlist } = useMutation({
    mutationFn: deleteWishlist,

    onSuccess: (response) => {
      toast.success(response?.message ?? "Product removed from wishlist");

      queryClient.invalidateQueries({
        queryKey: ["get-wishlist"],
      });
    },

    onError: (error: any) => {
      toast.error(error?.message ?? "Something went wrong");
    },
  });

  // Add product
  const addToWishlist = ({ productId }: { productId: string }) => {
    addWishlist(productId);
  };

  // Remove product
  const removeFromWishlist = ({ productId }: { productId: string }) => {
    removeWishlist(productId);
  };

  // Check if product already exists
  const isExists = ({ productId }: { productId: string }) => {
    if (!wishList) return false;

    return wishList.products.some((product:any) => product._id === productId);
  };
  return (
    <WishlistContext.Provider
      value={{
        wishList: wishList ?? null,
        addToWishlist,
        removeFromWishlist,
        isExists,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;
