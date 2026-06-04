'use client';
import React, { useEffect, useState } from "react";
import { assets, orderDummyData } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";

const MyOrders = () => {
    const { currency, orders, products } = useAppContext();

    return (
        <>
            <Navbar />
            <div className="flex flex-col px-6 md:px-16 lg:px-32 py-12 min-h-screen bg-cinnamon-accent/20">
                <div className="max-w-6xl mx-auto w-full">
                    <div className="flex flex-col gap-2 mb-12">
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-cinnamon-primary italic">My Orders</h2>
                        <p className="text-xs uppercase tracking-[0.3em] text-cinnamon-primary/40 font-bold">Track your latest purchases</p>
                    </div>

                    {orders.length === 0 ? (
                        <div className="bg-white rounded-3xl p-20 text-center border border-cinnamon-primary/5 shadow-sm">
                            <Image src={assets.box_icon} className="w-12 h-12 mx-auto opacity-20 mb-6" alt="empty" />
                            <p className="text-cinnamon-primary/40 font-serif italic text-xl">No orders placed yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order, index) => (
                                <div key={index} className="bg-white rounded-3xl p-8 border border-cinnamon-primary/5 shadow-sm hover:shadow-md transition-shadow animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <div className="flex flex-col lg:flex-row gap-10 justify-between">
                                        <div className="flex-1 space-y-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-cinnamon-accent flex items-center justify-center">
                                                    <Image className="w-5 h-5 opacity-40" src={assets.box_icon} alt="box" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] uppercase tracking-widest text-cinnamon-primary/40 font-bold">Order ID</p>
                                                    <p className="text-sm font-bold text-cinnamon-primary">#{order._id.slice(-8)}</p>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                {order.items.map((item, idx) => {
                                                    const product = products.find(p => p._id === (item._id || item.product?._id));
                                                    return (
                                                        <div key={idx} className="flex items-center gap-4">
                                                            <div className="w-10 h-12 rounded-lg overflow-hidden bg-cinnamon-accent">
                                                                {product?.image && <Image src={product.image[0]} width={100} height={120} className="w-full h-full object-cover" alt="p" />}
                                                            </div>
                                                            <p className="text-sm text-cinnamon-primary/80 font-medium italic">
                                                                {product?.name || "Product"} <span className="text-xs text-cinnamon-primary/40 not-italic ml-2">x {item.quantity}</span>
                                                            </p>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <div className="lg:w-1/3 space-y-2 border-l border-cinnamon-primary/5 pl-0 lg:pl-10 pt-6 lg:pt-0">
                                             <p className="text-[10px] uppercase tracking-widest text-cinnamon-primary/40 font-bold mb-4">Delivery Address</p>
                                             <p className="text-sm font-bold text-cinnamon-primary">{order.address.fullName}</p>
                                             <p className="text-xs text-cinnamon-primary/60 font-light leading-relaxed">
                                                {order.address.area}<br/>
                                                {order.address.city}, {order.address.state}<br/>
                                                {order.address.phoneNumber}
                                             </p>
                                        </div>

                                        <div className="lg:w-1/4 flex flex-col justify-between items-end gap-6 pt-6 lg:pt-0">
                                            <div className="text-right">
                                                <p className="text-[10px] uppercase tracking-widest text-cinnamon-primary/40 font-bold">Total Amount</p>
                                                <p className="text-2xl font-serif font-bold text-cinnamon-primary">{currency}{order.amount.toLocaleString()}.00</p>
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                <span className="px-4 py-1.5 bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-widest rounded-full border border-green-100">
                                                    {order.status || 'Processing'}
                                                </span>
                                                <p className="text-[10px] text-cinnamon-primary/40 uppercase tracking-widest font-bold">Placed on {order.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MyOrders;