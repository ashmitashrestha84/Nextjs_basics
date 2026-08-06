import LoginForm from "@/components/client/form/login.form";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ecommerce | Login",
  description: "Ecommerce app",
};

const Loginpage = () => {
  return (
    <main className="min-h-screen bg-primary-lighter px-5 flex justify-center items-center">
      <section className="w-full max-w-md bg-card border border-border rounded-lg shadow-sm px-8 py-10 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-primary flex justify-center">
            Login
          </h1>

          <p className="text-muted text-base">
            Welcome back! Please login to your account.
          </p>
        </div>
        <LoginForm />
        <div className="-mt-2 flex flex-col gap-3 text-sm">

          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-primary hover:text-primary-hover font-medium"
            >
              Forgot Password?
            </Link>
          </div>

          <p className="text-center text-muted">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              title="Go to sign up page"
              className="text-primary hover:text-primary-hover font-semibold"
            >
              Sign Up
            </Link>
          </p>

        </div>
      </section>
    </main>
  );
};

export default Loginpage;