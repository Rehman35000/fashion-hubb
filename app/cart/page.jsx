'use client'
import React from "react";
import toast from "react-hot-toast";
import { assets } from "@/assets/assets";
import CheckoutForm from "@/components/CheckoutForm";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

import CheckoutSidebar from "@/components/CheckoutSidebar";

const Cart = () => {
  const { products, router, cartItems, addToCart, updateCartQuantity, getCartCount, currency, getCartAmount, setCartItems, orders, setOrders } = useAppContext();
  const [isCheckoutMode, setIsCheckoutMode] = React.useState(false);

  // Form State
  const [formData, setFormData] = React.useState({
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      apartment: '',
      city: '',
      postalCode: '',
      phone: '',
      billingSameAsShipping: true
  });
  const [paymentMethod, setPaymentMethod] = React.useState('COD');

  const completeOrder = async () => {
    // Validation
    if (!formData.email || !formData.firstName || !formData.address || !formData.city || !formData.phone) {
        toast.error("Please fill in all required shipping details");
        return;
    }

    const orderPromise = async () => {
      // Build enriched items array with all product details
      const enrichedItems = Object.keys(cartItems).map(key => {
        const cartItem = cartItems[key];
        const product = products.find(p => p._id === cartItem.productId);
        return {
          _id: cartItem.productId,
          name: product ? product.name : 'Unknown Item',
          category: product ? product.category : '',
          price: product ? product.offerPrice : 0,
          quantity: cartItem.quantity,
          size: cartItem.size || 'N/A',
          color: cartItem.color || 'N/A',
        };
      });

      try {
        await fetch('/api/order/email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email, 
            address: { ...formData, fullName: `${formData.firstName} ${formData.lastName}` },
            orderDetails: {
              amount: getCartAmount() + 299,
              items: getCartCount(),
            },
            items: enrichedItems
          })
        });
      } catch (err) {
        console.warn("Email API failed or not configured, but proceeding with order locally", err);
      }
      
      const newOrder = {
         _id: `ORD${Date.now()}`,
         items: enrichedItems,
         amount: getCartAmount() + 299,
         address: { ...formData, fullName: `${formData.firstName} ${formData.lastName}` },
         date: new Date().toLocaleDateString(),
         status: 'Processing',
         payment: paymentMethod
      };

      setOrders([newOrder, ...orders]);
      setCartItems({}); // Clear cart
      router.push('/order-placed');
      return "Order confirmed successfully!";
    };

    toast.promise(orderPromise(), {
      loading: 'Processing your order...',
      success: (data) => data,
      error: (err) => err.message || 'Something went wrong. Please try again.',
    });
  }

  if (isCheckoutMode) {
    return (
      <div className="flex flex-col md:flex-row min-h-screen bg-white">
         {/* Left Side: Checkout Form */}
         <div className="flex-1 px-6 md:px-16 lg:px-32 py-16 animate-fade-in">
            <div className="max-w-xl ml-auto w-full">
                <button 
                  onClick={() => setIsCheckoutMode(false)}
                  className="mb-12 flex items-center gap-2 text-[10px] uppercase tracking-widest text-cinnamon-primary/40 hover:text-cinnamon-primary transition-colors font-bold"
                >
                  ← Back to Bag
                </button>
                <div className="mb-12">
                   <h1 className="text-3xl font-serif font-bold text-cinnamon-primary">Fashion Hubb</h1>
                </div>
                
                <CheckoutForm 
                  formData={formData} 
                  setFormData={setFormData}
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                />

                <button 
                  onClick={completeOrder}
                  className="w-full mt-12 py-5 bg-black text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-neutral-800 transition-all duration-300 shadow-xl shadow-black/10"
                >
                  Complete Order
                </button>
            </div>
         </div>

         {/* Right Side: Order Review */}
         <div className="md:w-[45%] lg:w-[40%] animate-fade-in">
            <CheckoutSidebar />
         </div>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row gap-12 px-6 md:px-16 lg:px-32 pt-16 pb-32 bg-cinnamon-accent/5 min-h-screen">
        <div className="flex-1">
            <div className="animate-fade-in">
              <div className="flex flex-col gap-2 mb-12">
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-cinnamon-primary">
                  Shopping Bag
                </h1>
                <p className="text-sm tracking-widest uppercase text-cinnamon-primary/60">{getCartCount()} Items</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead className="text-left border-b border-cinnamon-primary/10">
                    <tr>
                      <th className="pb-6 text-xs uppercase tracking-widest text-cinnamon-primary/40 font-bold">
                        Product
                      </th>
                      <th className="pb-6 text-xs uppercase tracking-widest text-cinnamon-primary/40 font-bold px-4">
                        Price
                      </th>
                      <th className="pb-6 text-xs uppercase tracking-widest text-cinnamon-primary/40 font-bold px-4">
                        Qty
                      </th>
                      <th className="pb-6 text-xs uppercase tracking-widest text-cinnamon-primary/40 font-bold px-4">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cinnamon-primary/5">
                    {Object.keys(cartItems).map((key) => {
                      const cartItem = cartItems[key];
                      const product = products.find(p => p._id === cartItem.productId);

                      if (!product || cartItem.quantity <= 0) return null;

                      return (
                        <tr key={key} className="group">
                          <td className="py-8 pr-4">
                            <div className="flex items-center gap-6">
                              <div className="rounded-2xl overflow-hidden bg-white border border-cinnamon-primary/5 p-2 w-20 h-24 flex-shrink-0 shadow-sm transition-transform group-hover:scale-105 duration-500">
                                <Image
                                  src={product.image[0]}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                  width={400}
                                  height={500}
                                />
                              </div>
                              <div className="flex flex-col gap-1">
                                <p className="text-sm md:text-base font-serif font-semibold text-cinnamon-primary">{product.name}</p>
                                {cartItem.size && cartItem.size !== '' && (
                                  <p className="text-xs text-cinnamon-primary/50">Size: <span className="font-medium text-cinnamon-primary">{cartItem.size}</span></p>
                                )}
                                {cartItem.color && cartItem.color !== '' && (
                                  <p className="text-xs text-cinnamon-primary/50">Color: <span className="font-medium text-cinnamon-primary">{cartItem.color}</span></p>
                                )}
                                <p className="text-xs text-cinnamon-primary/40">{product.category}</p>
                                <button
                                  className="text-[10px] uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors mt-2 font-bold"
                                  onClick={() => updateCartQuantity(key, 0)}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </td>
                          <td className="py-8 px-4 text-sm text-cinnamon-primary/80">
                            {currency}{product.offerPrice.toLocaleString()}.00
                          </td>
                          <td className="py-8 px-4">
                            <div className="flex items-center gap-3 bg-white rounded-full px-3 py-1.5 border border-cinnamon-primary/10 w-fit">
                              <button 
                                className="w-5 h-5 flex items-center justify-center hover:bg-cinnamon-primary/5 rounded-full transition-colors"
                                onClick={() => updateCartQuantity(key, cartItem.quantity - 1)}
                              >
                                <span className="text-cinnamon-primary opacity-60">−</span>
                              </button>
                              <span className="text-sm font-medium w-4 text-center">{cartItem.quantity}</span>
                              <button 
                                 className="w-5 h-5 flex items-center justify-center hover:bg-cinnamon-primary/5 rounded-full transition-colors"
                                 onClick={() => updateCartQuantity(key, cartItem.quantity + 1)}
                              >
                                 <span className="text-cinnamon-primary opacity-60">+</span>
                              </button>
                            </div>
                          </td>
                          <td className="py-8 px-4 text-sm font-semibold text-cinnamon-primary">
                            {currency}{(product.offerPrice * cartItem.quantity).toLocaleString()}.00
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-between items-center mt-12">
                <button 
                  onClick={()=> router.push('/all-products')} 
                  className="group flex items-center gap-3 text-xs uppercase tracking-widest text-cinnamon-primary font-bold hover:gap-5 transition-all"
                >
                  <div className="w-8 h-[1px] bg-cinnamon-primary group-hover:w-12 transition-all"></div>
                  Continue Shopping
                </button>

                <button 
                  onClick={() => setIsCheckoutMode(true)}
                  className="px-12 py-5 bg-cinnamon-primary text-white text-xs font-bold uppercase tracking-[0.2em] rounded-2xl hover:bg-cinnamon-secondary transition-all duration-300 shadow-xl shadow-cinnamon-primary/20"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
