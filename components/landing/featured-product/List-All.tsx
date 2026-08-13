"use client";
import { getAllProducts } from "@/api/featuredproduct.api";
import { IProducts } from "@/types/products.types";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./card";

const AllList = () => {
  const { isLoading, data, isError } = useQuery({
    queryFn: getAllProducts,
    queryKey: ["get-all-product"],
  });
  console.log("product page", data);
  console.log("PRODUCT COUNT:", data?.data?.length);

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

export default AllList;
