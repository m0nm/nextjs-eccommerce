import Category from "./Category/Category";
import Searchbar from "./Searchbar/Searchbar";

function Products() {
  return (
    <div className="bg-white dark:bg-zinc-800 flex flex-col items-center justify-between w-[90%] min-h-[250px] mx-auto mt-40 p-6 rounded-md shadow-md">
      {/* header */}
      <h1 className="text-4xl md:self-start mb-10 bold">Products</h1>

      {/* Category and Searchbar */}
      <div className="flex flex-col-reverse md:flex-row w-full h-10 justify-between">
        {/* category */}
        <Category />

        {/* searchbar */}
        <Searchbar />
      </div>
    </div>
  );
}

export default Products;
