import Link from "next/link";
import { FaLeaf } from "react-icons/fa";
import { FiSearch, FiHeart, FiShoppingCart } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className="sticky top-0 left-0 z-50 bg-green-950 flex justify-start items-center w-full h-20 gap-30 px-10 border-b border-green-900">
      <div className="flex gap-2">
        <h1 className="font-(--font-fraunces) text-4xl tracking-wide text-white">
          Botaniva
        </h1>
        <FaLeaf className="text-green-800 text-2xl rotate-[-20deg] mt-2" />
      </div>

      <nav className="flex items-center justify-start gap-6 mt-5">
        <nav>
          <ul className="flex flex-row items-center gap-6">
            <li>
              <Link
                href="/products"
                className="font-sans text-sm font-normal text-gray-300 transition hover:text-white"
              >
                Products
              </Link>
            </li>

            <li>
              <Link
                href="/brand"
                className="font-sans text-sm font-normal text-gray-300 transition hover:text-white"
              >
                Brand
              </Link>
            </li>

            <li>
              <Link
                href="/category"
                className="font-sans text-sm font-normal text-gray-300 transition hover:text-white"
              >
                Categories
              </Link>
            </li>

            <li>
              <Link
                href="/about-us"
                className="font-sans text-sm font-normal text-gray-300 transition hover:text-white"
              >
                About Us
              </Link>
            </li>

            <li>
              <Link
                href="/contact-us"
                className="font-sans text-sm font-normal text-gray-300 transition hover:text-white"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      </nav>
      <div className="flex items-center gap-8 mt-5">
        <button>
          <FiSearch className="text-gray-300 text-xl" />
        </button>
        <button>
          <FiHeart className="text-gray-300 text-xl" />
        </button>
          <Link href="/carts" className="bg-green-800 rounded-2xl px-4 py-2 w-22 h-9 flex justify-center items-center gap-2 mb-2">
            <FiShoppingCart className="text-white text-s" />
            <p className="text-white">Cart</p>
          </Link>
      </div>
    </div>
  );
};

export default Navbar;
