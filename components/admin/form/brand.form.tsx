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
import Input from "@/components/common/input";
import Button from "@/components/button";
import { brand } from "@/api/client.api";

const BrandForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TBrand>({
    defaultValues: {
      name: "",
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
      router.replace("/admin/brands");
    },
    onError: (error: Error) => {
      console.log("on error");
      console.log(error);
      toast.error(error?.message ?? "Brand Register Failed");
    },
  });
  const formData = new FormData();
  const onSubmit = async (data: TBrand) => {
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("logo", data.logo[0]);
    mutate(formData);
    router.push("admin/list/brand")
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
        name="name"
        id="name"
        register={register}
        error={errors.name?.message}
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
