import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import VendorLogin from './pages/VendorLogin';
import VendorDashboard from './pages/VendorDashboard';
import Snacks from './pages/Snacks';
import Dinner from './pages/Dinner';
import Cart from './pages/Cart';
import Breakfast from './pages/Breakfast';
import Lunch from './pages/Lunch';
import Beverages from './pages/Beverages';
import AppLayout from './ui/AppLayout';
import PageNotFound from './pages/PageNotFound';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/vendor-login" element={<VendorLogin />} />
          <Route path="/vendor-dashboard" element={<VendorDashboard />} />
          <Route element={<AppLayout />}>
            <Route path="/snacks" element={<Snacks />} />
            <Route path="/dinner" element={<Dinner />} />
          
          
          <Route path="/breakfast" element={<Breakfast />} />
          <Route path="/lunch" element={<Lunch />} />
            <Route path="/beverages" element={<Beverages />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
