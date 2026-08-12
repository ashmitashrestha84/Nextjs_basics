"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Form, useForm } from "react-hook-form";
import { TBrand } from "@/types/Abrand.types";
import { BrandSchema } from "@/schemas/brand.schemas";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { brand } from "@/api/auth.api";
import Input from "@/components/common/input";
import Button from "@/components/button";

const BrandForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TBrand>({
    defaultValues: {
      brand_name: "",
      description: "",
    },
    resolver: yupResolver(BrandSchema),
  });
  const { data, isPending, error, mutate } = useMutation({
    mutationFn: brand,
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

  const onSubmit = async (data: TBrand) => {
    const logoFile = data.logo[0];
    mutate(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-3"
    >
      <Input
        label="Brand Name"
        placeholder="Enter brand name"
        type="text"
        name="brand_name"
        id="brand_name"
        register={register}
        error={errors.brand_name?.message}
      />

      <Input
        label="Description"
        placeholder="Enter brand description"
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

export default BrandForm;
