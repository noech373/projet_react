import {useEffect} from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Layout } from './components/layout/Layout';

function App() {
  
  useEffect(() => {
      fetch('http://localhost:3000/posts')
            .then(response => response.json())
            .then(data => console.log(data));
  }, []);

  return (
    <div>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Layout>
      </Router>
      
    </div>
  );
}

export default App;