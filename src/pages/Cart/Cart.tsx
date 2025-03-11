import { useCart } from "../../contexts/CartContext";
import CartItemComponent from "../../components/cart/CartItem";
import CartTotal from "../../components/CartTotal";
import EventsService from "../../services/api/events.service";
import { useState, useEffect } from "react";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleCheckout = async () => {
    setIsProcessing(true);
    setCheckoutStatus(null);
    
    try {
      // Process each item in the cart
      for (const item of cartItems) {
        // Update available seats for each event
        await EventsService.updateAvailableSeats(item.eventId, item.quantity);
      }
      
      // Clear the cart after successful payment
      clearCart();
      
      // Show success message
      setCheckoutStatus({
        success: true,
        message: 'Paiement réussi ! Places réservées. Merci pour votre achat.'
      });
    } catch (error) {
      console.error('Error during checkout:', error);
      setCheckoutStatus({
        success: false,
        message: 'Une erreur est survenue lors du paiement. Veuillez réessayer.'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Empty cart view with checkout status message if applicable
  if (cartItems.length === 0 && checkoutStatus) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-6">
        <div className={`p-6 rounded-lg text-center max-w-md w-full shadow-lg ${checkoutStatus.success ? 'bg-green-100 text-green-800 border-2 border-green-300' : 'bg-red-100 text-red-800 border-2 border-red-300'}`}>
          <h3 className="text-2xl font-bold mb-2">{checkoutStatus.success ? '✅ Succès!' : '❌ Erreur'}</h3>
          <p className="text-xl">{checkoutStatus.message}</p>
        </div>
        <a 
          href="/"
          className="text-primary-light dark:text-primary-dark hover:underline text-lg font-medium"
        >
          Découvrir nos événements
        </a>
      </div>
    );
  }
  
  // Regular empty cart view
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
      
      {checkoutStatus && (
        <div className={`p-5 rounded-lg text-center text-lg font-medium mb-6 shadow-md ${checkoutStatus.success ? 'bg-green-100 text-green-800 border-2 border-green-300' : 'bg-red-100 text-red-800 border-2 border-red-300'}`}>
          <h3 className="text-xl font-bold mb-2">{checkoutStatus.success ? '✅ Succès!' : '❌ Erreur'}</h3>
          <p>{checkoutStatus.message}</p>
        </div>
      )}
      
      <button
        className="w-full md:w-auto bg-primary-light hover:bg-primary-dark text-white font-medium py-2 px-8 rounded-md transition-colors"
        onClick={handleCheckout}
        disabled={isProcessing}
      >
        {isProcessing ? 'Traitement en cours...' : 'Procéder au paiement'}
      </button>
    </div>
  );
};

export default Cart;