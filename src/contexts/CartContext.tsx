import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem } from "../interfaces/Cart.interface";

type CartContextType = {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (eventId: string) => void;
    updateQuantity: (eventId: string, quantity: number) => void;
};

const CartContext = createContext<CartContextType | null>(null);


export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item: CartItem) => {
        const existingItem = cartItems.find((cartItem) => cartItem.eventId === item.eventId);
        if (existingItem) {
            updateQuantity(item.eventId, existingItem.quantity + item.quantity);
        } else {
            setCartItems((prev) => [...prev, item]);
        }
    };

    const removeFromCart = (eventId: string) => {
        setCartItems((prev) => prev.filter((item) => item.eventId !== eventId));
    };

    const updateQuantity = (eventId: string, quantity: number) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.eventId === eventId ? { ...item, quantity } : item
            )
        );
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};