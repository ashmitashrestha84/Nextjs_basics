"use client";

import { IProducts } from "@/types/products.types";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./card";
import { getFeaturedAllProducts } from "@/api/allproduct.api";

const ProductList = () => {
  const { isLoading, data, isSuccess, isError, error } = useQuery({
    queryFn: getFeaturedAllProducts,
    queryKey: ["get-all-featured-product"],
  });

  console.log("data featured", data);

  return (
    <>
      {isLoading && <p>Loading Products....</p>}
      {isError && <p>Failed to load products</p>}
      <div className="grid grid-cols-4 gap-2 mt-5">
        {data?.data?.map((product: IProducts) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductList;
