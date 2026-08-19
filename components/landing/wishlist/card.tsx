"use client";

import { IProducts } from "@/types/products.types";
import Image from "next/image";
import Link from "next/link";
import { FiHeart } from "react-icons/fi";

interface IProps {
  product: IProducts;
  onRemove: ({ productId }: { productId: string }) => void;
}
const WishlistCard = ({ product, onRemove }: IProps) => {
  const { name, product_image, price, description, category, brand, _id } =
    product;

  return (
    <article className="relative flex w-full max-w-100 flex-col items-center gap-2 rounded-md border border-primary p-1 transition-all hover:translate-y-1 hover:bg-green-100">
      <button
        type="button"
        onClick={() => onRemove({ productId: _id })}
        className="absolute right-3 top-3 z-10 rounded-full bg-red-200 p-2 shadow-md hover:bg-red-300"
      >
        <FiHeart size={20} className="fill-red-100 text-white" />
      </button>

      <div className="h-70 w-full shrink-0 overflow-hidden rounded-sm">
        <Image
          src={product_image.path}
          alt={`${name}-image`}
          height={800}
          width={800}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="w-full">
        <p className="text-md font-semibold text-gray-700">{name}</p>

        <p className="text-md font-normal text-green-950">{price}</p>

        <p className="line-clamp-2 text-sm leading-4 text-wrap">
          {description ?? "-"}
        </p>
      </div>

      <div className="flex w-full gap-1">
        {category && (
          <p className="rounded-sm border border-green-800 bg-green-100 px-1.5 py-0.5 text-xs font-semibold text-black">
            {category.name}
          </p>
        )}

        {brand && (
          <p className="rounded-sm border border-green-800 bg-green-100 px-1.5 py-0.5 text-xs font-semibold text-black">
            {brand.name}
          </p>
        )}
      </div>
      <div className="w-full">
        <Link
          href={`/products/${_id}`}
          className="flex h-10 w-full items-center justify-center rounded-2xl bg-green-950 text-white"
        >
          View Detail
        </Link>
      </div>
    </article>
  );
};

export default WishlistCard;
