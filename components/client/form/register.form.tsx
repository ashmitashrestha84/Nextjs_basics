"use client";

import Button from "@/components/button";
import Input from "@/components/common/input";
import { signupSchema } from "@/schemas/register.schemas";
import { TSignup } from "@/types/register.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignup>({
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = (data: TSignup) => {
    console.log("Submitted", data);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-3"
      >
        <Input
          label="Full Name"
          placeholder="Enter your name"
          type="text"
          name="full_name"
          id="full_name"
          register={register}
          error={errors.full_name?.message}
        />

        <Input
          label="Email"
          placeholder="Enter your email"
          type="email"
          name="email"
          id="email"
          register={register}
          error={errors.email?.message}
        />

        <Input
          label="Phone"
          placeholder="Enter your phone number"
          type="text"
          name="phone"
          id="phone"
          register={register}
          error={errors.phone?.message}
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          type="password"
          name="password"
          id="password"
          register={register}
          error={errors.password?.message}
        />

        <Input
          label="Confirm Password"
          placeholder="Enter your password again"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          register={register}
          error={errors.confirmPassword?.message}
        />

        <Button label="Sign Up" type="submit" />
      </form>
      <div className="flex flex-row gap-3">
        <button
          type="button"
          className="flex items-center justify-center gap-2 w-full py-2.5 pl-5 border border-border rounded-sm hover:bg-primary-lighter transition-colors cursor-pointer"
        >
          <FcGoogle size={40} />
          Continue with Google
        </button>

        <button
          type="button"
          className="flex items-center justify-center gap-2 w-full py-2.5 pl-5 border border-border rounded-sm hover:bg-primary-lighter transition-colors cursor-pointer"
        >
          <FaGithub size={40} />
          Continue with GitHub
        </button>
      </div>
    </>
  );
};

export default RegisterForm;
