import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AiFillEdit } from "react-icons/ai";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useMenuApi, useUpdateMenu } from "../lib/useMenu";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EditItems = () => {
  const navigate = useNavigate();  // Initialize navigate
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    currentPrice: "",
    newPrice: "",
  });
  
  const [category, setCategory] = useState("Snack");
  const { data, isLoading } = useMenuApi(category);
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(items[0]);
  const { mutate: update } = useUpdateMenu();

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
   
  const handleitemSelected = (e) => {
    const item = items.find(item => item._id === e.target.value);
    setSelected(item);

    setFormData({
      _id: item._id,
      name: item.name,
      currentPrice: item.price,
    });
  };

  useEffect(() => {
    if (data?.data?.data) {
      setItems(data.data.data);
      const pastaItem = data.data.data.find((item) => item.name === "Pasta");
      const initialItem = pastaItem || data.data.data[0];

      if (pastaItem) {
        setSelected(pastaItem);
      } else {
        setSelected(data.data.data[0]);
      }
     
      setFormData({
        _id: initialItem._id,
        name: initialItem.name,
        currentPrice: initialItem.price,
      });
    }
  }, [data, category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, newPrice: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, profilePhoto: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    update({ id: formData?._id, data: { price: formData.newPrice } });
    toast.success("Price changed successfully");
    navigate("/vendor-dashboard");  // Redirect after successful form submission
  };


  return (
    <section className="  ">
      <div className="container bg-[#f8f1e7]  p-4  flex items-center justify-center min-h-screen px-6 mx-auto">
        <form className="w-full bg-[#f8f1e7] max-w-md" onSubmit={handleSubmit}>
          {/* Logo */}
          <div className="flex justify-center mx-auto">
            <img
              className="w-auto h-24 sm:h-24"
              src="/logo/Canteen.png"
              alt="Logo"
            />
          </div>

          <div className="mt-2 text-md flex items-center justify-center font-bold text-[#502214]">
            Edit ₹Price of any Item from the{" "}
            <MdOutlineRestaurantMenu className="ms-1" /> Menu
          </div>
          <Link
            to="/vendor-dashboard"
            className="mt-1 text-sm flex  hover:underline font-normal text-[#502214] justify-center items-center cursor-pointer "
          >
            <IoMdArrowRoundBack className="me-1" />
            Back to the Dashboard
          </Link>

          {/* Menu categories */}

          <div className=" mt-4">
            <label className="text-[#502214] ">Select Category : </label>
            <select
              id="categories"
              value={category}
              onChange={handleCategoryChange}

              className="mt-1 bg-white border border-opacity-70 h-12 border-[#502214] text-[#502214] text-md rounded-lg block w-full p-2.5"
            >
              <option value="Snack">Snacks</option>
              <option value="Chinese">Chinese</option>
              <option value="South Indian">South Indian</option>
              <option value="Meal Plan">Meal Plan</option>
              <option value="Dessert">Dessert</option>
              <option value="Beverage">Beverage</option>
            </select>



            <label className="text-[#502214] ">Select Item:-</label>
            <select
              id="items"
              onChange={handleitemSelected}
              className="mt-1 bg-white border border-opacity-70 h-12 border-[#502214] text-[#502214] text-md  rounded-lg block w-full p-2.5 "
            >
             { items.length>0 && items.map((item) => {
              return (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              );
             }) }

            </select>
          </div>


          <div className="mt-4">
            <label className="text-[#502214] ms-0">Current Price:-</label>
            <div className="mt-1 bg-white border border-opacity-70 h-12 border-[#502214] text-[#502214] text-md  rounded-lg block w-full p-2.5  cursor-not-allowed">
             {selected ? selected.price : 0 }
            </div>
          </div>

          <div className="mt-4">
            <label className="text-[#502214] ">New Price:-</label>
            <input
              type="Number"
              name="price"
              placeholder="Enter new price"
              value={formData.newPrice}
              onChange={handleChange}
              className="mt-1 bg-white border border-opacity-70 h-12 border-[#502214] text-[#502214] text-md  rounded-lg block w-full p-2.5 placeholder:text-[#502214] placeholder:text-opacity-50 "
            />
          </div>

          {/* Name*/}

          {/* Profile Photo Upload */}

          {/* Submit Button */}
          <button className="w-full flex items-center justify-center px-6 py-3 mt-6 text-white bg-orange-600 rounded-lg shadow-md hover:opacity-75 space-x-1 ">
            <AiFillEdit className="me-1" /> Edit Price
          </button>
          <Link
            to="/RemoveItems"
            className="mt-2 text-md flex  hover:underline font-normal text-[#502214] justify-center items-center cursor-pointer "
          >
            Or <MdDelete className="ms-1" /> Delete any Item from the{" "}
            <MdOutlineRestaurantMenu className="ms-1" /> Menu
          </Link>
        </form>
      </div>
    </section>
  );
};

export default EditItems;
