import { CartItem } from "../../interfaces/Cart.interface";
import styles from "./CartTotal.styles";

const CartTotal = ({ cartItems }: { cartItems: CartItem[] }) => {
    const total = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

    return (
        <div style={styles.container}>
            <h3>Total : {total}€</h3>
        </div>
    );
};

export default CartTotal;