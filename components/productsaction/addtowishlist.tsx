"use client";

import { WishlistContext } from "@/context/wishlist.context";
import { useContext } from "react";
import { FiHeart } from "react-icons/fi";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

interface IProps {
  productId: string;
  className?: string;
  detail?: string;
}

const AddToWishlist = ({ productId, className, detail }: IProps) => {
  const { addToWishlist, removeFromWishlist, isExists } =
    useContext(WishlistContext);

  const isAdded = isExists({ productId });

  const handleWishlist = () => {
    if (isAdded) {
      removeFromWishlist({ productId });
    } else {
      addToWishlist({ productId });
    }
  };

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        handleWishlist();
      }}
      className={className}
    >
      {detail ? (
        <>
          {isAdded ? (
            <IoHeart className="text-xl text-amber-600" />
          ) : (
            <IoHeartOutline className="text-xl" />
          )}

          {isAdded ? "Remove from Wishlist" : "Add to Wishlist"}
        </>
      ) : isAdded ? (
        <IoHeart className="text-xl text-white fill-amber-600" />
      ) : (
        <FiHeart className="text-xl text-white" />
      )}
    </button>
  );
};

export default AddToWishlist;
