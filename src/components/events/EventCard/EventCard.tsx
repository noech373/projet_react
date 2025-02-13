import { FC } from 'react';
import { IEvent } from '../../../interfaces/Event.interface';

interface EventCardProps {
  event: IEvent;
  onSelect: (id: string) => void;
}

export const EventCard: FC<EventCardProps> = ({ event, onSelect }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform hover:-translate-y-1 cursor-pointer"
      onClick={() => onSelect(event.id)}
    >
      <div className="aspect-video w-full">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-1">
          {event.title}
        </h3>
        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm">
              {new Date(event.date).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm line-clamp-1">
              {event.location}
            </span>
          </div>
          <div className="pt-2">
            <span className="text-blue-600 font-bold text-lg">
              {event.price}€
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;