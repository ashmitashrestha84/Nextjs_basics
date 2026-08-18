"use client";

import { useContext } from "react";
import Image from "next/image";
import { CartContext } from "@/context/cart.context.api";

const CartPage = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  if (!cart || cart.items?.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-8 text-3xl font-bold text-green-950">
            Shopping Cart
          </h1>

          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <div className="mb-4 text-5xl">🛒</div>

            <h2 className="mb-2 text-xl font-semibold text-green-950">
              Your cart is empty
            </h2>

            <p className="text-gray-500">
              Add some botanical products to your cart.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold text-green-950">
          Shopping Cart
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {cart.items.map((item: any) => {
              const product = item.product_id;

              return (
                <div
                  key={product._id}
                  className="flex gap-5 rounded-2xl bg-white p-5 shadow-sm"
                >
                  <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                    <Image
                      src={product.product_image.path}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-green-950">
                        {product.name}
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        Rs. {product.price}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">Quantity:</span>

                        <span className="font-medium">{item.quantity}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeFromCart({
                            productId: product._id,
                          })
                        }
                        className="text-sm font-medium text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold text-green-950">
              Order Summary
            </h2>

            <div className="flex justify-between border-b pb-4">
              <span className="text-gray-500">Items</span>

              <span className="font-medium">{cart.items.length}</span>
            </div>

            <div className="mt-4 flex justify-between text-lg font-semibold text-green-950">
              <span>Total</span>

              <span>
                Rs.{" "}
                {cart.items.reduce(
                  (total: number, item: any) =>
                    total + item.product_id.price * item.quantity,
                  0,
                )}
              </span>
            </div>

            <button
              type="button"
              className="mt-6 w-full rounded-xl bg-green-900 py-3 font-medium text-white transition hover:bg-green-800"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
