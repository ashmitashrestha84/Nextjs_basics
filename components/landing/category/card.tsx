import { ICategories } from "@/types/categories.types";
import Image from "next/image";

interface IProps {
  category: ICategories;
}

const CategoryCard = ({ category: { name, logo, description } }: IProps) => {
  return (
    <div className="flex border border-primary max-w-100 h-fit gap-2 p-1 rounded-md items-center hover:translate-y-1 hover:bg-green-100 transition-all">
      <div className=" h-12 w-12 rounded-sm overflow-clip shrink-0">
        <Image
          src={logo.path}
          alt={name + "-" + "image"}
          className="h-full w-full"
          height={800}
          width={800}
        />
      </div>
      <div>
        <p className="text-md font-semibold text-gray-700">{name}</p>
        <p className="line-clamp-2 text-sm leading-4 text-wrap">
          {description ?? "-"}
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
