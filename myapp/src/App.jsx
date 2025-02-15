import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useSearchParams,
} from "react-router-dom";
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
import { useLive } from "./context/LiveContext";
import { useVendor } from "./lib/useVendorApi";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useUser();
  // const { vendorInfo } = useLive();
  const [redirecting, setRedirecting] = useState(false);

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
          <i className="fas fa-hamburger text-6xl text-[#592e1f]"></i>
        </div>
      </div>
    );

  if (redirecting) return <Navigate to="/login" />;
  // if (!vendorInfo?.status) return <Navigate to="/CanteenClosed" replace />;

  return children;
};
const CanView = ({ children }) => {
  const { vendorInfo } = useLive();
  if (!vendorInfo?.status) return <Navigate to="/CanteenClosed" replace />;

  return children;
};

function App() {
  const { isLive, vendorInfo, setVendorInfo } = useLive();
  const { data, isLoading: vendorLoading } = useVendor();

  // Load from localStorage on initial render
  useEffect(() => {
    const storedVendorInfo = localStorage.getItem("vendorInfo");
    if (storedVendorInfo) {
      setVendorInfo(JSON.parse(storedVendorInfo));
    }
  }, [setVendorInfo]);

  // Update state and localStorage when data is fetched
  useEffect(() => {
    if (data) {
      setVendorInfo(data[0]);
      localStorage.setItem("vendorInfo", JSON.stringify(data[0]));
    }
  }, [data, setVendorInfo]);

  console.log(vendorInfo);

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
            <Route element={<AppLayout />}>
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
                  <CanView>
                    <Bill />
                  </CanView>
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CanView>
                    <Cart />
                  </CanView>
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
