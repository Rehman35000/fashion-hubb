import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16 bg-cinnamon-accent my-24 rounded-[2rem] overflow-hidden relative border border-cinnamon-primary/5">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cinnamon-primary/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
      
      <div className="flex flex-col items-start space-y-6 z-10 md:w-1/2">
        <h2 className="text-2xl md:text-5xl font-bold text-cinnamon-primary leading-tight tracking-tight">
          Fashion Hubb, where passion meets luxury.
        </h2>
        <p className="max-w-md text-cinnamon-primary/60 font-light leading-relaxed">
         Discover the perfect pair of tailored pants and versatile staples. Our premium collection is designed to elevate your everyday style with comfort, confidence, and effortless luxury.
        </p>
        <button className="group flex items-center justify-center gap-3 px-10 py-3 bg-cinnamon-primary text-white text-[10px] uppercase tracking-widest hover:bg-cinnamon-primary/90 transition-all duration-300 shadow-xl shadow-cinnamon-primary/10">
          Shop the Collection
        </button>
      </div>

      <div className="md:w-1/2 flex justify-end items-center mt-12 md:mt-0 relative z-10">
        <div className="relative group">
           <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500"></div>
           <Image
            className="max-w-xs md:max-w-md relative z-10 drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
            src={assets.girl_with_earphone_image}
            alt="fashion_banner"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;