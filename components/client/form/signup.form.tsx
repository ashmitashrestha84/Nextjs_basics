"use client";

import Button from "@/components/button";
import Input from "@/components/common/input";
import { SubmitEvent, useState } from "react";
import { useForm } from "react-hook-form";

const SignupForm = () => {

  const {register,handleSubmit} = useForm({
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: {
    full_name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }) => {
    if (data.password !== data.confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <Input
        label="Full Name"
        placeholder="Enter your name"
        type="text"
        name="full_name"
        id="full_name"
        register={register}
    
      />

      <Input
        label="Email"
        placeholder="Enter your email"
        type="email"
        name="email"
        id="email"
        register={register}
      />

      <Input
        label="Phone"
        placeholder="Enter your phone number"
        type="text"
        name="phone"
        id="phone"
       register={register}
      />

      <Input
        label="Password"
        placeholder="Enter your password"
        type="password"
        name="password"
        id="password"
        register={register}
      />

      <Input
        label="Confirm Password"
        placeholder="Enter your password again"
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        register={register}
      />

      <Button label="Sign Up" type="submit" />
    </form>
  );
};

export default SignupForm;
