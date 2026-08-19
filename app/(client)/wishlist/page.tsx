"use client";
import WishlistCard from "@/components/landing/wishlist/card";
import WithAuth from "@/hoc/withAuth.hoc";
import { useWishlist } from "@/hooks/wishlist.hook";
import { User_Only } from "@/types/enum.types";
import { FiHeart } from "react-icons/fi";

const WishlistPage = () => {
  const { wishList, removeFromWishlist } = useWishlist();

  if (!wishList || wishList.products?.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-8 text-3xl font-bold text-green-950">Wishlist</h1>

          <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-12 text-center shadow-sm">
            <FiHeart
              className="mb-4 justify-center items-center text-center"
              size={60}
            />

            <h2 className="mb-2 text-xl font-semibold text-green-950">
              Your Wishlist is empty
            </h2>

            <p className="text-gray-500">Add some products to your wishlist.</p>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold text-green-950">Wishlist</h1>

        <div className="rounded-2xl bg-white p-6 shadow-sm-4 flex">
          {wishList.products?.map((item) => (
            <WishlistCard
              key={item._id}
              product={item}
              onRemove={removeFromWishlist}
            />
          ))}
        </div>
      </div>
    </main>
  );
};
const PrivateWishlist = WithAuth(WishlistPage, User_Only);
export default PrivateWishlist;
