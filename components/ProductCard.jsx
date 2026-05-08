import React from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';

const ProductCard = ({ product }) => {
    const { currency, router } = useAppContext()

    // Simulate badges for demonstration (In a real app, these would come from product data)
    const isSoldOut = product.name.includes("Wool") || product.name.includes("Blazer"); 
    const isSale = product.offerPrice < product.price;

    return (
        <div
            onClick={() => { router.push('/product/' + product._id); scrollTo(0, 0) }}
            className="flex flex-col items-start gap-4 cursor-pointer group hover-lift"
        >
            <div className="relative overflow-hidden bg-cinnamon-accent w-full aspect-[4/5] flex items-center justify-center transition-all duration-500">
                <Image
                    src={product.image[0]}
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                    width={800}
                    height={800}
                />
                
                {/* Badges */}
                <div className="absolute bottom-4 left-4 flex flex-col gap-2">
                    {isSale && (
                        <span className="bg-black text-white text-[10px] px-3 py-1.5 rounded-full font-light tracking-wider">
                            Sale
                        </span>
                    )}
                </div>

                {/* Heart Overlay */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-white transition-colors">
                        <Image
                            className="h-3.5 w-3.5"
                            src={assets.heart_icon}
                            alt="heart"
                        />
                    </button>
                </div>
            </div>

            <div className="flex flex-col items-start gap-1 w-full">
                <p className="text-xs md:text-sm font-light text-cinnamon-primary/80 tracking-wide">
                    {product.name}
                </p>
                <div className="flex flex-col items-start">
                    {isSale && product.price > product.offerPrice && (
                        <p className="text-xs text-cinnamon-primary/40 line-through">
                            {currency}{product.price.toLocaleString()}.00 PKR
                        </p>
                    )}
                    <p className="text-sm md:text-base font-medium text-cinnamon-primary">
                        {currency}{product.offerPrice.toLocaleString()}.00 PKR
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ProductCard