import { IProducts } from "../../interface/Index";
import Category from "./Category/Category";
import ProductCard from "./ProductCard/ProductCard";
import Searchbar from "./Searchbar/Searchbar";

function Products({ products }: IProducts) {
  return (
    <div className="bg-white dark:bg-zinc-800 flex flex-col items-center w-[90%] min-h-[250px] mx-auto p-6 rounded-md shadow-md">
      {/* header */}
      <h1 className="text-4xl h-24 md:self-start mb-10 bold">Products</h1>

      {/* Category and Searchbar */}
      <div className="flex flex-col-reverse md:flex-row w-full h-10 justify-between">
        {/* category */}
        <Category />

        {/* searchbar */}
        <Searchbar />
      </div>

      {/* Product card */}
      <div className="w-full mt-2 flex flex-col md:flex-row justify-between items-center gap-4 flex-wrap">
        {products.map((product) => {
          return <ProductCard product={product} key={product.id} />;
        })}
      </div>
    </div>
  );
}

export default Products;
