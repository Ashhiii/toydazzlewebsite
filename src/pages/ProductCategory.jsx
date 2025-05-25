import React from "react";
import ProductCard from "../components/ProductCard";
import { categoriesBanner } from "../data/products";
import { useParams } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import Loader from "../components/Loader";

const ProductCategory = () => {
  // Get the category parameter from url
  const { category } = useParams();
  const { products, loading } = useProducts();

  // Filter products based on the category
  const filteredProducts = products.filter(
    (product) => product.category?.name?.toLowerCase() === category.toLowerCase()
  );
  // Filter banner for the current category
  const banner = categoriesBanner.find(
    (banner) => banner.category?.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="">
      {banner && (
        <div className="category-banner py-10 lg:px-16 2xl:px-40 mx-auto">
          <img
            src={banner.image}
            alt={`Banner for ${category}`}
            className="object-cover"
          />
        </div>
      )}
      {loading ? (
        <div className="mb-10">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 lg:px-16 2xl:px-40 py-10">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
