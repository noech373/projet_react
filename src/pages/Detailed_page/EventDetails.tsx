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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="space-y-6">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-96 object-cover rounded-lg shadow-md"
        />
        
        <h1 className="text-3xl font-bold text-gray-800 mt-6">{event.title}</h1>
        
        <p className="text-gray-600 text-lg leading-relaxed">
          {event.description}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              <p className="text-sm text-gray-500">Lieu</p>
              <p className="font-medium text-gray-800">{event.location}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium text-gray-800">{event.date}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <div>
              <p className="text-sm text-gray-500">Organisateur</p>
              <p className="font-medium text-gray-800">{event.organizer}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
            <div>
              <p className="text-sm text-gray-500">Places disponibles</p>
              <p className="font-medium text-gray-800">{event.availableSeats}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
