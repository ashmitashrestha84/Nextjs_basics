"use client";
import { useQuery } from "@tanstack/react-query";
import CategoryCard from "./card";
import { getAllCategories } from "@/api/category.api";
import { ICategories } from "@/types/categories.types";

const CategoryList = () => {
  const { isLoading, data, isError} = useQuery({
    queryFn: getAllCategories,
    queryKey: ["get-all-category"],
  });
  console.log(isLoading, data);

  return (
    <>
    {isLoading && <p>Loading categories...</p>}
    {isError && <p>Failed to load categories</p>}
    
    <div className="grid grid-cols-3 gap-2 mt-5">
      {data?.data?.map((category: ICategories) => (
        <CategoryCard key={category._id} category={category} />
      ))}
    </div>
    </>
  );
};

export default CategoryList;
