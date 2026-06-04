'use client'
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        toast.success('Welcome back!');
        router.push('/all-products');
      } else {
        toast.error(data.message || 'Something went wrong');
      }
    } catch { toast.error('Something went wrong'); }
    finally { setLoading(false); }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-serif font-bold text-cinnamon-primary mb-6 text-center">Sign In</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-medium tracking-widest uppercase text-cinnamon-secondary/50 mb-1.5">Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-cinnamon-primary/20 bg-cinnamon-accent/30 text-sm focus:outline-none focus:border-cinnamon-primary/50 transition-all" />
            </div>
            <div>
              <label className="block text-[10px] font-medium tracking-widest uppercase text-cinnamon-secondary/50 mb-1.5">Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-cinnamon-primary/20 bg-cinnamon-accent/30 text-sm focus:outline-none focus:border-cinnamon-primary/50 transition-all" />
            </div>
            <button onClick={handleSubmit} disabled={loading}
              className="w-full bg-cinnamon-primary text-white py-2.5 rounded-xl font-bold tracking-widest uppercase text-xs hover:bg-cinnamon-primary/90 transition-all disabled:opacity-60">
              {loading ? 'Please wait...' : 'Sign In'}
            </button>
          </div>
          <p className="text-center text-xs text-cinnamon-secondary/50 mt-5">
            Don't have an account?{' '}
            <a href="/register" className="text-cinnamon-primary font-bold hover:underline">Register</a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}