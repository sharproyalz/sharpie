"use client";

import { Product } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Example() {
  const [products, setProducts] = useState<(Product & { rating: Rating })[]>(
    [],
  );
  const [dbProducts, setDbProducts] = useState<
    (Product & { rating: Rating })[]
  >([]);

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
    }
  };

  useEffect(() => {
    // Fetch notifications when the component mounts and when userId changes
    fetchProducts();
  }, []);

  const fetchDbProducts = async () => {
    try {
      const productResponse = await fetch(
        "https://bug-free-space-winner-x7jp5vv7rxw2pj5p-3000.app.github.dev/api/products",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const productData = await productResponse.json();
      setDbProducts(productData);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  useEffect(() => {
    // Fetch notifications when the component mounts and when userId changes
    fetchDbProducts();
  }, []);

  const createProducts = async (product?: Product & { rating: Rating }) => {
    try {
      const productResponse = await fetch(
        "https://bug-free-space-winner-x7jp5vv7rxw2pj5p-3000.app.github.dev/api/products",
        {
          method: "POST", // Change the method to POST
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            title: product?.title,
            price: product?.price,
            description: product?.description,
            category: product?.category,
            image: product?.image,
            rating: JSON.stringify({
              rate: 2,
              count: 3,
            })
          }),
        },
      );

      
      const productData = await productResponse.json();
      console.log("New product:", productData);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  useEffect(() => {
    // Fetch notifications when the component mounts and when userId changes
    createProducts();
  }, []);

  createProducts(products[0]);
  
  console.log(products[0]?.rating)
  return <></>;
}
