import { FC } from 'react';
import EventCard from '../EventCard'
import { IEvent } from '../../../interfaces/Event.interface';

interface EventListProps {
  events: IEvent[];
  onEventSelect: (eventId: string) => void;
}

export const EventList: FC<EventListProps> = ({ events, onEventSelect }) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Aucun événement trouvé</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onSelect={() => onEventSelect(event.id)}
        />
      ))}
    </div>
  );
};
export default EventList;