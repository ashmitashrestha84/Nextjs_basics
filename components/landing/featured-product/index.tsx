
import ProductList from "./list";
import SectionHeading from "../section-heading";

const ProductsList = () => {
  return (
    <section className="w-full px-10 py-6 border-b bg-[#ced9cb]">
      <SectionHeading
        heading="Featured Products"
        subHeading="Discover our Featured Products"
        link="/products"
        spantext="View All"
      />

      <ProductList />
    </section>
  );
};

export default ProductsList;
