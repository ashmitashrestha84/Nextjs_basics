"use client";

import Link from "next/link";
import { FiHeart, FiShoppingCart, FiLogIn, FiUserPlus } from "react-icons/fi";
import Authsection from "../common/authsection";
import { useAuth } from "@/hooks/auth.hook";

const UserActions = () => {
  const { user } = useAuth();

  return (
    <div className="flex items-center gap-6">
      {user ? (
        <>
          <Link href="/wishlist">
            <FiHeart className="text-xl text-gray-300 transition hover:text-white" />
          </Link>

          <Link href="/cart">
            <FiShoppingCart className="text-xl text-gray-300 transition hover:text-white" />
          </Link>

          <Authsection />
        </>
      ) : (
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="flex items-center gap-2 rounded-2xl bg-green-800 px-4 py-2 text-sm text-white transition hover:bg-green-700"
          >
            <FiLogIn />
            <span>Sign In</span>
          </Link>

          <Link
            href="/sign-up"
            className="flex items-center gap-2 rounded-2xl bg-green-800 px-4 py-2 text-sm text-white transition hover:bg-green-700"
          >
            <FiUserPlus />
            <span>Sign Up</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserActions;
