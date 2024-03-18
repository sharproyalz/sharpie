import { Product } from "@prisma/client";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NavigationBar({ products }: { products: Product[] }) {
  const [inputActive, setInputActive] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const filteredProducts = products.filter((country) => {
    return country.title.toLowerCase().match(searchInput.toLowerCase());
  });

  return (
    <>
      <div className="flex items-center justify-between gap-8 bg-primary px-4 py-2 text-white_accent">
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
          <button type="button">
            <ShoppingCart />
          </button>
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
