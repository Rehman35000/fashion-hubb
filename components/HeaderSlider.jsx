import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title: "The Perfect Tailored Pant",
      offer: "New Season Essentials",
      buttonText1: "Shop Now",
      imgSrc: assets.girl_with_headphone_image,
    },
    {
      id: 2,
      title: "The Art of Sartorial Craft",
      offer: "Artisan Series",
      buttonText1: "shop all",
    
      imgSrc: assets.girl_with_earphone_image,
    },
    {
      id: 3,
      title: "Minimalism in Motion",
      offer: "Sculptural Silhouettes",
      buttonText1: "shop all",
    
      imgSrc: assets.boy_with_laptop_image,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="overflow-hidden relative w-full pt-10">
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between bg-cinnamon-primary/5 py-12 md:px-20 px-6 rounded-3xl min-w-full"
          >
            <div className="md:w-1/2 mt-10 md:mt-0 space-y-6">
              <p className="text-sm md:text-sm uppercase tracking-[0.3em] text-cinnamon-primary/70 font-sans">
                {slide.offer}
              </p>
              <h1 className="max-w-xl text-1xl md:text-6xl font-serif font-bold text-cinnamon-primary leading-tight">
                {slide.title}
              </h1>
              <div className="flex items-center gap-6 pt-4">
                <button className="px-2 py-2 bg-cinnamon-primary text-white text-xs uppercase tracking-widest hover:bg-cinnamon-secondary transition-all duration-300">
                  {slide.buttonText1}
                </button>
                {/* <button className="group flex items-center gap-3 text-xs uppercase tracking-widest text-cinnamon-primary font-semibold">
                  {slide.buttonText2}
                  <div className="w-8 h-[1px] bg-cinnamon-primary group-hover:w-12 transition-all duration-300"></div>
                </button> */}
              </div>
            </div>
            <div className="md:w-1/2 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-cinnamon-primary/10 rounded-full blur-3xl opacity-30 transform scale-75"></div>
              <Image
                className="relative z-10 w-64 md:w-[450px] object-contain drop-shadow-2xl"
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-3 mt-10">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              currentSlide === index ? "w-8 bg-cinnamon-primary" : "w-2 bg-cinnamon-primary/20"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
