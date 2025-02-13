import { useCart } from "../../contexts/CartContext";
import CartItemComponent from "../../components/cart/CartItem";
import CartTotal from "../../components/CartTotal";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Votre panier est vide
        </p>
        <a 
          href="/"
          className="text-primary-light dark:text-primary-dark hover:underline"
        >
          Découvrir nos événements
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Votre Panier
      </h2>
      
      <div className="space-y-4">
        {cartItems.map((item) => (
          <CartItemComponent
            key={item.eventId}
            item={item}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
          />
        ))}
      </div>

      <CartTotal cartItems={cartItems} />
      
      <button
        className="w-full md:w-auto bg-primary-light hover:bg-primary-dark text-white font-medium py-2 px-8 rounded-md transition-colors"
      >
        Procéder au paiement
      </button>
    </div>
  );
};

export default Cart;