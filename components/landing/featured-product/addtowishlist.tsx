"use client";

import { postAllWishlist } from "@/api/wishlist.api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FiHeart } from "react-icons/fi";
import { IoHeartOutline } from "react-icons/io5";

interface IProps {
  productId: string;
  isAdded?: boolean;
  className?: string;
  detail?: string;
}

const AddToWishlist = ({
  productId,
  isAdded = false,
  className,
  detail,
}: IProps) => {
  const { mutate, isPending } = useMutation({
    mutationFn: postAllWishlist,

    onSuccess: (response) => {
      toast.success(response.message ?? "Product added to wishlist");
    },

    onError: (error: any) => {
      toast.error(error.message ?? "Something went wrong");
    },
  });

  return (
    <button
      disabled={isPending}
      onClick={(e) => {
        e.stopPropagation();
        mutate(productId);
      }}
      className={className}
    >
      {detail ? (
        <>
          <IoHeartOutline className="text-xl" />
          {isPending ? "Adding..." : "Add to Wishlist"}
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
