import { IProducts } from "@/types/products.types";
import Image from "next/image";

interface IProps {
  product: IProducts;
}

const ProductCard = ({
  product: {
    name,
    product_image,
    price,
    description,
    // is_featured,
    // new_arrival,
  },
}: IProps) => {
  return (
    <div className="flex border border-primary max-w-100 h-fit gap-2 p-1 rounded-md items-center hover:translate-y-1 hover:bg-primary transition-all">
      <div className=" h-12 w-12 rounded-sm overflow-clip shrink-0">
        <Image
          src={"/images.png"}
          alt={name + "-" + "image"}
          className="h-full w-full"
          height={800}
          width={800}
        />
      </div>
      <div>
        <p className="text-md font-semibold text-gray-700">{name}</p>
        <p className="text-md font-normal text-gray-800">{price}</p>
        <p className="line-clamp-2 text-sm leading-4 text-wrap">
          {description ?? "-"}
        </p>
        {/* <p className="text-md font-normal text-gray-200">{is_featured}</p>
        <p className="text-md font-normal text-gray-200">{new_arrival}</p> */}
      </div>
    </div>
  );
};

export default ProductCard;
