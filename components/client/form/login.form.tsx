
import Button from "@/components/button";
import Input from "@/components/common/input";
import { useForm } from "react-hook-form"; 
import * as yup from "yup"

const LoginForm = () => {

  const {register, handleSubmit}= useForm({
    defaultValues:{
      email:"",
      password:"",
    }
  })


  const onSubmit = (data:{email:string, password:string}) => {
    console.log("form submitted",data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <Input
        label="Email"
        placeholder="john@gmail.com"
        type="email"
        name="email"
        id="email"
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

      <div>
        <Button label="Login" type="submit" />
      </div>
    </form>
  );
};

export default LoginForm;
