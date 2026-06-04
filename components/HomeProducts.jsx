import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";
import { assets } from "@/assets/assets";
import Image from "next/image";

const HomeProducts = () => {
  const { products, router } = useAppContext()

  return (
    <div className="flex flex-col pt-12 pb-24">
      {/* Category Heading */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-cinnamon-primary tracking-tight">
          All Products
        </h1>
      </div>


      {/* Product Grid - 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-16 w-full max-w-5xl mx-auto">
        {products.slice(0, 4).map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>

      {/* Shop All Button */}
      <div className="flex justify-center mt-20">
        <button 
          onClick={() => { router.push('/all-products') }} 
          className="px-16 py-4 bg-cinnamon-primary text-white text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-cinnamon-primary/90 transition-all duration-300 shadow-xl shadow-cinnamon-primary/20 hover:scale-105 active:scale-95"
        >
          Shop All
        </button>
      </div>
    </div>
  );
};

export default HomeProducts;
