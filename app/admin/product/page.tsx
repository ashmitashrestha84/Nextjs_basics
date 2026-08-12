import ProductForm from "@/components/admin/form/product.form";

const Productpage = () => {
  return (

    <main className="min-h-screen bg-primary-lighter px-5 flex justify-center items-center">
      <section className="w-full max-w-md bg-card border border-border rounded-lg shadow-sm px-8 py-10 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-primary flex justify-center">
            Create Product
          </h1>

          <p className="text-muted text-base">
            Welcome! Please enter the Product detail
          </p>
        </div>

        <ProductForm />
      </section>
    </main>
  );
};


export default Productpage