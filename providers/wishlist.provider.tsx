"use client";

import {
  deleteWishlist,
  getAllWishlist,
  postAllWishlist,
} from "@/api/wishlist.api";
import { WishlistContext } from "@/context/wishlist.context";
import { useAuth } from "@/hooks/auth.hook";
import { TWishlistItem } from "@/types/wishlist.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";
import toast from "react-hot-toast";

interface IProps {
  children: ReactNode;
}

const WishlistProvider = ({ children }: IProps) => {
  const queryClient = useQueryClient();
const { user } = useAuth();

const { data:wishList } = useQuery({
  queryFn: getAllWishlist,
  queryKey: ["wishlist", user?._id],
  enabled: !!user?._id,
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

  const isExists = ({ productId }: { productId: string }) => {
    if (!wishList || !Array.isArray(wishList.products)) {
      return false;
    }

    return wishList.products.some((item:TWishlistItem) => item.product_id === productId);
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
