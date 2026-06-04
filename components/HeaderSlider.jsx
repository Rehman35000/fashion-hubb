import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const HeaderSlider = () => {
  const router = useRouter();
  const sliderData = [
    {
      id: 1,
      title: "The Perfect Tailored Pant",
      offer: "New Season Essentials",
      buttonText1: "Shop Now",
      imgSrc: "/beige-trousers.jpg",
    },
    {
      id: 2,
      title: "The Art of Sartorial Craft",
      offer: "Artisan Series",
      buttonText1: "shop all",
      imgSrc: "/grey-trousers.jpg",
    },
    {
      id: 3,
      title: "Minimalism in Motion",
      offer: "Sculptural Silhouettes",
      buttonText1: "shop all",
      imgSrc: "/black-trousers.jpg",
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
                <button 
                  onClick={() => router.push('/all-products')}
                  className="px-6 py-3 bg-cinnamon-primary text-white text-xs uppercase tracking-widest hover:bg-cinnamon-secondary transition-all duration-300 rounded-xl"
                >
                  {slide.buttonText1}
                </button>
              </div>
            </div>
            <div className="md:w-1/2 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-cinnamon-primary/10 rounded-full blur-3xl opacity-30 transform scale-75"></div>
              <Image
                className="relative z-10 w-64 md:w-[450px] object-cover rounded-xl drop-shadow-2xl aspect-[3/4]"
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
                width={800}
                height={1000}
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
