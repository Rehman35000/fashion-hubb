'use client'
import { productsDummyData, userDummyData } from "@/assets/assets";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppContextProvider = (props) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY
    const router = useRouter()

    const [products, setProducts] = useState([])
    const [userData, setUserData] = useState(false)
    const [isSeller, setIsSeller] = useState(true)
    const [cartItems, setCartItems] = useState({})
    const [orders, setOrders] = useState([])

    const fetchProductData = async () => {
        setProducts(productsDummyData)
    }

    const fetchUserData = async () => {
        setUserData(userDummyData)
    }

    // itemId = product._id, size & color are optional variant info
    const addToCart = async (itemId, size = '', color = '') => {
        const key = size || color ? `${itemId}__${size}__${color}` : itemId;
        let cartData = structuredClone(cartItems);
        if (cartData[key]) {
            cartData[key] = { ...cartData[key], quantity: cartData[key].quantity + 1 };
        } else {
            cartData[key] = { productId: itemId, quantity: 1, size, color };
        }
        setCartItems(cartData);
    }

    const updateCartQuantity = async (key, quantity) => {
        let cartData = structuredClone(cartItems);
        if (quantity === 0) {
            delete cartData[key];
        } else {
            cartData[key] = { ...cartData[key], quantity };
        }
        setCartItems(cartData);
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const key in cartItems) {
            const item = cartItems[key];
            if (item && item.quantity > 0) {
                totalCount += item.quantity;
            }
        }
        return totalCount;
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const key in cartItems) {
            const item = cartItems[key];
            const product = products.find(p => p._id === item.productId);
            if (product && item.quantity > 0) {
                totalAmount += product.offerPrice * item.quantity;
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }

    useEffect(() => {
        const storedCart = localStorage.getItem('fashion_hubb_cart');
        const storedOrders = localStorage.getItem('fashion_hubb_orders');
        if (storedCart) setCartItems(JSON.parse(storedCart));
        if (storedOrders) setOrders(JSON.parse(storedOrders));
        fetchProductData()
        fetchUserData()
    }, [])

    useEffect(() => {
        localStorage.setItem('fashion_hubb_cart', JSON.stringify(cartItems));
    }, [cartItems])

    useEffect(() => {
        localStorage.setItem('fashion_hubb_orders', JSON.stringify(orders));
    }, [orders])

    const value = {
        currency, router,
        isSeller, setIsSeller,
        userData, fetchUserData,
        products, fetchProductData,
        cartItems, setCartItems,
        orders, setOrders,
        addToCart, updateCartQuantity,
        getCartCount, getCartAmount
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}