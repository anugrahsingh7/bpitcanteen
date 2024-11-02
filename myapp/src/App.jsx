import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Snacks from './pages/Snacks';
import Cart from './pages/Cart';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/snacks"
              element={
                <>
                  <Navbar />
                  <main className="flex-grow">
                    <Snacks />
                  </main>
                  <Footer />
                </>
              }
            />
            <Route
              path="/cart"
              element={
                <>
                  <Navbar />
                  <main className="flex-grow">
                    <Cart />
                  </main>
                  <Footer />
                </>
              }
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
