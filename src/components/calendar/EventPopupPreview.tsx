import React from 'react';
import { Link } from 'react-router-dom';
import { IEvent } from '../../interfaces/Event.interface';

interface EventPopupPreviewProps {
  event: IEvent;
  position: { x: number; y: number };
}

const EventPopupPreview: React.FC<EventPopupPreviewProps> = ({ event, position }) => {
  return (
    <div 
      className="fixed z-50 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        transform: 'translate(-50%, 20px)'
      }}
    >
      <div className="relative">
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
      
      <div className="p-4">
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {event.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Prix:</span>
            <span className="ml-2 text-lg font-bold text-primary-light dark:text-primary-dark">
              {event.price}€
            </span>
          </div>
          <Link
            to={`/event/${event.id}`}
            className="px-4 py-2 bg-primary-light hover:bg-primary-dark text-white rounded-md transition-colors"
          >
            Plus de détails
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventPopupPreview; 