import React from "react";
import { Link } from "react-router-dom";
import { events } from "../../data/Event"; // Import de la liste d'événements

const EventList: React.FC = () => {
  return (
    <div>
      <h1>Événements à venir</h1>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {events.map((event) => (
          <div key={event.id} style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "10px", width: "300px" }}>
            <img src={event.image} alt={event.title} style={{ width: "100%", borderRadius: "5px" }} />
            <h2>{event.title}</h2>
            <p>{event.date} - {event.location}</p>
            <p><strong>Places disponibles :</strong> {event.availableSeats}</p>
            <Link to={`/event/${event.id}`} style={{ textDecoration: "none", color: "white", background: "blue", padding: "10px", borderRadius: "5px", display: "inline-block" }}>
              Voir Détails
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
