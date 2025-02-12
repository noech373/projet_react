import { useState, useEffect } from 'react';
import { IEvent } from '../interfaces/Event.interface';
import { EventsService } from '../services/api/events.service';

interface UseEventsReturn {
  events: IEvent[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useEvents = (): UseEventsReturn => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await EventsService.getAll();
      setEvents(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return { events, loading, error, refetch: fetchEvents };
};