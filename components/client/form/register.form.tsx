"use client";

import Button from "@/components/button";
import Input from "@/components/common/input";
import { signupSchema } from "@/schemas/register.schemas";
import { TSignup } from "@/types/register.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    resolver:yupResolver(signupSchema)
  });

  const onSubmit = (data:TSignup) => {
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

export default RegisterForm;
