"use client";
import { useQuery } from "@tanstack/react-query";
import CategoryCard from "./card";
import { getAllCategories } from "@/api/category.api";
import { ICategories } from "@/types/categories.types";

const CategoryList = () => {
  const { isLoading, data } = useQuery({
    queryFn: getAllCategories,
    queryKey: ["get-all-category"],
  });
  console.log(isLoading, data);
  return (
    <div className="grid grid-cols-3 gap-2 mt-5">
      {data?.data?.map((category: ICategories) => (
        <CategoryCard key={category._id} category={category} />
      ))}
    </div>
  );
};

export default CategoryList;
