// "use client";
import Image from "next/image";

import {
  IoCartOutline,
  IoHeartOutline,
  IoLeafOutline,
  IoShieldCheckmarkOutline,
  IoStar,
} from "react-icons/io5";
import Quantity from "./quantity";
import AddToWishlist from "./addtowishlist";
import AddToCart from "./addtoCart";

const ProductDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  const responseData = await response.json();
  const product = responseData.data;

  return (
    <article className="grid grid-cols-2">
      <div className="flex flex-col max-w-120 h-fit gap-2 ml-20 rounded-xl justify-center items-center">
        <div className="h-103 w-120 rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
          <Image
            src={product.product_image.path}
            alt={product.name + "-" + "image"}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            height={600}
            width={600}
          />
        </div>

        <div className="w-full flex items-center justify-between px-1">
          <h1 className="text-md font-semibold text-green-950">
            Discover More Images
          </h1>

          <span className="text-xs text-gray-500">
            {product.images?.length || 0} Photos
          </span>
        </div>

        <div className="flex flex-row justify-center items-center gap-4 w-full overflow-x-auto pb-2">
          {product.images?.map((image: { path: string }, index: number) => (
            <div
              key={index}
              className="h-35 w-35 shrink-0 rounded-xl overflow-hidden border-2 border-gray-200 bg-white p-1 shadow-sm cursor-pointer transition-all duration-300 hover:border-green-800 "
            >
              <Image
                src={image.path}
                alt={`${product.name}-image-${index + 1}`}
                className="h-full w-full rounded-lg object-cover transition-transform duration-300"
                height={600}
                width={600}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <div className="flex gap-5 mb-5">
          {product.category && (
            <p className="px-1.5 py-0.5 rounded-sm text-xs font-semibold text-[14px]  text-black border bg-green-100">
              {product.category.name}
            </p>
          )}
          {product.brand && (
            <p className="px-1.5 py-0.5 rounded-sm text-xs font-semibold text-[14px] text-black border bg-green-100">
              {product.brand.name}
            </p>
          )}
        </div>
        <div className="items-center justify-center">
          <p className="text-[24px] font-semibold text-green-950">
            {product.name}
          </p>
          <div className="mt-5 flex items-center gap-3">
            <div className="flex text-yellow-500">
              <IoStar />
              <IoStar />
              <IoStar />
              <IoStar />
              <IoStar />
            </div>
          </div>
          <div className="flex justify-between items-start w-full pr-10">
            <p className="text-3xl font-bold text-green-950">{product.price}</p>

            <div className="flex items-center gap-2 shrink-0">
              <span className="h-2.5 w-2.5 rounded-full bg-green-600"></span>
              <span className="text-sm text-green-700">In Stock</span>
            </div>
          </div>

          <div className="w-1/2">
            <p className="line-clamp-4 text-sm leading-5">
              {product.description ?? "-"}
            </p>
          </div>
        </div>
        <div className="my-7 grid grid-cols-3 border-y border-gray-200 py-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <IoLeafOutline className="text-2xl text-green-800" />
            <span className="text-sm font-medium">100% Natural</span>
          </div>

          <div className="flex flex-col items-center gap-2 border-x border-gray-200 text-center">
            <IoShieldCheckmarkOutline className="text-2xl text-green-800" />
            <span className="text-sm font-medium">Premium Quality</span>
          </div>

          <div className="flex flex-col items-center gap-2 text-center">
            <IoHeartOutline className="text-2xl text-green-800" />
            <span className="text-sm font-medium">Trusted Product</span>
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold text-gray-700">Quantity</p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <AddToCart
            productId={id}
            detail="Add to Cart"
            className="flex h-14 items-center justify-center gap-2 rounded-xl bg-green-950 font-semibold text-white transition hover:bg-green-900"
          />

          <div className="pt-16 flex h-14 w-65">
            <AddToWishlist
              productId={id}
              className="flex h-14 min-w-full items-center justify-center gap-2 rounded-xl border-2 border-green-900 bg-white font-semibold text-green-950 hover:bg-red-100"
              detail={"Add To Wishlist"}
            />
          </div>
        </div>
      </div>
    </article>
  );
};
export default ProductDetailPage;
