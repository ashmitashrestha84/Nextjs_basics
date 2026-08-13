import Link from "next/link";
import { IoChevronDown } from "react-icons/io5";
import CategoryList from "./list";
import SectionHeading from "../section-heading";

const CategoriesList = () => {
  return (
    <section className="w-full px-10 py-6 border-b bg-[#ced9cb]">
      <SectionHeading
        heading="Featured Category"
        subHeading="Discover our Featued Category"
        link="/products"
        spantext="Explore All"
      />

      <CategoryList />
    </section>
  );
};

export default CategoriesList;
