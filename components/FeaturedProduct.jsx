import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const fashionFeatured = [
  {
    id: 1,
    image: assets.girl_with_headphone_image,
    category: "The Essential Edit",
    title: "Silk & Cashmere",
    description: "Indulge in the finest natural fibers, meticulously crafted for comfort and enduring style.",
  },
  {
    id: 2,
    image: assets.girl_with_earphone_image,
    category: "New Arrivals",
    title: "Architectural Tailoring",
    description: "Explore bold silhouettes and precise cuts that redefine modern evening wear.",
  },
  {
    id: 3,
    image: assets.boy_with_laptop_image,
    category: "Limited Edition",
    title: "The Heritage Coat",
    description: "A timeless investment piece, handmade from premium double-faced Italian wool.",
  },
];

const FeaturedProduct = () => {
  return (
    <div className="py-20 animate-fade-in">
      <div className="flex flex-col items-start gap-2 mb-16">
        <p className="text-xs uppercase tracking-[0.4em] text-cinnamon-primary/40 font-bold">Curated Selection</p>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-cinnamon-primary italic">The Season's Highlights</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {fashionFeatured.map(({ id, image, category, title, description }) => (
          <div key={id} className="relative group cursor-pointer overflow-hidden rounded-[2.5rem] aspect-[4/5]">
            <Image
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 brightness-90 group-hover:brightness-75"
            />
            
            {/* Overlay Content */}
            <div className="absolute inset-0 p-10 flex flex-col justify-end bg-gradient-to-t from-cinnamon-primary/80 via-transparent to-transparent opacity-100 transition-all duration-500">
               <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 space-y-3">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-bold">{category}</p>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-white italic">{title}</h3>
                  <p className="text-xs text-white/70 font-light leading-relaxed max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                    {description}
                  </p>
                  <div className="pt-4 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200">
                     <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white font-bold group/btn">
                        Discover Story
                        <div className="w-6 h-[1px] bg-white group-hover/btn:w-10 transition-all duration-300"></div>
                     </button>
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
