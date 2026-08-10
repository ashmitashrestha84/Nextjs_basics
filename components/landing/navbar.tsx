import Link from "next/link";
import { FaLeaf } from "react-icons/fa";
import { FiSearch, FiHeart, FiShoppingCart } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className="flex justify-start items-center w-full h-20 gap-30 px-10 border-b border-green-900">
      <div className="flex gap-2">
        <h1 className="font-(--font-fraunces) text-4xl tracking-wide text-black">
          Botaniva
        </h1>
        <FaLeaf className="text-green-800 text-2xl rotate-[-20deg] mt-2" />
      </div>

      <nav className="flex items-center justify-start gap-6 mt-5">
        <Link
          href="/newarrivals"
          className="text-gray-500 font-sans font-normal text-s cursor-pointer hover:text-green-600"
        >
          New Arrivals
        </Link>
        <Link
          href="/products"
          className="text-gray-500 font-sans font-normal text-s cursor-pointer hover:text-green-600"
        >
          Products
        </Link>
        <Link
          href="/brand"
          className="text-gray-500 font-sans font-normal text-s cursor-pointer hover:text-green-600"
        >
          Brand
        </Link>
        <Link
          href="/categories"
          className="text-gray-500 font-sans font-normal text-s cursor-pointer hover:text-green-600"
        >
          Categories
        </Link>
        <Link
          href="/about-us"
          className="text-gray-500 font-sans font-normal text-s cursor-pointer hover:text-green-600"
        >
          About-Us
        </Link>
        <Link
          href="/contact-us"
          className="text-gray-500 font-sans font-normal text-s cursor-pointer hover:text-green-600"
        >
          Contact-Us
        </Link>
      </nav>
      <div className="flex items-center gap-8 mt-5">
        <button>
          <FiSearch className="text-gray-500 text-xl" />
        </button>
         <button>
          <FiHeart className="text-gray-500 text-xl" />
        </button>
        <button className="bg-green-800 rounded-2xl px-4 py-2 w-22 h-9 flex justify-center items-center gap-2 mb-2">
            <FiShoppingCart className="text-white text-s" />
            <p className="text-white">Cart</p>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
