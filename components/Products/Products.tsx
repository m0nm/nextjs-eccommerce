import Category from "./Category/Category";

function Products() {
  return (
    <div className="bg-white flex flex-col items-center justify-between w-[90%] mx-auto mt-40 p-6 rounded-md border">
      {/* header */}
      <h1 className="text-4xl bold">Products</h1>

      {/* Category and Searchbar */}
      <div className="flex w-full h-10 justify-between">
        <Category />
      </div>
    </div>
  );
}

export default Products;
