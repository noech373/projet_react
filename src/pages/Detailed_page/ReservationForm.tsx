import React, { useState } from "react";

interface ReservationFormProps {
  availableSeats: number;
  onReserve: (name: string, email: string, seats: number) => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ availableSeats, onReserve }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [seats, setSeats] = useState(1);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (seats > availableSeats) {
      setError("Nombre de places insuffisant !");
      return;
    }
    setError("");
    onReserve(name, email, seats);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6">
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
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
      
      <button 
        type="submit" 
        className="w-full px-4 py-3 mt-6 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        Réserver maintenant
      </button>
    </form>
  );
};

export default ReservationForm;
