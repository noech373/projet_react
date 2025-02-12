import { CartItem } from "../../interfaces/Cart.interface";
import CartItemComponent from "../../components/cart/CartItem";
import CartTotal from "../../components/CartTotal";
import styles from "./Cart.styles";
import * as React from "react";

const Cart = () => {
    const [cartItems, setCartItems] = React.useState<CartItem[]>([]);

    const handleUpdateQuantity = (eventId: string, quantity: number) => {
        setCartItems((prev) => prev.map((item) => (item.eventId === eventId ? { ...item, quantity } : item)));
    };

    const handleRemoveItem = (eventId: string) => {
        setCartItems((prev) => prev.filter((item) => item.eventId !== eventId));
    };

    return (
        <div style={styles.container}>
            <h2>Votre Panier</h2>
            {cartItems.map((item) => (
                <CartItemComponent key={item.eventId} item={item} onUpdateQuantity={handleUpdateQuantity} onRemove={handleRemoveItem} />
            ))}
            <CartTotal cartItems={cartItems} />
        </div>
    );
};

export default Cart;