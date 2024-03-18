"use client";

import { Product } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Example() {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const productResponse = await fetch(
        "https://bug-free-space-winner-x7jp5vv7rxw2pj5p-3000.app.github.dev/api/products",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },body: null
        },
      );
      const productData = await productResponse.json();
      setProducts(productData);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  useEffect(() => {
    // Fetch notifications when the component mounts and when userId changes
    fetchProducts();
  }, []);

  return <></>;
}
