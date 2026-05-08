'use client'
import React from 'react';
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';

const CheckoutSidebar = () => {
    const { products, cartItems, getCartAmount, currency } = useAppContext();

    const subtotal = getCartAmount();
    const shipping = 299;
    const total = subtotal + shipping;

    return (
        <div className="bg-[#f9f9f9] min-h-screen p-8 md:p-12 space-y-8 border-l border-cinnamon-primary/5">
            <div className="space-y-6">
                {Object.keys(cartItems).map((itemId) => {
                    const product = products.find(p => p._id === itemId);
                    if (!product || cartItems[itemId] <= 0) return null;

                    return (
                        <div key={itemId} className="flex items-center gap-4">
                            <div className="relative w-16 h-20 bg-white border border-cinnamon-primary/10 rounded-xl flex-shrink-0 p-1">
                                <Image
                                    src={product.image[0]}
                                    alt={product.name}
                                    className="w-full h-full object-cover rounded-lg"
                                    width={100}
                                    height={150}
                                />
                                <div className="absolute -top-2 -right-2 w-5 h-5 bg-black/80 text-white text-[10px] flex items-center justify-center rounded-full font-bold">
                                    {cartItems[itemId]}
                                </div>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-cinnamon-primary">{product.name}</p>
                                <p className="text-xs text-cinnamon-primary/40 font-bold uppercase tracking-widest mt-0.5">28</p>
                            </div>
                            <p className="text-sm font-medium text-cinnamon-primary">
                                Rs {product.offerPrice.toLocaleString()}.00
                            </p>
                        </div>
                    );
                })}
            </div>

            <div className="space-y-3 pt-6 border-t border-cinnamon-primary/5">
                <div className="flex justify-between text-sm text-cinnamon-primary/70">
                    <span>Subtotal</span>
                    <span>Rs {subtotal.toLocaleString()}.00</span>
                </div>
                <div className="flex justify-between text-sm text-cinnamon-primary/70">
                    <span>Shipping</span>
                    <span>Rs {shipping.toLocaleString()}.00</span>
                </div>
            </div>

            <div className="flex justify-between items-baseline pt-4 border-t border-cinnamon-primary/5">
                <span className="text-lg font-bold text-cinnamon-primary">Total</span>
                <div className="text-right">
                    <span className="text-[10px] text-cinnamon-primary/40 uppercase tracking-widest font-bold mr-2">PKR</span>
                    <span className="text-2xl font-bold text-cinnamon-primary">
                        Rs {total.toLocaleString()}.00
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSidebar;
