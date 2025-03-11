import React from 'react';
import { IEvent } from '../../interfaces/Event.interface';

interface CalendarDayCellProps {
  date: Date | null;
  events: IEvent[];
  onEventClick: (event: IEvent) => void;
}

const CalendarDayCell: React.FC<CalendarDayCellProps> = ({ date, events, onEventClick }) => {
  if (!date) {
    return (
      <div className="min-h-[100px] border p-1 bg-gray-100 dark:bg-gray-600"></div>
    );
  }

  const isToday = date.toDateString() === new Date().toDateString();

  return (
    <div
      className={`min-h-[100px] border p-1 relative bg-gray-50 dark:bg-gray-700 ${
        isToday ? 'ring-2 ring-blue-500' : ''
      }`}
    >
      <div className="text-right text-sm mb-1">
        {date.getDate()}
      </div>
      <div className="space-y-1 max-h-[80px] overflow-y-auto">
        {events.map(event => (
          <div
            key={event.id}
            className={`text-xs p-1 rounded cursor-pointer hover:opacity-80 ${
              event.category === 'music'
                ? 'bg-purple-100 dark:bg-purple-800'
                : 'bg-green-100 dark:bg-green-800'
            }`}
            onClick={() => onEventClick(event)}
            title={event.title}
          >
            <span className="whitespace-normal text-overflow-clip">{event.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarDayCell;