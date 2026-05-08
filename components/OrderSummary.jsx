import { addressDummyData } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const OrderSummary = ({ isCheckout }) => {
  const { currency, router, getCartCount, getCartAmount, setCartItems, orders, setOrders } = useAppContext()
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [userAddresses, setUserAddresses] = useState([]);

  const fetchUserAddresses = async () => {
    setUserAddresses(addressDummyData);
  }

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const applyPromo = () => {
    if (promoCode.toUpperCase() === "CINNAMON10") {
      setDiscount(0.1);
      toast.success("10% Discount Applied!");
    } else {
      toast.error("Invalid Promo Code");
    }
  }

  const createOrder = async () => {
    // If we're already in checkout mode, the form handles validation
    if (isCheckout) {
       // Proceed with order creation logic...
       // For now, let's keep it simple as we're focusing on UI cleanup
    }

    if (!email && !isCheckout) {
      toast.error("Please enter your email address");
      return;
    }
    // ... rest of validation logic
  }

  useEffect(() => {
    fetchUserAddresses();
  }, [])

  const subtotal = getCartAmount();
  const discountAmount = Math.floor(subtotal * discount);
  const tax = Math.floor((subtotal - discountAmount) * 0.02);
  const total = subtotal - discountAmount + tax;

  return (
    <div className="w-full md:w-[400px] bg-white border border-cinnamon-primary/10 p-8 rounded-2xl shadow-sm animate-fade-in sticky top-32">
      <h2 className="text-2xl font-serif font-bold text-cinnamon-primary mb-8">
        Order Summary
      </h2>
      
      <div className="space-y-8">
        {!isCheckout && (
          <>
            {/* Email Integration Section */}
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.2em] text-cinnamon-primary/60 font-bold block">
                Contact Information
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none py-3 px-4 rounded-xl border border-cinnamon-primary/10 focus:border-cinnamon-primary transition-all bg-cinnamon-accent/30 text-sm placeholder:text-cinnamon-primary/30"
                required
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.2em] text-cinnamon-primary/60 font-bold block">
                Delivery Address
              </label>
              <div className="relative inline-block w-full text-sm">
                <button
                  className="peer w-full text-left px-4 py-3 bg-cinnamon-accent/30 border border-cinnamon-primary/10 rounded-xl text-cinnamon-primary focus:outline-none focus:border-cinnamon-primary transition-all flex items-center justify-between"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className="truncate pr-4">
                    {selectedAddress
                      ? `${selectedAddress.fullName}, ${selectedAddress.area}`
                      : "Select Address"}
                  </span>
                  <svg className={`w-4 h-4 opacity-40 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <ul className="absolute w-full bg-white border border-cinnamon-primary/10 shadow-2xl mt-2 z-20 rounded-xl overflow-hidden py-2 animate-in fade-in slide-in-from-top-2">
                    {userAddresses.map((address, index) => (
                      <li
                        key={index}
                        className="px-4 py-3 hover:bg-cinnamon-primary/5 cursor-pointer text-cinnamon-primary/80 hover:text-cinnamon-primary transition-colors text-xs"
                        onClick={() => {
                          setSelectedAddress(address);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {address.fullName}, {address.area}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Promo Code Section */}
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.2em] text-cinnamon-primary/60 font-bold block">
                Promo Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="CINNAMON10"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 outline-none py-3 px-4 rounded-xl border border-cinnamon-primary/10 focus:border-cinnamon-primary transition-all bg-cinnamon-accent/30 text-sm placeholder:text-cinnamon-primary/20 uppercase tracking-widest"
                />
                <button 
                  onClick={applyPromo}
                  className="px-4 py-3 bg-cinnamon-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-cinnamon-secondary transition-all"
                >
                  Apply
                </button>
              </div>
            </div>
          </>
        )}

        <div className="space-y-4 border-t border-cinnamon-primary/10 pt-6">
          <div className="flex justify-between text-sm">
            <p className="text-cinnamon-primary/60">Subtotal</p>
            <p className="font-medium text-cinnamon-primary">{currency}{subtotal.toLocaleString()}.00</p>
          </div>
          
          {discount > 0 && (
            <div className="flex justify-between text-sm text-green-700 animate-fade-in">
              <p>Discount (10%)</p>
              <p>-{currency}{discountAmount.toLocaleString()}.00</p>
            </div>
          )}

          
          <div className="flex justify-between text-sm text-cinnamon-primary/60">
            <p>Shipping</p>
            <p className="font-medium text-cinnamon-primary">Rs 299.00</p>
          </div>
          
          <div className="flex justify-between text-sm text-cinnamon-primary/60">
            <p>Tax (2%)</p>
            <p>{currency}{tax.toLocaleString()}.00</p>
          </div>
          
          <div className="flex justify-between items-end pt-4">
            <p className="text-cinnamon-primary/60 text-[10px] uppercase tracking-[0.2em] font-bold">Total</p>
            <p className="text-3xl font-serif font-bold text-cinnamon-primary leading-none">
              {currency}{(total + 299).toLocaleString()}.00
            </p>
          </div>
        </div>
      </div>

      <button 
        onClick={createOrder} 
        className="w-full bg-cinnamon-primary text-white py-4 mt-10 rounded-xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-cinnamon-secondary transition-all shadow-lg shadow-cinnamon-primary/20"
      >
        Complete Order
      </button>
      
      <p className="text-[10px] text-center text-cinnamon-primary/40 mt-6 uppercase tracking-widest font-light">
        Secure SSL Encrypted Checkout
      </p>
    </div>
  );
};

export default OrderSummary;