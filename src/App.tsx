import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Layout } from './components/layout/Layout';
import DetailedPage from './pages/Detailed_page/Detailed_page';
import Cart from './pages/Cart/Cart';
import { CartProvider } from './contexts/CartContext';
import Calendar from './pages/Calendar/Calendar';

function App() {
  return (
    <CartProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/event/:id" element={<DetailedPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/calendar" element={<Calendar />} />
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  );
}

export default App;