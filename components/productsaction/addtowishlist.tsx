"use client";

import { WishlistContext } from "@/context/wishlist.context";
import { useContext } from "react";
import { FiHeart } from "react-icons/fi";
import { IoHeartOutline } from "react-icons/io5";

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
      onClick={(e) => {
        e.stopPropagation();
        handleWishlist();
      }}
      className={className}
    >
      {detail ? (
        <>
          <IoHeartOutline className="text-xl" />
          {isAdded ? "Remove from Wishlist" : "Add to Wishlist"}
        </>
      ) : isAdded ? (
        <IoHeartOutline className="text-xl text-white" />
      ) : (
        <FiHeart className="text-xl text-white" />
      )}
    </button>
  );
};

export default AddToWishlist;
