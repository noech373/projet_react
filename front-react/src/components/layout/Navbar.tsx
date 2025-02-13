import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">
            EventPlatform, la plateforme de réservation d'événements
          </Link>
          <div className="flex space-x-4">
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              Accueil     
            </Link>
            <Link to="/cart" className="text-gray-600 hover:text-gray-900">
              Panier
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;