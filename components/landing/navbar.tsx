import Link from "next/link";
import { FaLeaf } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import UserActions from "../useractions/useraction";

const Navbar = () => {
  return (
    <div className="sticky top-0 left-0 z-50 flex h-20 w-full items-center justify-between border-b border-green-900 bg-green-950 px-10">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <h1 className="font-(--font-fraunces) text-4xl tracking-wide text-white">
          Botaniva
        </h1>

        <FaLeaf className="mt-2 rotate-[-20deg] text-2xl text-green-800" />
      </div>

      {/* Navigation */}
      <nav>
        <ul className="flex items-center gap-6">
          <li>
            <Link
              href="/products"
              className="text-sm font-normal text-gray-300 transition hover:text-white"
            >
              Products
            </Link>
          </li>

          <li>
            <Link
              href="/brand"
              className="text-sm font-normal text-gray-300 transition hover:text-white"
            >
              Brand
            </Link>
          </li>

          <li>
            <Link
              href="/category"
              className="text-sm font-normal text-gray-300 transition hover:text-white"
            >
              Categories
            </Link>
          </li>

          <li>
            <Link
              href="/about-us"
              className="text-sm font-normal text-gray-300 transition hover:text-white"
            >
              About Us
            </Link>
          </li>

          <li>
            <Link
              href="/contact-us"
              className="text-sm font-normal text-gray-300 transition hover:text-white"
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>

      <div className="flex items-center gap-8">
        {/* Search */}
        <button>
          <FiSearch className="text-xl text-gray-300 transition hover:text-white" />
        </button>

        <UserActions />
      </div>
    </div>
  );
};

export default Navbar;
