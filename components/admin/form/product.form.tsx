"use client";
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
import ProductImageCarousel from "./productimagecarosel";

const ProductForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
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
  const images = watch("images");
  console.log("other images:", images);

  const carouselImages: string[] = [
    ...(images
      ? Array.from(images).map((image) => URL.createObjectURL(image))
      : []),
  ];

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
  const formData = new FormData();
  const onSubmit = async (data: TProduct) => {
    formData.append("name", data.name);
    formData.append("price", String(data.price));
    formData.append("description", data.description);
    formData.append("product_image", data.product_image[0]);
    formData.append("category", data.category);
    formData.append("brand", data.brand);
    if (data.images?.length) {
      for (const image of data.images) {
        formData.append("images", image);
      }
    }
    formData.append("is_featured", String(data.is_featured));
    formData.append("new_arrival", String(data.new_arrival));
    mutate(formData);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-3"
    >
      <ProductImageCarousel images={carouselImages} />
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
        multiple
        register={register}
        error={errors.images?.message}
      />
      <Input
        label="New Arrivals"
        type="text"
        name="new_arrival"
        id="new_arrival"
        register={register}
        error={errors.new_arrival?.message}
      />
      <Input
        label="is Featured"
        type="text"
        name="is_featured"
        id="is_featured"
        register={register}
        error={errors.is_featured?.message}
      />

      <Button label="Submit" type="submit" />
    </form>
  );
};

export default ProductForm;
