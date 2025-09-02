import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";  // Import useNavigate
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { useDeleteMenu, useMenuApi } from "../lib/useMenu";
import toast from "react-hot-toast";

const RemoveItems = () => {
    const navigate = useNavigate();  // Initialize navigate
    const [formData, setFormData] = useState({
       _id : " ",
       name : " ",
    });
    const [category, setCategory] = useState("Snack");
    const { data, isLoading } = useMenuApi(category);
    const [items, setItems] = useState([]);
    const [selected, setSelected] = useState(items[0]);
    const { mutate: deleteItem } = useDeleteMenu();

    useEffect(() => {
        if (data?.data?.data) {
            setItems(data?.data?.data);
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
            });
        }
    }, [data]);

    const handleitemSelected = (e) => {
        const item = items.find(item => item._id === e.target.value);
        setSelected(item);

        setFormData({
            _id: item._id,
            name: item.name,
        });
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        deleteItem(formData._id, {
            onSuccess: () => {
                toast.success("Item Deleted Successfully");
                navigate("/vendor-dashboard");  // Redirect after successful deletion
            },
            onError: () => {
                toast.error("Failed to delete the item");
            },
        });
    };

    return (
        <section className="  ">
            <div className="container bg-[#f8f1e7]  p-4  flex items-center justify-center min-h-screen px-6 mx-auto">
                <form className="w-full bg-[#f8f1e7] max-w-md" onSubmit={handleSubmit}>
                    {/* Logo */}
                    <div className="flex justify-center mx-auto">
                        <img className="w-auto h-24 sm:h-24" src="/logo/Canteen.png" alt="Logo" />
                    </div>
                    <div className="mt-2 text-xl flex justify-center font-bold text-[#502214] items-center">Delete Items from the <MdOutlineRestaurantMenu  className="ms-1"/>Menu</div>
                    <Link to="/vendor-dashboard" className="mt-1 text-sm flex  hover:underline font-normal text-[#502214] justify-center items-center cursor-pointer "><IoMdArrowRoundBack className="me-1"/>Back to the Dashboard</Link>
                    
                    {/* Menu categories */}
                    <div className=" mt-4">
                        <label className="text-[#502214] " >Select Category:-</label>
                        <select 
                            value={category}
                            onChange={handleCategoryChange}
                            id="category" className= "mt-1 bg-white border border-opacity-70 h-12 border-[#502214] text-[#502214] text-md  rounded-lg block w-full p-2.5 ">
                            <option value="Snack">Snacks</option>
                            <option value="Chinese">Chinese</option>
                            <option value="South Indian">South Indian</option>
                            <option value="Meal Plan">Meal Plan</option>
                            <option value="Dessert">Dessert</option>
                            <option value="Beverage">Beverage</option>
                        </select>
                    </div>

                    <div className=" mt-4">
                        <label className="text-[#502214] " >Select Item:-</label>
                        <select 
                            onChange={handleitemSelected}
                            id="items" className= "mt-1 bg-white border border-opacity-70 h-12 border-[#502214] text-[#502214] text-md  rounded-lg block w-full p-2.5 ">
                            {items.length > 0 && items.map((item) => (
                                <option key={item._id} value={item._id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button className="w-full flex items-center justify-center px-6 py-3 mt-6 text-white bg-red-600 rounded-lg shadow-md hover:opacity-75 space-x-1 ">
                        <MdDelete />  Delete Item
                    </button>
                    <Link
                        to="/EditItems"
                        className="mt-2 text-md flex  hover:underline font-normal text-[#502214] justify-center items-center cursor-pointer "
                    >
                        <MdEdit className="me-1" />
                        Or Edit Price of any Item from the Menu
                    </Link>
                </form>
            </div>
        </section>
    );
};

export default RemoveItems;
