import { useState, useEffect } from 'react';
import EventList from '../../components/events/EventList';
import  EventFilter from '../../components/events/EventFilter';
import  SearchBar  from '../../components/events/SearchBar';
import  {useEvents } from '../../hooks/useEvents';
import { IEvent } from '../../interfaces/Event.interface';
import { IEventFilters } from '../../interfaces/EventsFilter.interface';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import  ErrorMessage  from '../../components/common/ErrorMessage';

const initialFilters: IEventFilters = {
  searchQuery: '',
  category: 'all',
  dateFilter: 'all',
  priceSort: 'none'
};

export const Home = () => {
  const { events, loading, error } = useEvents();
  const [filteredEvents, setFilteredEvents] = useState<IEvent[]>([]);
  const [filters, setFilters] = useState<IEventFilters>(initialFilters);

  useEffect(() => {
    if (!events) return;

    let filtered = [...events];

    // Appliquer les filtres
    if (filters.searchQuery) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    if (filters.category !== 'all') {
      filtered = filtered.filter(event => 
        event.category === filters.category
      );
    }

    const now = new Date();
    if (filters.dateFilter === 'upcoming') {
      filtered = filtered.filter(event => new Date(event.date) > now);
    } else if (filters.dateFilter === 'past') {
      filtered = filtered.filter(event => new Date(event.date) <= now);
    }

    if (filters.priceSort !== 'none') {
      filtered.sort((a, b) => {
        return filters.priceSort === 'asc' 
          ? a.price - b.price 
          : b.price - a.price;
      });
    }

    setFilteredEvents(filtered);
  }, [events, filters]);

  const handleFilterChange = (newFilters: Partial<IEventFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  const handleEventSelect = (eventId: string) => {
    // Navigation vers la page détaillée de l'événement
    window.location.href = `/event/${eventId}`;
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Découvrez nos événements
      </h1>

      <div className="mb-8">
        <SearchBar 
          value={filters.searchQuery}
          onChange={(value) => handleFilterChange({ searchQuery: value })}
        />
      </div>

      <div className="mb-8">
        <EventFilter 
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      </div>

      <EventList 
        events={filteredEvents}
        onEventSelect={handleEventSelect}
      />
    </div>
  );
};

export default Home;