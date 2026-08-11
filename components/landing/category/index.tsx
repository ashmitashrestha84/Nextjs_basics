import Link from "next/link";
import { IoChevronDown } from "react-icons/io5";
import CategoryCard from "./card";

const categories = [
  {
    _id: "1",
    name: "Clothes",
    image: {
      path: "./images.png",
      public_id: "images",
    },
    description: "Clothes are necessarily used in our daily life.",
  },
   {
    _id: "2",
    name: "Clothes",
    image: {
      path: "./images.png",
      public_id: "images",
    },
    description: "Clothes are necessarily used in our daily life.",
  }
];

const CategoriesList = () => {
  return (
    <section className="w-full px-10 py-6 border-b">
      <header className="flex justify-between items-start">
        {/* Left */}
        <div>
          <h3 className="text-lg font-semibold">Featured Categories</h3>

          <p className="text-sm text-gray-500 mt-1">
            Discover our featured categories
          </p>
        </div>

        {/* Explore More */}
        <Link
          href="#"
          className="flex items-center gap-2 mt-3 text-gray-600 font-normal text-[14px] hover:text-primary-hover transition-all duration-300"
        >
          <span className="text-[16px]">Explore More</span>
          <IoChevronDown size={16} />
        </Link>
      </header>

      {/* Categories */}
      <div className="grid grid-cols-5 gap-2 mt-5">
        {categories.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
    </section>
  );
};

export default CategoriesList;
