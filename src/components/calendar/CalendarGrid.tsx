import React from 'react';
import { IEvent } from '../../interfaces/Event.interface';
import CalendarDayCell from '../calendar/CalendarDayCell';

interface CalendarGridProps {
  currentDate: Date;
  filteredEvents: IEvent[];
  onEventClick: (event: IEvent) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  filteredEvents,
  onEventClick
}) => {
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    // Ajouter les jours du mois précédent
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    // Ajouter les jours du mois en cours
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const getEventsForDate = (date: Date) => {
    if (!date) return [];
    return filteredEvents.filter(event => 
      new Date(event.date).toISOString().split('T')[0] === date.toISOString().split('T')[0]
    );
  };

  return (
    <div className="grid grid-cols-7 gap-1">
      {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(day => (
        <div key={day} className="text-center font-semibold p-2">
          {day}
        </div>
      ))}
      
      {getDaysInMonth(currentDate).map((date, index) => (
        <CalendarDayCell 
          key={index}
          date={date}
          events={date ? getEventsForDate(date) : []}
          onEventClick={onEventClick}
        />
      ))}
    </div>
  );
};

export default CalendarGrid;