import Link from "next/link";
import { IoChevronDown } from "react-icons/io5";
import ProductList from "./list";

const ProductsList = () => {
  return (
    <section className="w-full px-10 py-6 border-b bg-[#ced9cb]">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="font-semibold text-lg">
            Featured Products
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Discover our featured products
          </p>
        </div>

        <Link
          href="#"
          className="flex items-center gap-2 mt-3 text-gray-600 font-normal text-[14px] hover:text-primary-hover transition-all duration-300"
        >
          <span className="text-[16px]">Explore More</span>
          <IoChevronDown size={16} />
        </Link>
      </header>

      <ProductList />
    </section>
  );
};

export default ProductsList;