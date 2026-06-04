'use client'
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

const About = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <Image 
                        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
                        alt="Fashion Studio"
                        fill
                        className="object-cover scale-105 animate-slow-zoom"
                    />
                </div>
                <div className="relative z-20 text-center space-y-4 px-6">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tight animate-fade-up">
                        Our Story
                    </h1>
                    <p className="text-white/80 text-lg md:text-xl font-light tracking-widest uppercase animate-fade-up" style={{ animationDelay: '0.2s' }}>
                        Redefining Elegance Since 2024
                    </p>
                </div>
            </section>

            {/* Heritage Section */}
            <section className="py-24 px-6 md:px-16 lg:px-32 bg-white">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 animate-fade-in">
                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-cinnamon-primary leading-tight">
                                A Legacy of Craftsmanship & Modern Vision
                            </h2>
                            <div className="w-20 h-1 bg-cinnamon-primary/20 rounded-full" />
                        </div>
                        <p className="text-lg text-cinnamon-primary/70 leading-relaxed font-light">
                            Fashion Hubb was born from a simple yet profound vision: to merge the timeless heritage of traditional craftsmanship with the bold aesthetics of modern high fashion. 
                        </p>
                        <p className="text-lg text-cinnamon-primary/70 leading-relaxed font-light">
                            Based in the heart of Lahore, we take inspiration from our rich cultural tapestry, translating it into contemporary silhouettes that speak to the global citizen. Every piece in our collection is a testament to our commitment to quality, detail, and the art of dressing well.
                        </p>
                    </div>
                    <div className="relative h-[500px] rounded-[40px] overflow-hidden shadow-2xl animate-fade-in" style={{ animationDelay: '0.3s' }}>
                        <Image 
                            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1974&auto=format&fit=crop"
                            alt="Fashion Detail"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 px-6 md:px-16 lg:px-32 bg-cinnamon-accent/5">
                <div className="max-w-6xl mx-auto text-center space-y-16">
                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-cinnamon-primary">The Hubb Philosophy</h2>
                        <p className="text-cinnamon-primary/40 uppercase tracking-widest text-xs font-bold">What we stand for</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                title: "Quality First",
                                desc: "We source only the finest fabrics and materials, ensuring that every garment feels as luxurious as it looks.",
                                icon: "🧵"
                            },
                            {
                                title: "Ethical Sourcing",
                                desc: "Our commitment to ethical production means fair wages and safe environments for the artisans who bring our designs to life.",
                                icon: "🌿"
                            },
                            {
                                title: "Timeless Design",
                                desc: "We create pieces that transcend trends, focusing on silhouettes that remain elegant season after season.",
                                icon: "⏳"
                            }
                        ].map((item, i) => (
                            <div key={i} className="p-10 bg-white rounded-3xl shadow-sm border border-cinnamon-primary/5 hover:shadow-xl transition-all duration-500 group">
                                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                                <h3 className="text-xl font-serif font-bold text-cinnamon-primary mb-4">{item.title}</h3>
                                <p className="text-cinnamon-primary/60 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quote Section */}
            <section className="py-32 bg-cinnamon-primary text-white text-center px-6">
                <div className="max-w-3xl mx-auto space-y-8">
                    <span className="text-6xl font-serif opacity-30">"</span>
                    <h2 className="text-2xl md:text-4xl font-serif italic font-light leading-relaxed">
                        Fashion is not just what you wear, it is a language of elegance that speaks before you do.
                    </h2>
                    <div className="w-12 h-0.5 bg-white/20 mx-auto" />
                    <p className="text-white/60 uppercase tracking-[0.3em] text-xs font-bold">Founder, Fashion Hubb</p>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default About;
