import { useEvents } from "../../hooks/useEvents";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";
import SearchBar from "../../components/events/SearchBar";
import { useState, useMemo } from "react";

export const Home = () => {
  const { events, loading, error } = useEvents();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = useMemo(() => {
    if (!searchQuery.trim()) return events;
    
    const query = searchQuery.toLowerCase();
    return events.filter((event) => 
      event.title.toLowerCase().includes(query) ||
      event.description?.toLowerCase().includes(query) ||
      event.location?.toLowerCase().includes(query)
    );
  }, [events, searchQuery]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Événements à venir
      </h1>
      
      <div className="max-w-2xl mx-auto mb-8">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div 
            key={event.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
          >
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-3">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {event.title}
              </h2>
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-300">
                  {event.date} - {event.location}
                </p>
                <p className="text-lg font-bold text-primary-light dark:text-primary-dark">
                  {event.price}€
                </p>
              </div>
              <Link
                to={`/event/${event.id}`}
                className="block w-full text-center bg-primary-light hover:bg-primary-dark text-black hover:text-white dark:bg-primary-dark dark:hover:bg-primary-light dark:text-black dark:hover:text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Voir Détails
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};