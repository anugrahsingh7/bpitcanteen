import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Snacks from './pages/Snacks';
import Cart from './pages/Cart';
import Breakfast from './pages/Breakfast';
import Lunch from './pages/Lunch';
import Dinner from './pages/Dinner';
import Beverages from './pages/Beverages';
import AppLayout from './ui/AppLayout';
import PageNotFound from './pages/PageNotFound';


function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<AppLayout />} >
              <Route path="/snacks" element={<Snacks />}/>
              <Route path="/cart" element={<Cart />} /> 
              <Route path="/breakfast" element={<Breakfast />} /> 
              <Route path="/lunch" element={<Lunch />} /> 
              <Route path="/dinner" element={<Dinner />} /> 
              <Route path="/beverages" element={<Beverages />} /> 
            </Route>
           
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
