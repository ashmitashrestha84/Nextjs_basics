"use client";

import Button from "@/components/button";
import Input from "@/components/common/input";
import { SubmitEvent, useState } from "react";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    console.log(formData);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
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

      <div>
        <Button label="Login" type="submit" />
      </div>
    </form>
  );
};

export default LoginForm;
