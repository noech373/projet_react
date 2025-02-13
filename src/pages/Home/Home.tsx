import { useState, useMemo, useEffect } from "react";
import { useEvents } from "../../hooks/useEvents";
import EventFilterBar from "../../components/events/EventFilterBar";
import { IEventFilters } from "../../interfaces/EventsFilter.interface";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";
import { Link } from "react-router-dom";
import SearchBar from "../../components/events/SearchBar";
import Pagination from "../../components/common/Pagination";

export const Home = () => {
  const { events, loading, error } = useEvents();
  const [currentPage, setCurrentPage] = useState(1);
  
  const [filters, setFilters] = useState<IEventFilters>({
    searchQuery: "",
    category: "all",
    dateFilter: "all",
    priceSort: "none",
    eventsPerPage: 6 
  });

  const filteredEvents = useMemo(() => {
    let result = [...events];

    // Amélioration du filtre par recherche pour chercher dans plusieurs champs
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter((event) =>
        event.title.toLowerCase().includes(query) ||
        event.description?.toLowerCase().includes(query) ||
        event.location?.toLowerCase().includes(query)
      );
    }

    // Filtre par catégorie
    if (filters.category !== "all") {
      result = result.filter((event) => event.category === filters.category);
    }

    // Filtre par date
    const now = new Date();
    if (filters.dateFilter === "upcoming") {
      result = result.filter((event) => new Date(event.date) > now);
    } else if (filters.dateFilter === "past") {
      result = result.filter((event) => new Date(event.date) < now);
    }

    // Tri par prix
    if (filters.priceSort !== "none") {
      result.sort((a, b) => {
        if (filters.priceSort === "asc") {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
    }

    return result;
  }, [events, filters]);

  // Utiliser filters.eventsPerPage au lieu de ITEMS_PER_PAGE
  const totalPages = Math.ceil(filteredEvents.length / filters.eventsPerPage);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * filters.eventsPerPage,
    currentPage * filters.eventsPerPage
  );

  // Reset la page quand les filtres changent
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Événements à venir
      </h1>
      
      <div className="flex flex-wrap gap-4 items-center">
        <EventFilterBar
          filters={filters}
          onFilterChange={(newFilters) => setFilters(prev => ({ ...prev, ...newFilters }))}
        />
      </div>

      <div className="max-w-2xl mx-auto mb-8">
        <SearchBar 
          value={filters.searchQuery} 
          onChange={(value: string) => setFilters({ ...filters, searchQuery: value })} 
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedEvents.map((event) => (
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

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Home;