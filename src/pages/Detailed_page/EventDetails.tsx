import React from "react";

interface EventDetailsProps {
  event: {
    image: string;
    title: string;
    description: string;
    location: string;
    date: string;
    organizer: string;
    availableSeats: number;
  };
}

const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
  return (
    <div className="text-gray-900">
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p><strong>Lieu :</strong> {event.location}</p>
      <p><strong>Date :</strong> {event.date}</p>
      <p><strong>Organisateur :</strong> {event.organizer}</p>
      <p><strong>Places disponibles :</strong> {event.availableSeats}</p>
    </div>
  );
};

export default EventDetails;
