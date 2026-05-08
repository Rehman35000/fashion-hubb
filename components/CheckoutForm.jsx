'use client'
import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import toast from 'react-hot-toast';

const CheckoutForm = ({ formData, setFormData, paymentMethod, setPaymentMethod }) => {
    const { currency, getCartAmount } = useAppContext();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="space-y-12 animate-fade-in">
            {/* Shipping Address Section */}
            <section className="space-y-6">
                <h2 className="text-xl font-serif font-bold text-cinnamon-primary">Shipping Information</h2>
                <div className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-4 border border-cinnamon-primary/10 rounded-xl focus:border-cinnamon-primary outline-none transition-all text-sm"
                        required
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full p-4 border border-cinnamon-primary/10 rounded-xl focus:border-cinnamon-primary outline-none transition-all text-sm"
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last name"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full p-4 border border-cinnamon-primary/10 rounded-xl focus:border-cinnamon-primary outline-none transition-all text-sm"
                        />
                    </div>
                </div>
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full p-4 border border-cinnamon-primary/10 rounded-xl focus:border-cinnamon-primary outline-none transition-all text-sm"
                />
                <input
                    type="text"
                    name="apartment"
                    placeholder="Apartment, suite, etc. (optional)"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    className="w-full p-4 border border-cinnamon-primary/10 rounded-xl focus:border-cinnamon-primary outline-none transition-all text-sm"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full p-4 border border-cinnamon-primary/10 rounded-xl focus:border-cinnamon-primary outline-none transition-all text-sm"
                    />
                    <input
                        type="text"
                        name="postalCode"
                        placeholder="Postal code (optional)"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full p-4 border border-cinnamon-primary/10 rounded-xl focus:border-cinnamon-primary outline-none transition-all text-sm"
                    />
                </div>
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-4 border border-cinnamon-primary/10 rounded-xl focus:border-cinnamon-primary outline-none transition-all text-sm"
                />
            </section>

            {/* Shipping Method Section */}
            <section className="space-y-6">
                <div>
                    <h2 className="text-xl font-serif font-bold text-cinnamon-primary">Shipping method</h2>
                </div>
                <div className="p-4 border border-cinnamon-primary rounded-xl bg-cinnamon-accent/10 flex justify-between items-center">
                    <span className="text-sm text-cinnamon-primary font-medium">Shipping Charges</span>
                    <span className="text-sm font-bold text-cinnamon-primary">Rs 299.00</span>
                </div>
            </section>

            {/* Payment Section */}
            <section className="space-y-6">
                <div>
                    <h2 className="text-xl font-serif font-bold text-cinnamon-primary">Payment</h2>
                    <p className="text-xs text-cinnamon-primary/60 mt-1">All transactions are secure and encrypted.</p>
                </div>
                
                <div className="border border-cinnamon-primary/10 rounded-2xl overflow-hidden">
                    <div 
                        onClick={() => setPaymentMethod('COD')}
                        className={`p-5 flex items-center gap-4 cursor-pointer transition-colors ${paymentMethod === 'COD' ? 'bg-cinnamon-accent/10' : 'bg-white'}`}
                    >
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'COD' ? 'border-cinnamon-primary' : 'border-cinnamon-primary/20'}`}>
                            {paymentMethod === 'COD' && <div className="w-2 h-2 rounded-full bg-cinnamon-primary"></div>}
                        </div>
                        <span className="text-sm text-cinnamon-primary font-medium">Cash on Delivery (COD)</span>
                    </div>

                    <div 
                        onClick={() => setPaymentMethod('CARD')}
                        className={`p-5 border-t border-cinnamon-primary/10 transition-colors ${paymentMethod === 'CARD' ? 'bg-cinnamon-accent/10' : 'bg-white'}`}
                    >
                        <div className="flex items-center gap-4 cursor-pointer">
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'CARD' ? 'border-cinnamon-primary' : 'border-cinnamon-primary/20'}`}>
                                {paymentMethod === 'CARD' && <div className="w-2 h-2 rounded-full bg-cinnamon-primary"></div>}
                            </div>
                            <span className="text-sm text-cinnamon-primary font-medium">Credit / Debit Card</span>
                        </div>

                        {paymentMethod === 'CARD' && (
                            <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-top-2">
                                <input
                                    type="text"
                                    placeholder="Card number"
                                    className="w-full p-4 border border-cinnamon-primary/10 rounded-xl focus:border-cinnamon-primary outline-none transition-all text-sm bg-white"
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Expiration date (MM / YY)"
                                        className="w-full p-4 border border-cinnamon-primary/10 rounded-xl focus:border-cinnamon-primary outline-none transition-all text-sm bg-white"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Security code (CVV)"
                                        className="w-full p-4 border border-cinnamon-primary/10 rounded-xl focus:border-cinnamon-primary outline-none transition-all text-sm bg-white"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Billing Address Section */}
            <section className="space-y-6">
                <h2 className="text-xl font-serif font-bold text-cinnamon-primary">Billing address</h2>
                <div className="border border-cinnamon-primary/10 rounded-2xl overflow-hidden">
                    <div 
                        onClick={() => setFormData(prev => ({ ...prev, billingSameAsShipping: true }))}
                        className={`p-5 flex items-center gap-4 cursor-pointer transition-colors ${formData.billingSameAsShipping ? 'bg-cinnamon-accent/10' : 'bg-white'}`}
                    >
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.billingSameAsShipping ? 'border-cinnamon-primary' : 'border-cinnamon-primary/20'}`}>
                            {formData.billingSameAsShipping && <div className="w-2 h-2 rounded-full bg-cinnamon-primary"></div>}
                        </div>
                        <span className="text-sm text-cinnamon-primary">Same as shipping address</span>
                    </div>
                    <div 
                        onClick={() => setFormData(prev => ({ ...prev, billingSameAsShipping: false }))}
                        className={`p-5 flex items-center gap-4 border-t border-cinnamon-primary/10 cursor-pointer transition-colors ${!formData.billingSameAsShipping ? 'bg-cinnamon-accent/10' : 'bg-white'}`}
                    >
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${!formData.billingSameAsShipping ? 'border-cinnamon-primary' : 'border-cinnamon-primary/20'}`}>
                            {!formData.billingSameAsShipping && <div className="w-2 h-2 rounded-full bg-cinnamon-primary"></div>}
                        </div>
                        <span className="text-sm text-cinnamon-primary">Use a different billing address</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CheckoutForm;
