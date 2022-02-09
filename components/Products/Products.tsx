import { useState } from "react";
import { IProducts } from "../../interface/Index";
import Category from "./Category/Category";
import ProductCard from "./ProductCard/ProductCard";
import Searchbar from "./Searchbar/Searchbar";

function Products({ products }: { products: IProducts }) {
  // search for products
  const [search, setSearch] = useState("");

  // filter products by category
  const [category, setCategory] = useState("");

  const filteredProducts = products.filter((product) => {
    // return all products
    if (category === "" && search === "") {
      return product;
    }

    // return searched product
    if (
      search !== "" &&
      product.title.toLowerCase().includes(search.toLowerCase())
    ) {
      return product;
    }

    // return products of category
    if (
      search === "" &&
      product.category.toLowerCase() === category.toLowerCase()
    ) {
      return product;
    }
  });

  return (
    <div className="bg-white dark:bg-zinc-800 flex flex-col items-center w-[90%] min-h-[250px] mx-auto p-6 rounded-md shadow-md">
      {/* header */}
      <h1 className="text-4xl h-24 md:self-start mb-10 bold">Products</h1>

      {/* Category and Searchbar */}
      <div className="flex flex-col-reverse md:flex-row w-full h-10 justify-between">
        {/* category */}
        <Category setCategory={setCategory} />

        {/* searchbar */}
        <Searchbar setCategory={setCategory} setSearch={setSearch} />
      </div>

      {/* current category */}
      <h3 className="md:mr-auto ml-2 my-4 text-lg font-medium italic">
        {category.toUpperCase()}
      </h3>

      {/* Product card */}
      <div className="w-full flex flex-col md:flex-row items-center gap-8 flex-wrap">
        {filteredProducts.map((product) => {
          return <ProductCard product={product} key={product.id} />;
        })}
      </div>
    </div>
  );
}

export default Products;
