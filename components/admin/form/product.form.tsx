"use client"
import { signup } from "@/api/auth.api";
import { product } from "@/api/client.api";
import Button from "@/components/button";
import Input from "@/components/common/input";
import { productSchema } from "@/schemas/product.schemas";
import { TProduct } from "@/types/Aproduct.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ProductForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TProduct>({
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      category: "",
      brand: "",
      is_featured: false,
      new_arrival: false,
    },
    resolver: yupResolver(productSchema),
  });
  const { data, isPending, error, mutate } = useMutation({
    mutationFn: product,
    mutationKey: [signup],
    onSuccess(data) {
      console.log("on success");
      console.log(data);
      toast.success(data?.message ?? "Product register");
      router.replace("/login");
    },
    onError(error: Error) {
      console.log("on error");
      console.log(error);
      toast.error(error?.message ?? "Brand Register Failed");
    },
  });
  const onSubmit = async (data: TProduct) => {
    const productImage = Array.from(data.product_image);
    const additionalImages = data.images ? Array.from(data.images) : [];
    mutate(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-3"
    >
      <Input
        label="Product Name"
        placeholder="Enter product name"
        type="text"
        name="name"
        id="name"
        register={register}
        error={errors.name?.message}
      />

      <Input
        label="Description"
        placeholder="Enter product description"
        type="text"
        name="description"
        id="description"
        register={register}
        error={errors.description?.message}
      />

      <Input
        label="Main Images"
        placeholder=""
        type="file"
        name="product_image"
        id="product_image"
        register={register}
        error={errors.product_image?.message}
      />
      <Input
        label="Category"
        placeholder="Enter category id"
        type="text"
        name="category"
        id="category"
        register={register}
        error={errors.category?.message}
      />

      <Input
        label="Brand"
        placeholder="Enter brand id"
        type="text"
        name="brand"
        id="brand"
        register={register}
        error={errors.brand?.message}
      />

      <Input
        label="Images"
        placeholder=""
        type="file"
        name="images"
        id="images"
        register={register}
        error={errors.images?.message}
      />
      <Input
        label="New Arrivals"
        type="checkbox"
        name="new_arrival"
        id="new_arrival"
        register={register}
        error={errors.new_arrival?.message}
      />
      <Input
        label="New Arrivals"
        type="checkbox"
        name="new_arrival"
        id="new_arrival"
        register={register}
        error={errors.new_arrival?.message}
      />

      <Button label="Submit" type="submit" />
    </form>
  );
};

export default ProductForm;
