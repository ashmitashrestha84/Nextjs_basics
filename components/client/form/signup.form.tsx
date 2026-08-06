"use client";

import Button from "@/components/button";
import Input from "@/components/common/input";
import { SubmitEvent, useState } from "react";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    console.log(formData);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <Input
        label="Name"
        placeholder="John Doe"
        type="text"
        name="name"
        id="name"
        value={formData.name}
        onChange={onChange}
      />

      <Input
        label="Email"
        placeholder="john@gmail.com"
        type="email"
        name="email"
        id="email"
        value={formData.email}
        onChange={onChange}
      />

      <Input
        label="Password"
        placeholder="Enter your password"
        type="password"
        name="password"
        id="password"
        value={formData.password}
        onChange={onChange}
      />

      <Input
        label="Confirm Password"
        placeholder="Enter your password again"
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        value={formData.confirmPassword}
        onChange={onChange}
      />

      <Button label="Sign Up" type="submit" />
    </form>
  );
};

export default SignupForm;