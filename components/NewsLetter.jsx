import React, { useState } from "react";
import toast from "react-hot-toast";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Welcome to the Inner Circle!");
        setEmail("");
      } else {
        toast.error(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to subscribe. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 pt-20 pb-32 max-w-4xl mx-auto">
      <div className="space-y-3">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-cinnamon-primary">
          Join the Inner Circle
        </h2>
        <p className="md:text-lg text-cinnamon-primary/60 font-light">
          Subscribe to receive exclusive offers, early access to new collections, and style inspiration.
        </p>
      </div>

      <form 
        onSubmit={handleSubmit}
        className="flex items-center justify-between w-full max-w-lg h-14 mt-4 border-b border-cinnamon-primary/30 focus-within:border-cinnamon-primary transition-colors duration-300"
      >
        <input
          className="bg-transparent h-full outline-none w-full px-2 text-cinnamon-primary placeholder:text-cinnamon-primary/30 font-light"
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button 
          disabled={loading}
          className="px-8 h-full text-cinnamon-primary uppercase tracking-[0.2em] text-xs font-bold hover:text-cinnamon-secondary transition-colors disabled:opacity-50"
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      
      <p className="text-[10px] uppercase tracking-widest text-cinnamon-primary/40">
        By subscribing, you agree to our Privacy Policy
      </p>
    </div>
  );
};

export default NewsLetter;
