import { useState, useEffect } from "react";
import { useUser } from "../context/userContext";
import { useMenuApi } from "../lib/useMenu";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { useLive } from "../context/LiveContext";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

function Snacks() {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { vendorInfo } = useLive();
  const [snackItems, setSnackItems] = useState([]);
  const { data, isLoading } = useMenuApi("Snack");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.data?.data) {
      setSnackItems(data.data.data);
    }
  }, [data]);

  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-1 pb-4 max-w-7xl">
      <div className="w-full text-[#502214] text-opacity-95 justify-center font-semibold items-center flex text-4xl pb-7">
        SNACKS
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin">
            <i className="fas fa-hamburger text-6xl text-[#502214]"></i>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 justify-items-center">
          {snackItems.length > 0 &&
            snackItems.map((item, index) => (
              <div
                key={item._id}
                className="opacity-0 animate-fadeIn"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: "forwards",
                }}
              >
                <Card
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  description={item.description}
                  isVeg={true}
                />
              </div>
            ))}
        </div>
      )}

      {/* Modal for Unauthenticated Users */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#f8f1e7] rounded-lg shadow-lg p-4 py-10 w-11/12 max-w-md text-center">
            <h2 className="text-lg font-semibold text-gray-800">
            Please log in to continue and place your order.
            </h2>
            <div className="mt-4 flex justify-center gap-2">
              <Link to="/Login"
                className="bg-[#502214] text-white px-3 py-2 rounded-md hover:bg-opacity-90 transition"
                onClick={() => navigate("/login")}
              >
                Login
              </Link>
              <Link to="/snacks"
                className="bg-white border border-[#502214] text-[#502214] px-3 py-2 rounded-md hover:opacity-75 transition"
                onClick={() => setShowModal(false)}
              >
                Browse Menu
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Snacks;
