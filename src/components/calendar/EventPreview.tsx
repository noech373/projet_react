import { IEvent } from '../../interfaces/Event.interface';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import React, { useState } from 'react';
import CheckoutSteps, { CheckoutFormData } from './CheckoutSteps';
import { motion, AnimatePresence } from 'framer-motion';

interface EventPreviewProps {
    event: IEvent | null;
    onClose: () => void;
}

const EventPreview: React.FC<EventPreviewProps> = ({ event, onClose }) => {
    if (!event) return null;

    const { addToCart } = useCart();
    const [addedToCart, setAddedToCart] = useState(false);
    
    const handleCheckoutComplete = (formData: CheckoutFormData) => {
        addToCart({
            eventId: event.id,
            eventTitle: event.title,
            eventDate: event.date,
            quantity: formData.quantity,
            price: event.price
        });
        setAddedToCart(true);
        // Close the popup after showing the success animation
        setTimeout(() => {
            setAddedToCart(false);
            onClose();
        }, 1500); // Show animation for 1.5 seconds before closing
    };
    

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-lg w-full">
                <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden max-w-full">
                    <div className="relative">
                        <button
                            onClick={onClose}
                            className="absolute top-2 right-2 z-10 w-8 h-8 flex items-center justify-center bg-gray-800/50 hover:bg-gray-800/75 text-white rounded-full transition-colors"
                        >
                            ✕
                        </button>
                        <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                            <h3 className="text-xl font-bold text-white">
                                {event.title}
                            </h3>
                            <p className="text-white/90">
                                {new Date(event.date).toLocaleDateString('fr-FR')}
                            </p>
                        </div>
                    </div>

                    <div className="p-4 relative">
                        <p className="text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
                            {event.description}
                        </p>
                        <Link
                            to={`/event/${event.id}`}
                            className="px-3 py-1 text-sm text-primary-light dark:text-primary-dark hover:underline flex items-center gap-1 mb-7"
                        >
                            <span>Voir détails</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                        
                        {/* Success animation overlay */}
                        <AnimatePresence>
                            {addedToCart && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.3 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.3 }}
                                    className="absolute inset-0 flex items-center justify-center bg-white/90 dark:bg-gray-800/90 rounded-lg z-10"
                                >
                                    <div className="text-center">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 0.6 }}
                                            className="mx-auto mb-4 text-green-500 text-5xl"
                                        >
                                            ✓
                                        </motion.div>
                                        <p className="text-lg font-medium text-green-600 dark:text-green-400">Ajouté au panier!</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        
                        <div className="w-full flex justify-between items-center">
                            <CheckoutSteps 
                                onComplete={handleCheckoutComplete}
                                price={event.price}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventPreview;