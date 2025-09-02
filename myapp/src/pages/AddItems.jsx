import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { useCreateMenu } from "../lib/useMenu";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddItems = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      category:"",
      name : " ",
      description: " ",
      price:" ",
      image: null,
    });
    const { mutate: createItem } = useCreateMenu();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newData = new FormData();
        const cat = formData.category || "Snack";
        newData.append("category", cat);
        newData.append("name", formData.name);
        newData.append("description", formData.description);
        newData.append("price", formData.price);
        newData.append("image", formData.image);

        try {
            const response = await createItem(newData);
            toast.success("Item added successfully!");
            navigate("/vendor-dashboard");  // Redirect after successful submission
        } catch (error) {
            toast.error("Failed to add item. Please try again.");
        }
    };
    

    return (
        <section className="  ">
            <div className="container bg-[#f8f1e7]  p-4  flex items-center justify-center min-h-screen px-6 mx-auto">
                <form className="w-full bg-[#f8f1e7]   max-w-md" onSubmit={handleSubmit}>
                    {/* Logo */}
                    <div className="flex justify-center mx-auto">
                        <img className="w-auto h-24 sm:h-24" src="/logo/Canteen.png" alt="Logo" />
                    </div>



                    <div className="mt-2 text-xl flex justify-center font-bold text-[#502214] items-center">Add Food Items to the<MdOutlineRestaurantMenu className="mx-1"/>  Menu</div>
                    <Link to="/vendor-dashboard" className="mt-1 text-sm flex  hover:underline font-normal text-[#502214] justify-center items-center cursor-pointer "><IoMdArrowRoundBack className="me-1"/>Back to the Dashboard</Link>
                    {/* Menu categories */}
                
                    <div className=" mt-4">
                    <label className="text-[#502214] " >Select Category:-</label>
                    <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    id="category" className="mt-1 bg-white border border-opacity-70 h-12 border-[#502214] text-[#502214] text-md  rounded-lg block w-full p-2.5 ">
                    <option value="Snack">Snacks</option>
                    <option value="Chinese">Chinese</option>
                    <option value="South Indian">South Indian</option>
                    <option value="Meal Plan">Meal Plan</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Beverage">Beverage</option>
  </select>
                    </div>



                      {/* Name*/}

                    <div className="relative flex items-center mt-4">
                        <input
                            type="text"
                            name="name"
                            value={formData.username}
                            onChange={handleChange}
                            className="bg-white border border-opacity-70 h-12 border-[#502214] text-[#502214] text-md  rounded-lg block w-full p-3 placeholder:text-[#502214] placeholder:text-opacity-70"
                            placeholder="Item Name"
                        />
                    </div>


                  {/* Description */}

                    <div className="mt-4">
                    <input type="text" id="large-input" 
                    name="description"
                    placeholder="Item Description"
                    onChange={handleChange}
                    className="bg-white border border-opacity-70 h-12 border-[#502214] text-[#502214] text-md  rounded-lg block w-full p-3 placeholder:text-[#502214] placeholder:text-opacity-70" />
                    </div>




                    {/* Price */}
                    <div className="mt-4">
                    <input type="number"
                    id="number-input" 
                    name="price"
                    onChange={handleChange}
                    aria-describedby="helper-text-explanation" 
                    className="bg-white border border-opacity-70 h-12 border-[#502214] text-[#502214] text-md  rounded-lg block w-full p-3 placeholder:text-[#502214] placeholder:text-opacity-70" 
                    placeholder="Item Price" 
                    required />
                    </div>

                    {/* Profile Photo Upload */}
                    <label htmlFor="dropzone-file" className="mt-4 relative bg-white border border-opacity-70 h-12 border-[#502214] text-[#502214] text-md  rounded-lg block w-full p-3 placeholder:text-[#502214] placeholder:text-opacity-70">
                        <svg className="w-6 h-6 text-[#502214] text-opacity-70" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /> 
                           
                        </svg>
                        <h1 className="absolute top-3 left-12 opacity-70">Upload item image</h1>
                        
                        <input id="dropzone-file"  type="file" className="hidden" onChange={handleFileChange} />
                    </label>
                    {/* Submit Button */}
                    <button className="w-full px-6 py-3 mt-6 text-white bg-green-600 rounded-lg shadow-md hover:opacity-75 ">
                        Upload Item
                    </button>
                </form>
            </div>
        </section>
    );
};
export default AddItems;
