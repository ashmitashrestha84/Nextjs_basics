import AllList from "@/components/landing/featured-product/List-All";

const ProductPage = () => {
  return (
    <>
      <div className="flex justify-between items-start pt-5 pr-5">
        <div>
          <h1 className="font-semibold text-lg">Featured Products</h1>
          <p className="text-sm text-gray-500 mt-1">
            {" "}
            Discover our featured product
          </p>
        </div>

        <button className="border border-green-800 px-4 py-2 rounded-md text-m text-white bg-green-950 hover:bg-green-700 transition">
          Filter
        </button>
      </div>
      <AllList />
    </>
  );
};

export default ProductPage;
