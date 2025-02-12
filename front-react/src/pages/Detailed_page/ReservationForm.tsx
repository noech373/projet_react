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
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="number" min="1" max={availableSeats} value={seats} onChange={(e) => setSeats(Number(e.target.value))} required />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Réserver</button>
    </form>
  );
};

export default ReservationForm;
