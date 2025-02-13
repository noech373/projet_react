import React, { useState, useEffect } from 'react';
import { IEvent } from '../../interfaces/Event.interface';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import EventPopupPreview from './EventPopupPreview';

interface CalendarProps {
  events: IEvent[];
}

const Calendar: React.FC<CalendarProps> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [hoveredEvent, setHoveredEvent] = useState<IEvent | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handleDateClick = (date: Date) => {
    // Formatons les dates pour une comparaison plus fiable
    const clickedDate = format(date, 'yyyy-MM-dd');
    
    const eventsOnDate = events.filter(event => {
      const eventDate = format(new Date(event.date), 'yyyy-MM-dd');
      return eventDate === clickedDate;
    });

    if (eventsOnDate.length > 0) {
      console.log('Event found:', eventsOnDate[0]);
      setSelectedEvent(eventsOnDate[0]);
    } else {
      setSelectedEvent(null);
    }
  };

  // Vérifions si un jour a un événement
  const hasEventOnDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return events.some(event => format(new Date(event.date), 'yyyy-MM-dd') === dateStr);
  };

  // Ajout d'un effet pour vérifier les changements d'événement sélectionné
  useEffect(() => {
    console.log('Selected event changed:', selectedEvent);
  }, [selectedEvent]);

  useEffect(() => {
    console.log('Calendar received events:', events);
  }, [events]);

  const handlePrevMonth = () => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  const handleNextMonth = () => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));

  const handleMouseEnter = (date: Date, event: React.MouseEvent<HTMLButtonElement>) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const eventOnDate = events.find(event => 
      format(new Date(event.date), 'yyyy-MM-dd') === dateStr
    );
    
    if (eventOnDate) {
      const rect = event.currentTarget.getBoundingClientRect();
      setPopupPosition({
        x: rect.left + rect.width / 2,
        y: rect.top
      });
      setHoveredEvent(eventOnDate);
    }
  };

  const handleMouseLeave = () => {
    setHoveredEvent(null);
  };

  return (
    <div className="relative">
      <div className="space-y-4">
        <div className="calendar-container bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 rounded">←</button>
            <h2 className="text-lg font-semibold">{format(currentDate, 'MMMM yyyy', { locale: fr })}</h2>
            <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded">→</button>
          </div>
          
          {/* Ajout des jours de la semaine */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {daysInMonth.map((day) => {
              const hasEvent = hasEventOnDate(day);
              
              return (
                <button
                  key={day.toString()}
                  onMouseEnter={(event) => handleMouseEnter(day, event)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleDateClick(day)}
                  className={`
                    p-2 text-center rounded transition-colors
                    ${hasEvent ? 'bg-primary-light dark:bg-primary-dark text-white hover:opacity-90' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
                    active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-light
                  `}
                >
                  {format(day, 'd', { locale: fr })}
                </button>
              );
            })}
          </div>
        </div>

        {hoveredEvent && (
          <EventPopupPreview 
            event={hoveredEvent} 
            position={popupPosition}
          />
        )}
      </div>

      {selectedEvent && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold mb-4">Événement sélectionné :</h3>
          <EventPopupPreview 
            event={selectedEvent} 
            position={{ x: 0, y: 0 }}
          />
        </div>
      )}
    </div>
  );
};

export default Calendar; 