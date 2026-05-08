"use client"
import { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import React from "react";

const Product = () => {
    const { id } = useParams();
    const { products, router, addToCart, currency } = useAppContext()

    const [mainImage, setMainImage] = useState(null);
    const [productData, setProductData] = useState(null);
    const [selectedSize, setSelectedSize] = useState('30');

    const fetchProductData = async () => {
        const product = products.find(product => product._id === id);
        setProductData(product);
    }

    useEffect(() => {
        fetchProductData();
    }, [id, products.length])

    return productData ? (<>
        <Navbar />
        <div className="px-6 md:px-16 lg:px-32 pt-16 pb-32 space-y-20 bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                {/* Image Gallery */}
                <div className="flex flex-col gap-6 animate-fade-in">
                    <div className="aspect-[4/5] overflow-hidden bg-cinnamon-accent rounded-3xl relative group">
                        <Image
                            src={mainImage || productData.image[0]}
                            alt={productData.name}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            width={1280}
                            height={1600}
                        />
                        <div className="absolute top-6 right-6">
                            <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-cinnamon-primary shadow-sm">
                                New Arrival
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        {productData.image.map((image, index) => (
                            <div
                                key={index}
                                onClick={() => setMainImage(image)}
                                className={`cursor-pointer aspect-[4/5] rounded-xl overflow-hidden border-2 transition-all duration-300 ${mainImage === image ? 'border-cinnamon-primary shadow-lg scale-95' : 'border-transparent opacity-60 hover:opacity-100'}`}
                            >
                                <Image
                                    src={image}
                                    alt="thumbnail"
                                    className="w-full h-full object-cover"
                                    width={300}
                                    height={400}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col justify-center space-y-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <div className="space-y-4">
                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-cinnamon-primary/40">
                            {productData.category} Collection
                        </p>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-cinnamon-primary leading-tight">
                            {productData.name}
                        </h1>
                        <div className="flex items-center gap-4">
                             <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Image key={i} className={`h-3 w-3 ${i < 4 ? 'opacity-100' : 'opacity-30'}`} src={assets.star_icon} alt="star" />
                                ))}
                            </div>
                            <span className="text-xs text-cinnamon-primary/40 font-medium tracking-widest">(48 REVIEWS)</span>
                        </div>
                    </div>

                    <div className="flex items-baseline gap-4">
                        <p className="text-3xl font-serif font-bold text-cinnamon-primary">
                            {currency}{productData.offerPrice.toLocaleString()}.00
                        </p>
                        {productData.price > productData.offerPrice && (
                            <p className="text-lg text-cinnamon-primary/30 line-through font-light">
                                {currency}{productData.price.toLocaleString()}.00
                            </p>
                        )}
                    </div>

                    <p className="text-cinnamon-primary/70 leading-relaxed font-light text-base max-w-lg">
                        {productData.description}
                    </p>

                    {/* Size Selector */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center max-w-xs">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-cinnamon-primary/60">Select Size</span>
                            <button className="text-[10px] font-bold uppercase tracking-widest text-cinnamon-primary/30 hover:text-cinnamon-primary transition-colors underline decoration-1 underline-offset-4">Size Guide</button>
                        </div>
                        <div className="flex gap-3">
                            {['28', '30', '32', '34'].map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`w-12 h-12 rounded-full border text-xs font-bold transition-all duration-300 ${selectedSize === size ? 'bg-cinnamon-primary border-cinnamon-primary text-white shadow-lg' : 'border-cinnamon-primary/10 text-cinnamon-primary/60 hover:border-cinnamon-primary hover:text-cinnamon-primary'}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4 max-w-lg">
                        <button 
                            onClick={() => {
                                addToCart(productData._id);
                                toast.success("Added to shopping bag");
                            }} 
                            className="flex-1 py-5 bg-white border border-cinnamon-primary text-cinnamon-primary text-xs font-bold uppercase tracking-[0.2em] rounded-2xl hover:bg-cinnamon-accent transition-all duration-300 active:scale-95 shadow-sm"
                        >
                            Add to Bag
                        </button>
                        <button 
                            onClick={() => { 
                                addToCart(productData._id); 
                                router.push('/cart') 
                            }} 
                            className="flex-1 py-5 bg-cinnamon-primary text-white text-xs font-bold uppercase tracking-[0.2em] rounded-2xl hover:bg-cinnamon-secondary transition-all duration-300 active:scale-95 shadow-lg shadow-cinnamon-primary/20"
                        >
                            Checkout Now
                        </button>
                    </div>

                </div>
            </div>

        </div>
        <Footer />
    </>
    ) : <Loading />
};

export default Product;