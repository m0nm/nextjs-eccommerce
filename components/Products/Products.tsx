import Category from "./Category/Category";
import Searchbar from "./Searchbar/Searchbar";

function Products() {
  return (
    <div className="bg-white dark:bg-zinc-800 flex flex-col items-center justify-between w-[90%] mx-auto mt-40 p-6 rounded-md border">
      {/* header */}
      <h1 className="text-4xl self-start mb-16 bold">Products</h1>

      {/* Category and Searchbar */}
      <div className="flex w-full h-10 justify-between">
        {/* category */}
        <Category />

        {/* searchbar */}
        <Searchbar />
      </div>
    </div>
  );
}

export default Products;
