"use client";

import { Cart } from "@prisma/client";
import { Minus, Plus, ShoppingBag, ShoppingCart, Star, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NavigationBar from "~/components/navigation-bar";
import { TruncateWord } from "~/utils/truncate-words";
import { cartSchema } from "~/zodSchemas/cartSchemas";

export default function ProductPage() {
  const host =
    "https://bug-free-space-winner-x7jp5vv7rxw2pj5p-3000.app.github.dev/api/cart";
  const params = useParams();
  const productId = +params.productId;
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Cart[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState<string | number>("1");
  const [checkoutModal, setCheckoutModal] = useState(false);

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

  const selectedProduct = products.filter((prod) => prod.id === productId)[0];
  let filteredCategories = products;

  if (category !== "") {
    filteredCategories = products.filter((prod) => prod.category === category);
  }

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
      fetchCart();
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  const addToCart = async (productId: Number, quantity: Number) => {
    try {
      const cartData = cartSchema.parse({
        productId: productId,
        quantity: +quantity,
      });

      const productResponse = await fetch(`${host}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          productId: cartData.productId,
          quantity: cartData.quantity,
        }),
      });

      fetchCart();
      const productData = await productResponse.json();
      console.log("New product:", productData);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  const updateCart = async () => {
    if (!productId ?? !quantity) {
      console.error("productId and quantity must be defined.");
      return;
    }
    try {
      const cartData = cartSchema.parse({
        productId: productId,
        quantity: +quantity,
      });

      const productResponse = await fetch(`${host}?id=${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: cartData.productId,
          quantity: cartData.quantity, // Convert quantity to a number
        }),
      });

      if (!productResponse.ok) {
        throw new Error("Failed to update cart item.");
      }

      const productData = await productResponse.json();
      console.log("Updated product:", productData);
    } catch (error) {
      console.error("Error updating cart itemClient:", error);
    }
  };

  const deleteCart = async (id: Number) => {
    try {
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
    fetchProducts();
    fetchCart();
  });

  return (
    <>
      <NavigationBar products={products} cart={cart} deleteCart={deleteCart} />

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
          <div className="mb-8 flex w-full items-center justify-center gap-8 rounded-sm bg-secondary p-4 ">
            <div className="flex h-72 w-72 items-center justify-center bg-white">
              <Image
                src={selectedProduct?.image}
                alt={selectedProduct?.title}
                width={140}
                height={140}
              />
            </div>
            <div className="flex max-w-[50%] flex-col">
              <div className="text-xl font-bold text-primary">
                $ {selectedProduct?.price}
              </div>
              <div className="font-merriweather text-2xl">
                {selectedProduct?.title}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-sm">
                  {selectedProduct?.rating?.rate ?? 0}
                  <span className="text-yellow-400">
                    <Star size={16} />
                  </span>
                </div>

                <div className="text-sm">
                  Ratings: {selectedProduct?.rating?.count ?? 0}
                </div>
              </div>

              <div className="mt-8">
                <h1 className="font-bold">Description:</h1>
                <div className="text-sm">{selectedProduct?.description}</div>
              </div>

              <div className="relative bottom-0 my-4 w-full">
                <div className="h-[2px] w-full bg-white"></div>
                <div className="mt-2 flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setCheckoutModal(true)}
                    className="flex items-center rounded-sm p-2 text-sm hover:bg-primary"
                  >
                    <ShoppingCart />
                  </button>
                  <button
                    type="button"
                    onClick={() => setCheckoutModal(true)}
                    className="flex items-center rounded-sm bg-primary p-2 font-merriweather text-sm font-bold"
                  >
                    BUY NOW
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4 mt-16 text-center text-sm">
            You may also like
          </div>
          <div className="grid grid-cols-3 gap-4">
            {products
              ?.filter((product) => product.id !== productId)
              .map((product, productIdx) => (
                <Link
                  href={`/${product.id}`}
                  key={productIdx}
                  className="col-span-1 flex flex-col items-center rounded-sm bg-secondary p-2"
                >
                  <div className="flex h-40 w-40 items-center justify-center bg-white">
                    <Image
                      src={product?.image}
                      alt={product?.title}
                      width={90}
                      height={90}
                    />
                  </div>
                  <div className="mt-4 self-start text-white_accent">
                    {TruncateWord(product?.title as string)}
                  </div>
                  <div className="mt-8 flex w-full justify-between self-start">
                    <div className="font-bold text-primary">
                      $ {product?.price}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-yellow-400">
                        <Star size={16} />
                      </div>
                      <div className="text-sm text-white_accent">
                        {product?.rating?.rate ?? 0} -{" "}
                        {product?.rating?.count ?? 0}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </main>
      )}

      {/* Modal */}
      {checkoutModal && (
        <div className="fixed top-0 z-10 flex h-full w-full items-center justify-center bg-black/40">
          <div className="relative z-20 rounded-sm bg-white px-8 py-4">
            <button
              type="button"
              onClick={() => setCheckoutModal(false)}
              className="absolute right-2 top-2 rounded-sm bg-white text-black_accent"
            >
              <X size="16" />
            </button>
            <div className="text-xl font-bold">How many items?</div>

            <div className="mt-4">
              <div className="lg">Quantity</div>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    const currQty =
                      typeof quantity === "string"
                        ? parseInt(quantity, 10)
                        : (quantity as number);

                    setQuantity(currQty - 1);
                  }}
                  className={`${quantity == 1 ? "cursor-not-allowed opacity-50" : ""} border border-primary p-2`}
                  disabled={(quantity as number) < 2}
                >
                  <Minus size={16} />
                </button>
                <input
                  type="text"
                  name=""
                  id=""
                  onChange={(e) => {
                    setQuantity(e.target.value.replace(/\D/g, ""));
                  }}
                  className="border border-primary p-[4px]"
                  value={quantity}
                />
                <button
                  type="button"
                  onClick={() =>
                    setQuantity(
                      (prevQuantity) =>
                        (typeof prevQuantity === "string"
                          ? parseInt(prevQuantity, 10)
                          : (prevQuantity as number)) + 1,
                    )
                  }
                  className="border border-primary p-2"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCheckoutModal(false)}
                className="rounded-sm border border-primary p-2 text-sm font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const foundProduct = cart.find(
                    (item) => item?.productId === Number(productId),
                  );

                  if (foundProduct) {
                    updateCart();
                  } else {
                    addToCart(Number(productId), quantity as number);
                  }
                  setCheckoutModal(false);
                }}
                className="rounded-sm bg-primary p-2 font-merriweather text-sm font-bold text-white_accent"
              >
                CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
