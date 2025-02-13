import styles from "./CartItem.styles";
import { CartItem as CartItemInterface } from "../../interfaces/Cart.interface";

const CartItem = ({ item, onUpdateQuantity, onRemove }: { item: CartItemInterface; onUpdateQuantity: (eventId: string, quantity: number) => void; onRemove: (eventId: string) => void }) => {
    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const quantity = parseInt(e.target.value);
        if (!isNaN(quantity)) onUpdateQuantity(item.eventId, quantity);
    };

    return (
        <div style={{...styles.container, color: '#000000'}}>
            <h3>{item.eventTitle}</h3>
            <p>Date: {item.eventDate}</p>
            <p>Prix unitaire: {item.price}€</p>
            <input type="number" value={item.quantity} min="1" onChange={handleQuantityChange} />
            <button onClick={() => onRemove(item.eventId)}>Supprimer</button>
        </div>
    );
};

export default CartItem;
