
import RegisterForm from "@/components/client/form/register.form";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ecommerce | Sign Up",
  description: "Ecommerce app",
};

const SignupPage = () => {
  return (
    <main className="min-h-130 bg-primary-lighter px-5 flex justify-center items-center">
      <section className="min-w-130 max-w-md bg-card border border-border rounded-lg shadow-sm px-8 py-10 flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-primary flex justify-center">
            Sign Up
          </h1>

          <p className="text-muted text-base">
            Welcome! Please create your account.
          </p>
        </div>
        <RegisterForm />
        <div className="-mt-2 flex flex-col gap-3 text-sm">
          <div className="text-right">
          </div>

          <p className="text-center text-muted">
            Already have an account?
            <Link
              href="/login"
              title="Go to login page"
              className="text-primary hover:text-primary-hover font-semibold"
            >
              Sign In
            </Link>
          </p>
          
        </div>
      </section>
    </main>
  );
};

export default SignupPage;
