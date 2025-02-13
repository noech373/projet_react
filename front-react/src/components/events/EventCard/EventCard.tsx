import { FC } from 'react';
import { IEvent } from '../../../interfaces/Event.interface';

interface EventCardProps {
  event: IEvent;
  onSelect: (id: string) => void;
}

export const EventCard: FC<EventCardProps> = ({ event, onSelect }) => {
  return (
    <div className="event-card" onClick={() => onSelect(event.id)}>
      <img src={event.image} alt={event.title} />
      <h3>{event.title}</h3>
      <p>{new Date(event.date).toLocaleDateString()}</p>
      <p>{event.location}</p>
      <p>{event.price}€</p>
    </div>
  );
};
export default EventCard;