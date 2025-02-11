import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import VendorLogin from "./pages/VendorLogin";
import VendorDashboard from "./pages/VendorDashboard";
import Snacks from "./pages/Snacks";
import SouthIndian from "./pages/SouthIndian";
import Cart from "./pages/Cart";
import Chinese from "./pages/Chinese";
import Beverages from "./pages/Beverages";
import AppLayout from "./ui/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import toast, { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext";
import ForgetPassword from "./pages/ForgetPassword";
import AddItems from "./pages/AddItems";
import RemoveItems from "./pages/RemoveItems";
import { UserProvider, useUser } from "./context/userContext";
import { useEffect, useState } from "react";
import IndianItems from "./pages/IndianItems";
import Deserts from "./pages/Deserts";
import Mess from "./pages/Mess";
import OrderHistory from "./pages/OrderHistory";
import Bill from "./pages/Bill";
import CanteenClosed from "./pages/CanteenClosed";
import EditItems from "./pages/EditItems";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useUser();
  const [redirecting, setRedirecting] = useState(false); // ✅ Prevent state update in render phase

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      toast.error("Please log in !");
      setRedirecting(true);
    }
  }, [loading, isLoggedIn]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin">
          <i className="fas fa-hamburger text-6xl text-orange-500"></i>
        </div>
      </div>
    ); // Show a loading screen while verifying

  if (redirecting) return <Navigate to="/login" />;

  return children;
};

function App() {
  return (
    <CartProvider>
      <Toaster />
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/vendor-login" element={<VendorLogin />} />
            <Route path="/vendor-dashboard" element={<VendorDashboard />} />
            <Route path="/AddItems" element={<AddItems />} />
            <Route path="/EditItems" element={<EditItems />} />
            <Route path="/RemoveItems" element={<RemoveItems />} />
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/snacks" element={<Snacks />} />
              <Route path="/SouthIndian" element={<SouthIndian />} />
              <Route path="/Chinese" element={<Chinese />} />
              <Route path="/IndianItems" element={<IndianItems />} />
              <Route path="/Mess" element={<Mess />} />
              <Route path="/Deserts" element={<Deserts />} />
               <Route path="/beverages" element={<Beverages />} />
            </Route>
            <Route
              path="bill"
              element={
                <ProtectedRoute>
                  <Bill />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/OrderHistory"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/CanteenClosed" element={<CanteenClosed />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
