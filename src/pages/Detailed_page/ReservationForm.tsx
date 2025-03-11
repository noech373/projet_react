import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ReservationFormProps {
  availableSeats: number;
  onReserve: (name: string, email: string, seats: number) => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ availableSeats, onReserve }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [seats, setSeats] = useState(1);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vérification du nombre de places
    if (seats > availableSeats) {
      setError(`Désolé, il ne reste que ${availableSeats} place(s) disponible(s)`);
      return;
    }
    
    if (seats <= 0) {
      setError("Le nombre de places doit être supérieur à 0");
      return;
    }

    setError("");
    setShowSuccess(true);
    
    // Animation de succès pendant 1.5 secondes avant d'appeler onReserve
    setTimeout(() => {
      onReserve(name, email, seats);
      setShowSuccess(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 relative">
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 font-medium text-gray-700">
          Nom
        </label>
        <input 
          id="name"
          type="text" 
          placeholder="Entrez votre nom" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
          Email
        </label>
        <input 
          id="email"
          type="email" 
          placeholder="Entrez votre email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="seats" className="block mb-2 font-medium text-gray-700">
          Nombre de places ({availableSeats} disponibles)
        </label>
        <input 
          id="seats"
          type="number" 
          min="1" 
          max={availableSeats} 
          value={seats} 
          onChange={(e) => setSeats(Number(e.target.value))} 
          required 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
        />
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-red-600"
        >
          {error}
        </motion.p>
      )}

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.3 }}
            className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 rounded-lg"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="mx-auto mb-4 text-green-500 text-4xl"
              >
                ✓
              </motion.div>
              <p className="text-lg font-medium text-green-600">Réservation en cours...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        type="submit" 
        disabled={showSuccess}
        className="w-full px-4 py-3 mt-6 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
      >
        {showSuccess ? "Ajout en cours..." : "Ajouter au panier"}
      </button>
    </form>
  );
};

export default ReservationForm;
