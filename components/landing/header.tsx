const Header = () => {
  return (
     <div className="[background-image:url('/images.png')] bg-cover bg-center bg-no-repeat min-h-[500px] w-full">
      <div className="p-10 text-white">
      <h1 className="text-4xl font-bold"> Welcome to Botaniva</h1>
      <p className="mt-3 text-lg">Fresh products for your everyday life.</p>
      <button className="mt-5 rounded-lg bg-green-700 px-6 py-3">
        Shop Now
      </button>
    </div>
    </div>
  );
};

export default Header;
