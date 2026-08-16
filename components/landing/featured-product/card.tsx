import { postAllWishlist } from "@/api/wishlist.api";
import { IProducts } from "@/types/products.types";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { FiHeart } from "react-icons/fi";
import { IoHeartOutline } from "react-icons/io5";
import AddToWishlist from "../../productsaction/addtowishlist";

interface IProps {
  product: IProducts;
}

const ProductCard = ({
  product: { name, product_image, price, description, category, brand, _id },
}: IProps) => {
  return (
    <article className="flex flex-col border border-primary max-w-100 h-fit gap-2 p-1 rounded-md items-center hover:translate-y-1 hover:bg-green-100 transition-all">
      <AddToWishlist
        productId={_id}
        isAdded={true}
        className="absolute right-3 top-3 z-10 rounded-full p-2 shadow-md bg-red-200"
      />
      <div className=" h-70 w-full rounded-sm overflow-clip shrink-0">
        <Image
          src={product_image.path}
          alt={name + "-" + "image"}
          className="h-full w-full"
          height={800}
          width={800}
        />
      </div>
      <div className="items-center justify-center">
        <p className="text-md font-semibold text-gray-700">{name}</p>
        <p className="text-md font-normal text-green-950">{price}</p>
        <p className="line-clamp-2 text-sm leading-4 text-wrap">
          {description ?? "-"}
        </p>
      </div>
      <div className="flex gap-1">
        {category && (
          <p className="px-1.5 py-0.5 rounded-sm text-xs font-semibold text-black border border-green-800 bg-green-100">
            {category.name}
          </p>
        )}
        {brand && (
          <p className="px-1.5 py-0.5 rounded-sm text-xs font-semibold text-black border border-green-800 bg-green-100">
            {brand.name}
          </p>
        )}
      </div>

      <div className="w-full">
        <button className="h-10 w-full max-w-900 bg-green-950 text-white rounded-2xl">
          <Link href={`/products/${_id}`}>
            {/* <Link href={`/products/${_id}?q=${name}&d=${description}`}></Link> */}
            <span>View Detail</span>
          </Link>
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
