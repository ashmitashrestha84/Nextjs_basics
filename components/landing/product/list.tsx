"use client"
import { getAllProducts } from "@/api/product.api"
import { IProducts } from "@/types/products.types"
import {  useQuery } from "@tanstack/react-query"
import ProductCard from "./card"


const ProductList = () => {
    const {isLoading, data}=useQuery({
        queryFn:getAllProducts,
        queryKey:["get-all-product"],
    })
    console.log(data,isLoading)
  return (
    <div className="grid grid-cols-3 gap-2 mt-5">
        {data?.data?.map((product:IProducts)=>(
            <ProductCard key={product._id} product={product} />
        ))}
    </div>
  )
}

export default ProductList