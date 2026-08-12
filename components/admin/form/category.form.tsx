"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Input from "@/components/common/input";
import Button from "@/components/button";
import { TCategory } from "@/types/Acategory.types";
import { categorySchema } from "@/schemas/category.schemas";
import { category } from "@/api/client.api";


const CategoryForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCategory>({
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: yupResolver(categorySchema),
  });
  const { data, isPending, error, mutate } = useMutation({
    mutationFn: category,
    mutationKey: ["signup"],
    onSuccess: (data) => {
      console.log("on success");
      console.log(data);
      toast.success(data?.message ?? "Brand register");
      router.replace("/login");
    },
    onError: (error: Error) => {
      console.log("on error");
      console.log(error);
      toast.error(error?.message ?? "Brand Register Failed");
    },
  });

  const onSubmit = async (data: TCategory) => {
    const logoFile = Array.from(data.logo);
    mutate(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-3"
    >
      <Input
        label="Category Name"
        placeholder="Enter category name"
        type="text"
        name="name"
        id="name"
        register={register}
        error={errors.name?.message}
      />

      <Input
        label="Description"
        placeholder="Enter category description"
        type="text"
        name="description"
        id="description"
        register={register}
        error={errors.description?.message}
      />

      <Input
        label="Logo"
        placeholder=""
        type="file"
        name="logo"
        id="logo"
        register={register}
        error={errors.logo?.message}
      />

      <Button label="Submit" type="submit" />
    </form>
  );
};

export default CategoryForm;
