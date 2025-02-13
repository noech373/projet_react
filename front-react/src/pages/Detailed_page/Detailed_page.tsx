import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { events } from "../../data/Event"; // Import de la liste d'événements
import EventDetails from "./EventDetails";
import ReservationForm from "./ReservationForm";

const DetailedPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const event = events.find(e => e.id === parseInt(id || "0"));

  const [availableSeats, setAvailableSeats] = useState(event ? event.availableSeats : 0);

  if (!event) return <p>Événement introuvable</p>;

  const handleReservation = (name: string, email: string, seats: number) => {
    alert(`Réservation confirmée pour ${name} (${email}), ${seats} place(s) !`);
    setAvailableSeats(availableSeats - seats);
  };

  return (
    <div>
      <EventDetails event={{ ...event, availableSeats }} />
      <ReservationForm availableSeats={availableSeats} onReserve={handleReservation} />
    </div>
  );
};

export default DetailedPage;
