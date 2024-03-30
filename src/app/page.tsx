"use client";

import { Cart } from "@prisma/client";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import NavigationBar from "~/components/navigation-bar";
import { getCategories } from "~/utils/get-categories";
import { TruncateWord } from "~/utils/truncate-words";

export default function HomePage() {
  const host =
    "https://bug-free-space-winner-x7jp5vv7rxw2pj5p-3000.app.github.dev/api/cart";

  const [products, setProducts] = useState<(Product & { rating: Rating })[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [cart, setCart] = useState<Cart[]>([]);

  const fetchProducts = async () => {
    try {
      const productResponse = await fetch("https://fakestoreapi.com/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const productData = await productResponse.json();
      setProducts(productData);
    } catch (error) {
      console.error("Error fetching current user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCart = async () => {
    try {
      const cartResponse = await fetch(`${host}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const cartData = await cartResponse.json();
      setCart(cartData);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  const deleteCart = async (id: Number) => {
    try {
      console.log(id);
      const productResponse = await fetch(`${host}?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!productResponse.ok) {
        throw new Error("Failed to delete cart item.");
      }

      const productData = await productResponse.json();
      console.log("Deleted product:", productData);
    } catch (error) {
      console.error("Error updating cart itemClient:", error);
    }
  };

  useEffect(() => {
    // Fetch notifications when the component mounts and when userId changes
    fetchProducts();
    fetchCart();
  }, []);

  let filteredCategories = products;
  if (category !== "") {
    filteredCategories = products.filter((prod) => prod.category === category);
  }

  return (
    <>
      <NavigationBar products={products} cart={cart} deleteCart={deleteCart} />

      <main className="mx-auto my-0 w-full max-w-screen-lg p-8">
        <div className="mb-8 flex h-40 w-full flex-col items-center justify-center gap-8 rounded-sm bg-secondary p-4 text-white_accent">
          <div className="font-merriweather text-4xl uppercase tracking-tighter">
            Welcome to Sharpie
          </div>
          <div className="text-xl ">Shop all you can!</div>
        </div>
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-8 rounded-sm bg-secondary p-4">
            <div className="flex items-center gap-4">
              <label className="font-semibold text-white_accent">
                Categories
              </label>
              <select
                name=""
                id=""
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-sm px-4 py-2 capitalize"
              >
                <option value="">All</option>
                {getCategories(products).map((category, categoryIdx) => (
                  <option
                    key={categoryIdx}
                    value={category}
                    className="capitalize"
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-4">
              <label className="font-semibold text-white_accent">Price</label>
              <select name="" id="" className="rounded-sm px-4 py-2">
                <option value="">All</option>
                <option value="">Lowest to Highest</option>
                <option value="">Highest to Lowest</option>
              </select>
            </div>

            <div className="flex items-center gap-4">
              <label className="font-semibold text-white_accent">Ratings</label>
              <select name="" id="" className="rounded-sm px-4 py-2">
                <option value="">All</option>
                <option value="">Lowest to Highest</option>
                <option value="">Highest to Lowest</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {isLoading ? (
              <div role="status" className="col-span-full flex justify-center">
                <svg
                  aria-hidden="true"
                  className="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              filteredCategories?.map((product, productIdx) => (
                <Link
                  href={`/${product.id}`}
                  key={productIdx}
                  className="col-span-1 flex flex-col items-center rounded-sm bg-secondary p-2"
                >
                  <div className="flex h-40 w-40 items-center justify-center bg-white">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={90}
                      height={90}
                    />
                  </div>
                  <div className="mt-4 self-start text-white_accent">
                    {TruncateWord(product.title as string)}
                  </div>
                  <div className="mt-8 flex w-full justify-between self-start">
                    <div className="font-bold text-primary">
                      $ {product.price}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-yellow-400">
                        <Star size={16} />
                      </div>
                      <div className="text-sm text-white_accent">
                        {product.rating?.rate ?? 0} -{" "}
                        {product.rating?.count ?? 0}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>
      </main>
    </>
  );
}
