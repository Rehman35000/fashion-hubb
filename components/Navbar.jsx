"use client"
import React from "react";
import { assets } from "@/assets/assets";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";

const Navbar = () => {
  const { isSeller, router, getCartCount } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-cinnamon-primary/5">
      {/* Announcement Bar */}
      <div className="bg-cinnamon-primary text-white text-[10px] py-2.5 text-center uppercase tracking-[0.2em] font-medium px-4">
        Welcome to Fashion Hubb
      </div>

      <div className="flex items-center justify-between px-6 md:px-16 lg:px-24 py-5 max-w-[1920px] mx-auto relative">

        {/* Left: Navigation Links */}
        <div className="hidden md:flex items-center gap-10 text-[11px] font-bold uppercase tracking-widest text-cinnamon-primary/60">
          <Link href="/" className="hover:text-cinnamon-primary transition-colors duration-300">
            Home
          </Link>
          <Link href="/all-products" className="hover:text-cinnamon-primary transition-colors duration-300">
            Shop
          </Link>
          <Link href="/my-orders" className="hover:text-cinnamon-primary transition-colors duration-300">
            Orders
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden" onClick={() => setIsMenuOpen(true)}>
          <Image className="w-5 h-5 opacity-60 hover:opacity-100 transition-opacity cursor-pointer" src={assets.menu_icon} alt="menu" />
        </div>

        {/* Center: Brand Logo */}
        <div
          className="absolute left-1/2 -translate-x-1/2 cursor-pointer group text-center"
          onClick={() => router.push('/')}
        >
          <h1 className="text-1xl md:text-3xl font-bold font-serif tracking-tighter text-cinnamon-primary transition-transform group-hover:scale-105 whitespace-nowrap">
            fashionHubb
          </h1>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-6">

          <Image
            className="w-4 h-4 cursor-pointer opacity-60 hover:opacity-100 transition-all hover:scale-110"
            src={assets.search_icon}
            alt="search"
          />

          <div
            className="relative cursor-pointer group"
            onClick={() => router.push('/cart')}
          >
            <Image
              className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-all group-hover:scale-110"
              src={assets.cart_icon}
              alt="cart"
            />
            <span className="absolute -top-2 -right-2 bg-cinnamon-primary text-white text-[9px] w-3.5 h-3.5 flex items-center justify-center rounded-full font-bold">
              {getCartCount()}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-500 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setIsMenuOpen(false)}>
        <div className={`absolute top-0 left-0 w-72 h-full bg-white shadow-2xl transition-transform duration-500 ease-out p-8 flex flex-col gap-8 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`} onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between border-b border-cinnamon-primary/10 pb-6">
            <h2 className="text-xl font-serif font-bold text-cinnamon-primary">Fashion Hubb</h2>
            <button onClick={() => setIsMenuOpen(false)} className="text-cinnamon-primary opacity-40 hover:opacity-100 transition-opacity">✕</button>
          </div>

          <div className="flex flex-col gap-6 text-sm font-bold uppercase tracking-widest text-cinnamon-primary/60">
            <Link onClick={() => setIsMenuOpen(false)} href="/" className="hover:text-cinnamon-primary transition-colors">Home</Link>
            <Link onClick={() => setIsMenuOpen(false)} href="/all-products" className="hover:text-cinnamon-primary transition-colors">Shop</Link>
            <Link onClick={() => setIsMenuOpen(false)} href="/my-orders" className="hover:text-cinnamon-primary transition-colors">My Orders</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
