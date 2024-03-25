"use client";

import { Cart } from "@prisma/client";
import { ShoppingCart, Star, Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import NavigationBar from "~/components/navigation-bar";
import { TruncateWord } from "~/utils/truncate-words";

export default function CheckoutPage() {
  const host =
    "https://bug-free-space-winner-x7jp5vv7rxw2pj5p-3000.app.github.dev/api";

  const params = useParams();
  const productId = +params.productId;
  const quantity = +params.quantity;
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
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
      const cartResponse = await fetch(`${host}/cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const cartData = await cartResponse.json();
      setCart(cartData);
    } catch (error) {
      console.error("Error fetching current user:", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchCart();
    fetchProducts();
  }, []);

  const checkoutItems = async () => {
    try {
      const response = await fetch(`${host}/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Your request body data here
          cart: {
            create: [
              { productId: 1, quantity: 1 },
              { productId: 2, quantity: 2 },
            ],
          },
        }),
      });
      const responseData = await response.json();
      console.log("Checked-out items:", responseData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between gap-8 bg-primary px-4 py-2 text-white_accent">
        <Link href="/" className="font-merriweather text-xl font-medium">
          SHARPIE
        </Link>
      </div>
      {isLoading ? (
        <div
          role="status"
          className="col-span-full flex h-[50vh] items-center justify-center"
        >
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
        <main className="mx-auto my-0 max-w-screen-lg p-8 text-white_accent">
          <div className="relative flex h-[60vh] flex-col gap-4 overflow-auto rounded-sm border border-black bg-white_accent p-4">
            <div className="text-xl font-bold text-black_accent">Checkout</div>
            {cart?.map((cart, arrIdx) => (
              <div key={cart.id} className="flex items-center gap-4">
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
                    {products[cart.productId]?.title}
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="">$ {products[cart.productId]?.price}</div>
                    <div className="text-xs">x{cart.quantity}</div>
                  </div>
                </div>
              </div>
            ))}
            {cart?.length ? (
              <div className="absolute bottom-0 left-0 flex w-full items-center justify-end gap-4 p-4">
                <div className="text-end  text-black_accent">
                  <div className="font-bold">Total Payment: </div>
                  <div>
                    ${" "}
                    {cart.reduce(
                      (acc, cart) =>
                        acc + cart.quantity * products[cart.productId]?.price,
                      0,
                    )}{" "}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => checkoutItems()}
                  className="rounded-sm bg-primary p-2 font-bold"
                >
                  CHECK OUT
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </main>
      )}
    </>
  );
}
