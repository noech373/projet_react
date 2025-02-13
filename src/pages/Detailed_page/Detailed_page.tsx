import React from "react";
import { useParams } from "react-router-dom";
import { useEvents } from "../../hooks/useEvents";
import EventDetails from "./EventDetails";
import ReservationForm from "./ReservationForm";
import { useCart } from "../../contexts/CartContext";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";

const DetailedPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { events, loading, error } = useEvents();
  const { addToCart } = useCart();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  const event = events.find(e => e.id === id);

  if (!event) {
    return <ErrorMessage message="Événement introuvable" />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg p-6">
        <EventDetails event={event} />
        <div className="lg:border-l lg:pl-8">
          <ReservationForm 
            availableSeats={event.availableSeats}
            onReserve={(name, email, seats) => {
              addToCart({
                eventId: event.id,
                eventTitle: event.title,
                eventDate: event.date,
                quantity: seats,
                price: event.price
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailedPage;