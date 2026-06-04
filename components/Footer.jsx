import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-cinnamon-primary text-white/80">
      <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row items-start justify-between px-6 md:px-16 lg:px-32 gap-16 py-20 border-b border-white/10">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-serif font-bold text-white mb-6">Fashion Hubb</h2>
          <p className="text-sm leading-relaxed max-w-sm">
            Curating the finest fashion with a touch of elegance. Our mission is to provide high-quality, sustainable apparel that makes you feel as good as you look.
          </p>
          <div className="flex flex-col gap-4 mt-6">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white">Connect</h4>
            <div className="flex flex-col gap-3 text-sm text-white/60 font-light">
              <a href="https://wa.me/923477559999" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                WhatsApp Support
              </a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="https://www.tiktok.com/@fashion.hubb7?_r=1&_t=ZS-96CPl7TEjhs" className="hover:text-white transition-colors">Tik Tok</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h2 className="font-serif font-semibold text-white uppercase tracking-widest text-xs">Company</h2>
          <ul className="text-sm space-y-3 font-light">
            <li>
              <Link className="hover:text-white transition-colors" href="/">Home</Link>
            </li>
            <li>
              <Link className="hover:text-white transition-colors" href="/all-products">Shop</Link>
            </li>
            <li>
              <Link className="hover:text-white transition-colors" href="/my-orders">My Orders</Link>
            </li>
            <li>
              <Link className="hover:text-white transition-colors" href="/about">About Us</Link>
            </li>
            <li>
              <Link className="hover:text-white transition-colors" href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-5">
          <h2 className="font-serif font-semibold text-white uppercase tracking-widest text-xs">Get in touch</h2>
          <div className="text-sm space-y-3 font-light">
            <p className="hover:text-white transition-colors cursor-pointer">+923477559999</p>
            <p className="hover:text-white transition-colors cursor-pointer">thefashionhubbstore1@gmail.com</p>
            <div className="flex gap-4 mt-4">
              <Image className="w-5 h-5 opacity-70 hover:opacity-100 transition-opacity cursor-pointer invert" src={assets.facebook_icon} alt="facebook" />
              <Image className="w-5 h-5 opacity-70 hover:opacity-100 transition-opacity cursor-pointer invert" src={assets.instagram_icon} alt="instagram" />
              <Image className="w-5 h-5 opacity-70 hover:opacity-100 transition-opacity cursor-pointer invert" src={assets.twitter_icon} alt="twitter" />
            </div>
          </div>
        </div>
      </div>
      <p className="py-8 text-center text-[10px] uppercase tracking-[0.2em] opacity-50">
        Copyright 2026 © Fashion Hubb. All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
