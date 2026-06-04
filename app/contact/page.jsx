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
            <div className="min-h-screen bg-white">
                {/* Hero Section */}
                <div className="bg-cinnamon-accent/5 py-24 px-6 md:px-16 lg:px-32 text-center">
                    <h1 className="text-4xl md:text-7xl font-serif font-bold text-cinnamon-primary mb-6 animate-fade-in">
                        Get in Touch
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-cinnamon-primary/60 font-light animate-fade-in" style={{ animationDelay: '0.1s' }}>
                        Our team is here to assist you with any inquiries. We strive to provide the most personalized experience for our clients.
                    </p>
                </div>

                <div className="px-6 md:px-16 lg:px-32 -mt-12">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
                        
                        {/* Info Cards */}
                        <div className="lg:col-span-1 space-y-6">
                            {[
                                { title: "Flagship Store", detail: "Gulberg III, Lahore, Pakistan", icon: "📍" },
                                { title: "Concierge", detail: "+92 347 7559999", icon: "📞" },
                                { title: "Email Support", detail: "thefashionhubbstore1@gmail.com", icon: "✉️" }
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-8 rounded-3xl shadow-xl shadow-cinnamon-primary/5 border border-cinnamon-primary/5 hover:-translate-y-1 transition-all duration-300">
                                    <div className="text-2xl mb-4">{item.icon}</div>
                                    <h3 className="font-serif font-bold text-cinnamon-primary text-lg">{item.title}</h3>
                                    <p className="text-sm text-cinnamon-primary/60 mt-2 leading-relaxed">{item.detail}</p>
                                </div>
                            ))}
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2 bg-white p-8 md:p-16 rounded-[40px] shadow-2xl shadow-cinnamon-primary/10 border border-cinnamon-primary/5">
                            <h2 className="text-3xl font-serif font-bold text-cinnamon-primary mb-10">Send a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] uppercase tracking-widest text-cinnamon-primary/40 font-bold ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Your Name"
                                            className="w-full p-5 bg-cinnamon-accent/5 border-b-2 border-transparent rounded-2xl outline-none focus:border-cinnamon-primary/30 focus:bg-white transition-all text-sm"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] uppercase tracking-widest text-cinnamon-primary/40 font-bold ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="email@example.com"
                                            className="w-full p-5 bg-cinnamon-accent/5 border-b-2 border-transparent rounded-2xl outline-none focus:border-cinnamon-primary/30 focus:bg-white transition-all text-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] uppercase tracking-widest text-cinnamon-primary/40 font-bold ml-1">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="What is this regarding?"
                                        className="w-full p-5 bg-cinnamon-accent/5 border-b-2 border-transparent rounded-2xl outline-none focus:border-cinnamon-primary/30 focus:bg-white transition-all text-sm"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] uppercase tracking-widest text-cinnamon-primary/40 font-bold ml-1">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="6"
                                        placeholder="How can we help you today?"
                                        className="w-full p-5 bg-cinnamon-accent/5 border-b-2 border-transparent rounded-2xl outline-none focus:border-cinnamon-primary/30 focus:bg-white transition-all text-sm resize-none"
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    disabled={loading}
                                    className="px-12 py-5 bg-cinnamon-primary text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-cinnamon-secondary transition-all duration-500 shadow-xl shadow-cinnamon-primary/20 disabled:opacity-50 hover:px-16"
                                >
                                    {loading ? "Sending..." : "Send Message"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="py-32 px-6 md:px-16 lg:px-32 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-serif font-bold text-cinnamon-primary text-center mb-16 underline decoration-cinnamon-primary/10 underline-offset-8">Common Questions</h2>
                    <div className="space-y-8">
                        {[
                            { q: "What is your return policy?", a: "We offer a 7-day hassle-free return policy for all unworn items with original tags." },
                            { q: "Do you ship internationally?", a: "Currently, we focus on delivering within Pakistan with the fastest shipping partners." },
                            { q: "How can I track my order?", a: "Once shipped, you will receive a tracking ID via email and SMS." }
                        ].map((faq, i) => (
                            <div key={i} className="group border-b border-cinnamon-primary/10 pb-8 hover:border-cinnamon-primary/30 transition-colors">
                                <h3 className="text-xl font-serif font-bold text-cinnamon-primary mb-3">{faq.q}</h3>
                                <p className="text-cinnamon-primary/60 font-light leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Contact;
