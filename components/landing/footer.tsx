import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-green-950 text-gray-300">
      <div className="px-10 py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-900">
                🌿
              </div>

              <h2 className="font-serif text-3xl font-bold text-white">
                Botaniva
              </h2>
            </div>

            <p className="max-w-70 text-[15px] pt-8">
              Curating the world's finest natural and botanical products for
              mindful living.
            </p>

            <div className="mt-9 flex gap-4">
              <Link
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-green-900 transition hover:bg-green-800"
              >
                𝕏
              </Link>

              <Link
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-green-900 transition hover:bg-green-800"
              >
                in
              </Link>

              <Link
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-green-900 transition hover:bg-green-800"
              >
                ig
              </Link>
            </div>
          </div>


          <div>
            <h3 className="mb-5 text-lg font-semibold tracking-widest text-gray-400">
              SHOP
            </h3>

            <ul className="space-y-4 text-[15px]">
              <li>
                <Link href="#" className="transition hover:text-white">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="#" className="transition hover:text-white">
                  Skincare
                </Link>
              </li>
              <li>
                <Link href="#" className="transition hover:text-white">
                  Haircare
                </Link>
              </li>
              <li>
                <Link href="#" className="transition hover:text-white">
                  Body & Wellness
                </Link>
              </li>
              <li>
                <Link href="#" className="transition hover:text-white">
                  Fragrance
                </Link>
              </li>
            </ul>
          </div>


          <div>
            <h3 className="mb-5 text-lg font-semibold tracking-widest text-gray-400">
              COMPANY
            </h3>

            <ul className="space-y-4 text-[15px]">
              <li>
                <Link href="#" className="transition hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="transition hover:text-white">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link href="#" className="transition hover:text-white">
                  Press
                </Link>
              </li>
              <li>
                <Link href="#" className="transition hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="transition hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-5 text-lg font-semibold tracking-widest text-gray-400">
              SUPPORT
            </h3>

            <ul className="space-y-4 text-[15px]">
              <li>
                <Link href="#" className="transition hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="transition hover:text-white">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="transition hover:text-white">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="#" className="transition hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="transition hover:text-white">
                  Gift Cards
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      
      <div className="border-t border-[#293b31] px-10 py-7">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <p className="text-[16px]">© 2026 Botaniva. All rights reserved.</p>

          <div className="flex gap-8 text-[16px]">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
