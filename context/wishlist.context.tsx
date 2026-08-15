import { TWishlist } from "@/types/wishlist.types";
import { createContext } from "react";

type TWishlistContext = {
  wishList: TWishlist[] | null;
  addToWishlist: ({ productId }: { productId: string }) => void;
  removeFromWishlist: ({ productId }: { productId: string }) => void;
  isExists: ({ productId }: { productId: string }) => boolean;
};

const initialValue: TWishlistContext = {
  wishList: null,

  addToWishlist: ({ productId }) => {
    console.log("Add:", productId);
  },

  removeFromWishlist: ({ productId }) => {
    console.log("Remove:", productId);
  },

  isExists: ({ productId }) => {
    return false;
  },
};

export const WishlistContext = createContext<TWishlistContext>(initialValue);
