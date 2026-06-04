'use client'
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const AllProductsContent = () => {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

    const { products } = useAppContext();

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-start px-6 md:px-16 lg:px-32 min-h-screen">
                <div className="flex flex-col items-end pt-12">
                    <p className="text-2xl font-serif font-bold text-cinnamon-primary">All products</p>
                    <div className="w-16 h-0.5 bg-cinnamon-primary rounded-full mt-2"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 mt-12 pb-14 w-full max-w-5xl mx-auto">
                    {products
                        .filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.description.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((product, index) => <ProductCard key={index} product={product} />)}
                </div>
            </div>
            <Footer />
        </>
    );
};

const AllProducts = () => {
    return (
        <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
            <AllProductsContent />
        </Suspense>
    );
};

export default AllProducts;
