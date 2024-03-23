import { Cart } from "@prisma/client";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { TruncateWord } from "~/utils/truncate-words";

export default function NavigationBar({
  products,
  cart,
  deleteCart,
}: {
  products: Product[];
  cart: Cart[];
  deleteCart: (id: Number) => Promise<void>;
}) {
  const [inputActive, setInputActive] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [showCart, setShowCart] = useState(false);

  const filteredProducts = products.filter((country) => {
    return country.title.toLowerCase().match(searchInput.toLowerCase());
  });

  return (
    <>
      <div className="relative z-10 flex items-center justify-between gap-8 bg-primary px-4 py-2 text-white_accent">
        <Link href="/" className="font-merriweather text-xl font-medium">
          SHARPIE
        </Link>

        <div className="relative w-full">
          <div className="pointer-events-none absolute bottom-0 start-0 top-0 flex items-center ps-3">
            <svg
              className="h-4 w-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="default-search"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 text-sm text-gray-900"
            placeholder="Search Clothers, Bags..."
            onChange={(e) => setSearchInput(e.target.value)}
            onFocus={() => setInputActive(true)}
            onBlur={() => setInputActive(false)}
            required
          />
          <div
            className={`${inputActive ? "" : "hidden"} absolute top-10 max-h-[40vh] w-full overflow-auto bg-white`}
          >
            {filteredProducts?.map((prod, prodIdx) => (
              <div key={prodIdx} className="p-2 text-sm text-black">
                {prod.title}
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-fit items-center gap-4">
          <div className="relative">
            <button type="button" onClick={() => setShowCart(!showCart)}>
              {cart?.length ? (
                <div className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white_accent">
                  {cart?.length}
                </div>
              ) : (
                ""
              )}
              <ShoppingCart />
            </button>

            {showCart && (
              <div className="absolute right-0 flex h-[60vh] w-[400px] flex-col gap-4 overflow-auto rounded-sm border border-black bg-white_accent p-4">
                <div className="text-xl font-bold text-black_accent">
                  My Cart
                </div>
                {cart?.map((cart, arrIdx) => (
                  <div
                    key={cart.id}
                    className="flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center bg-white">
                        <img
                          src={products[cart.productId]?.image}
                          alt={products[cart.productId]?.title}
                          width={20}
                          height={20}
                        />
                      </div>
                      <div className="text-black_accent">
                        <div className="text-sm font-bold ">
                          {TruncateWord(products[cart.productId]?.title)}
                        </div>
                        <div className="text-sm">Quantity: {cart.quantity}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteCart(cart?.productId)}
                      className="rounded-sm p-1 text-black hover:bg-red-600 hover:text-white"
                    >
                      <Trash2 />
                    </button>
                  </div>
                ))}
                {cart?.length ? (
                  <div className="absolute bottom-0 left-0 flex w-full items-center justify-end p-4">
                    <button
                      type="button"
                      className="rounded-sm bg-primary p-2 font-bold"
                    >
                      CHECK OUT
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
          <button
            type="button"
            className="whitespace-nowrap font-merriweather text-xl font-medium"
          >
            Sign in
          </button>
          <button
            type="button"
            className="whitespace-nowrap font-merriweather text-xl font-medium"
          >
            Sign up
          </button>
        </div>
      </div>
    </>
  );
}
