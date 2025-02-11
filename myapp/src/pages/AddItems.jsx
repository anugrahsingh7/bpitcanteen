import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const AddItems = () => {
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



                    <div className="mt-2 text-2xl flex justify-center font-semibold text-[#502214]">Add Items to Menu</div>
                    <Link to="/vendor-dashboard" className="mt-1 text-sm flex  hover:underline font-normal text-[#502214] justify-center items-center cursor-pointer "><IoMdArrowRoundBack className="me-1"/>Back to the Dashboard</Link>

 
                    
                   

                    {/* Menu categories */}
                  

                    <div className=" mt-4">
                    <select id="countries" className="bg-white border border-opacity-70 h-12 border-[#502214] text-[#502214] text-md  rounded-lg block w-full p-2.5 ">
                    <option selected>Snacks</option>
                    <option value="US">Chinese</option>
                    <option value="CA">South Indian</option>
                    <option value="FR">Indian</option>
                    <option value="DE">Deserts</option>
                    <option value="DE">Beverages</option>
  </select>
                    </div>



                      {/* Name*/}

                    <div className="relative flex items-center mt-4">
                    
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="bg-white border border-opacity-70 h-12 border-[#502214] text-[#502214] text-md  rounded-lg block w-full p-3 placeholder:text-[#502214] placeholder:text-opacity-70"
                            placeholder="Username"
                        />
                    </div>


                  {/* Description */}

                    <div className="mt-4">
    
    <input type="text" id="large-input" 
    placeholder="Description"
    className="bg-white border border-opacity-70 h-12 border-[#502214] text-[#502214] text-md  rounded-lg block w-full p-3 placeholder:text-[#502214] placeholder:text-opacity-70" />
</div>




{/* Price */}
                <div className="mt-4">
                <input type="number"
 id="number-input" 
 aria-describedby="helper-text-explanation" 
 className="bg-white border border-opacity-70 h-12 border-[#502214] text-[#502214] text-md  rounded-lg block w-full p-3 placeholder:text-[#502214] placeholder:text-opacity-70" 
 placeholder="Price" 
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
                    <button className="w-full px-6 py-3 mt-6 text-white bg-[#502214] rounded-lg shadow-md hover:opacity-75 ">
                        Upload Details
                    </button>
                </form>
            </div>
        </section>
    );
};

export default AddItems;
