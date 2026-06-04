import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";

const fashionFeatured = [
  {
    id: 1,
    image: "/beige-trousers.jpg",
    category: "The Essential Edit",
    title: "Classic Pleated Trousers",
    description: "Sophisticated beige trousers featuring a high-waist pleated design.",
  },
  {
    id: 2,
    image: "/grey-trousers.jpg",
    category: "New Arrivals",
    title: "Modern Tailoring",
    description: "A contemporary take on a classic with a sharp, pleated look.",
  },
  {
    id: 3,
    image: "/black-trousers.jpg",
    category: "Limited Edition",
    title: "Midnight Dress Trousers",
    description: "The quintessential black dress trousers for any formal wardrobe.",
  },
];

const FeaturedProduct = () => {
  const router = useRouter();
  return (
    <div className="py-20 animate-fade-in">
      <div className="flex flex-col items-start gap-2 mb-16">
        <p className="text-xs uppercase tracking-[0.4em] text-cinnamon-primary/40 font-bold">Curated Selection</p>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-cinnamon-primary italic">The Season's Highlights</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {fashionFeatured.map(({ id, image, category, title, description }) => (
          <div key={id} onClick={() => router.push('/all-products')} className="relative group cursor-pointer overflow-hidden rounded-[2.5rem] aspect-[4/5]">
            <Image
              src={image}
              alt={title}
              width={800}
              height={1000}
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
