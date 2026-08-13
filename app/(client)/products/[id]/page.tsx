import ProductDetailPage from "@/components/landing/featured-product/productdetailpage";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <div>
      <ProductDetailPage params={params} />
    </div>
  );
};

export default page;
