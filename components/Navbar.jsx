"use client"
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";

const Navbar = () => {
  const { router, getCartCount } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setDropdownOpen(false);
    router.push('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/all-products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-cinnamon-primary/5">
      {/* Announcement Bar */}
      <div className="bg-cinnamon-primary text-white text-[10px] py-2.5 text-center uppercase tracking-[0.2em] font-medium px-4">
        Welcome to Fashion Hubb
      </div>

      <div className="flex items-center px-4 md:px-16 lg:px-24 py-4 max-w-[1920px] mx-auto gap-3">

        {/* Left: Nav links (desktop) / Hamburger (mobile) */}
        <div className="flex items-center flex-1 min-w-0">
          <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-cinnamon-primary/60">
            <Link href="/" className="hover:text-cinnamon-primary transition-colors duration-300">Home</Link>
            <Link href="/all-products" className="hover:text-cinnamon-primary transition-colors duration-300">Shop</Link>
            <Link href="/my-orders" className="hover:text-cinnamon-primary transition-colors duration-300">Orders</Link>
            <Link href="/about" className="hover:text-cinnamon-primary transition-colors duration-300">About</Link>
            <Link href="/contact" className="hover:text-cinnamon-primary transition-colors duration-300">Contact</Link>
          </div>

          <div className="md:hidden flex-shrink-0" onClick={() => setIsMenuOpen(true)}>
            <svg className="w-6 h-6 text-cinnamon-primary cursor-pointer hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
        </div>

        {/* Center: Brand Logo */}
        <div className="flex-shrink-0 cursor-pointer group text-center px-3" onClick={() => router.push('/')}>
          <h1 className="text-lg md:text-3xl font-bold font-serif tracking-tighter text-cinnamon-primary transition-transform group-hover:scale-105 whitespace-nowrap">
            FashionHubb
          </h1>
        </div>

        {/* Right: Auth + Search + Cart */}
        <div className="flex items-center justify-end gap-3 md:gap-4 flex-1 min-w-0">

          {/* Auth — desktop only */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              /* Logged in: show name with dropdown */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-cinnamon-primary hover:text-cinnamon-primary/80 transition-colors duration-300"
                >
                  {/* Avatar circle */}
                  <span className="w-7 h-7 rounded-full bg-cinnamon-primary text-white flex items-center justify-center text-[11px] font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                  <span className="whitespace-nowrap">{user.name?.split(' ')[0]}</span>
                  <svg className={`w-3 h-3 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl shadow-xl border border-cinnamon-primary/10 py-2 z-50">
                    <Link href="/my-orders" onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-cinnamon-primary/60 hover:text-cinnamon-primary hover:bg-cinnamon-accent/30 transition-colors">
                      My Orders
                    </Link>
                    <button onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Not logged in: show Sign In + Register */
              <>
                <Link href="/login" className="text-[11px] font-bold uppercase tracking-widest text-cinnamon-primary/60 hover:text-cinnamon-primary transition-colors duration-300 whitespace-nowrap">
                  Sign In
                </Link>
                <Link href="/register" className="text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 bg-cinnamon-primary text-white rounded-xl hover:bg-cinnamon-primary/90 transition-colors duration-300 whitespace-nowrap">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch}
            className="flex items-center bg-white w-24 md:w-48 px-3 py-1.5 md:py-2 border border-cinnamon-primary/20 rounded-full focus-within:border-cinnamon-primary/50 transition-colors shadow-sm flex-shrink min-w-0">
            <input type="text" placeholder="Search..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full min-w-0 text-[10px] md:text-xs text-cinnamon-primary outline-none bg-transparent placeholder:text-cinnamon-primary/40 font-serif italic" />
            <button type="submit" className="ml-1 flex-shrink-0">
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-cinnamon-primary hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>

          {/* Cart */}
          <div className="relative cursor-pointer group flex-shrink-0" onClick={() => router.push('/cart')}>
            <svg className="w-5 h-5 text-cinnamon-primary group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-cinnamon-primary text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-sm">
              {getCartCount()}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-500 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setIsMenuOpen(false)}>
        <div className={`absolute top-0 left-0 w-72 h-full bg-white shadow-2xl transition-transform duration-500 ease-out p-8 flex flex-col gap-8 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`} onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between border-b border-cinnamon-primary/10 pb-6">
            <h2 className="text-xl font-serif font-bold text-cinnamon-primary">Fashion Hubb</h2>
            <button onClick={() => setIsMenuOpen(false)} className="text-cinnamon-primary opacity-40 hover:opacity-100 transition-opacity">✕</button>
          </div>

          {/* Mobile user greeting */}
          {user && (
            <div className="flex items-center gap-3 -mt-4">
              <span className="w-8 h-8 rounded-full bg-cinnamon-primary text-white flex items-center justify-center text-sm font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </span>
              <span className="text-sm font-bold text-cinnamon-primary">{user.name}</span>
            </div>
          )}

          <div className="flex flex-col gap-6 text-sm font-bold uppercase tracking-widest text-cinnamon-primary/60">
            <Link onClick={() => setIsMenuOpen(false)} href="/" className="hover:text-cinnamon-primary transition-colors">Home</Link>
            <Link onClick={() => setIsMenuOpen(false)} href="/all-products" className="hover:text-cinnamon-primary transition-colors">Shop</Link>
            <Link onClick={() => setIsMenuOpen(false)} href="/my-orders" className="hover:text-cinnamon-primary transition-colors">My Orders</Link>
            <Link onClick={() => setIsMenuOpen(false)} href="/about" className="hover:text-cinnamon-primary transition-colors">About Us</Link>
            <Link onClick={() => setIsMenuOpen(false)} href="/contact" className="hover:text-cinnamon-primary transition-colors">Contact</Link>
            <div className="border-t border-cinnamon-primary/10 pt-4 flex flex-col gap-4">
              {user ? (
                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                  className="text-left text-red-400 hover:text-red-600 transition-colors">
                  Sign Out
                </button>
              ) : (
                <>
                  <Link onClick={() => setIsMenuOpen(false)} href="/login" className="hover:text-cinnamon-primary transition-colors">Sign In</Link>
                  <Link onClick={() => setIsMenuOpen(false)} href="/register" className="hover:text-cinnamon-primary transition-colors">Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;