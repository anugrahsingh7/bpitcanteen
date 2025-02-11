import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { MdOutlineRestaurantMenu } from "react-icons/md";

const RemoveItems = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePhoto: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, profilePhoto: e.target.files[0] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    return (
        <section className="  ">
            <div className="container bg-[#f8f1e7]  p-4  flex items-center justify-center min-h-screen px-6 mx-auto">
                <form className="w-full bg-[#f8f1e7] max-w-md" onSubmit={handleSubmit}>
                    {/* Logo */}
                    <div className="flex justify-center mx-auto">
                        <img className="w-auto h-24 sm:h-24" src="/logo/logo-removebg.png" alt="Logo" />
                    </div>


 
                    <div className="mt-2 text-2xl flex justify-center font-semibold text-[#502214] items-center">Delete Items from the <MdOutlineRestaurantMenu  className="ms-1"/>Menu</div>
                    <Link to="/vendor-dashboard" className="mt-1 text-sm flex  hover:underline font-normal text-[#502214] justify-center items-center cursor-pointer "><IoMdArrowRoundBack className="me-1"/>Back to the Dashboard</Link>

                    
                   

                    {/* Menu categories */}
                  

                    <div className=" mt-4">
                    <label className="text-[#502214] " >Select Item:-</label>
                    <select id="countries" className= "mt-1 bg-white border border-opacity-70 h-12 border-[#502214] text-[#502214] text-md  rounded-lg block w-full p-2.5 ">
                    <option selected>idli</option>
                    <option value="US">Paneer Patties</option>
                    <option value="CA">Dosa</option>
                    <option value="FR">Spring Roll</option>
                    <option value="DE">Chowmien</option>
                    <option value="DE">Lemon Ice Tea</option>
  </select>
                    </div>



                      {/* Name*/}

                    

                    {/* Profile Photo Upload */}
                    
                    {/* Submit Button */}
                    <button className="w-full flex items-center justify-center px-6 py-3 mt-6 text-white bg-red-600 rounded-lg shadow-md hover:opacity-75 space-x-1 ">
                    <MdDelete  />  Delete Item
                    </button>
                    <Link
            to="/EditItems"
            className="mt-2 text-md flex  hover:underline font-normal text-[#502214] justify-center items-center cursor-pointer "
          >
            <MdEdit  className="me-1" />
            Or Edit Price of any Item from the Menu
          </Link>
                </form>
            </div>
        </section>
    );
};

export default RemoveItems;
