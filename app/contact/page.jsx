'use client'
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import toast from 'react-hot-toast';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                toast.success("Message sent! We'll get back to you soon.");
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                toast.error(data.message || "Failed to send message.");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-cinnamon-accent/5 px-6 md:px-16 lg:px-32 py-20">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
                    
                    {/* Left Side: Contact Info */}
                    <div className="space-y-12 animate-fade-in">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-6xl font-serif font-bold text-cinnamon-primary leading-tight">
                                Let's Start a Conversation
                            </h1>
                            <p className="text-lg text-cinnamon-primary/60 font-light">
                                Whether you have a question about our collections, need assistance with an order, or just want to say hello, we're here for you.
                            </p>
                        </div>

                        <div className="space-y-8 pt-8">
                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm border border-cinnamon-primary/5">
                                    <span className="text-xl">📍</span>
                                </div>
                                <div>
                                    <h3 className="font-serif font-bold text-cinnamon-primary">Visit Us</h3>
                                    <p className="text-sm text-cinnamon-primary/60 mt-1">Fashion Hubb Flagship Store<br />Gulberg III, Lahore, Pakistan</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm border border-cinnamon-primary/5">
                                    <span className="text-xl">📞</span>
                                </div>
                                <div>
                                    <h3 className="font-serif font-bold text-cinnamon-primary">Call Us</h3>
                                    <p className="text-sm text-cinnamon-primary/60 mt-1">+92 347 7559999<br />Mon - Sat, 10am - 8pm</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm border border-cinnamon-primary/5">
                                    <span className="text-xl">✉️</span>
                                </div>
                                <div>
                                    <h3 className="font-serif font-bold text-cinnamon-primary">Email Us</h3>
                                    <p className="text-sm text-cinnamon-primary/60 mt-1">thefashionhubbstore1@gmail.com<br />24/7 Support</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Contact Form */}
                    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-cinnamon-primary/5 border border-cinnamon-primary/5 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-cinnamon-primary/40 font-bold ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="w-full p-4 bg-cinnamon-accent/10 border border-transparent rounded-2xl outline-none focus:border-cinnamon-primary/20 focus:bg-white transition-all text-sm"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-cinnamon-primary/40 font-bold ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        className="w-full p-4 bg-cinnamon-accent/10 border border-transparent rounded-2xl outline-none focus:border-cinnamon-primary/20 focus:bg-white transition-all text-sm"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-cinnamon-primary/40 font-bold ml-1">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="How can we help?"
                                    className="w-full p-4 bg-cinnamon-accent/10 border border-transparent rounded-2xl outline-none focus:border-cinnamon-primary/20 focus:bg-white transition-all text-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-cinnamon-primary/40 font-bold ml-1">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="5"
                                    placeholder="Write your message here..."
                                    className="w-full p-4 bg-cinnamon-accent/10 border border-transparent rounded-2xl outline-none focus:border-cinnamon-primary/20 focus:bg-white transition-all text-sm resize-none"
                                    required
                                ></textarea>
                            </div>

                            <button
                                disabled={loading}
                                className="w-full py-5 bg-cinnamon-primary text-white text-xs font-bold uppercase tracking-[0.2em] rounded-2xl hover:bg-cinnamon-secondary transition-all duration-300 shadow-lg shadow-cinnamon-primary/20 disabled:opacity-50"
                            >
                                {loading ? "Sending Message..." : "Send Message"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Contact;
