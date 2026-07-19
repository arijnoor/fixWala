import { useEffect, useState } from "react";

import { getApprovedUsers } from "../service/userService.js";
import { useLocation, useNavigate } from "react-router-dom";
import {  MapPin } from "lucide-react";

function Cards() {
  const [providers, setProviders] = useState([]);
  const [categories, setcategories] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [search, setSearch] = useState("");
const navigate= useNavigate()
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getApprovedUsers()
      console.log(data)
      setProviders(data)
    };
    fetchData();
  }, []);


  useEffect(() => {
    const urlCategory = new URLSearchParams(location.search).get("category");
    if (urlCategory) {
      setcategories(urlCategory);
    } else {
      setcategories("All");
    }
  }, [location.search]);

  const allCards = providers.flatMap((provider) =>
    provider.category.map((cat) => ({
      ...provider,
      category: cat,
    })));

  const filteredProviders = allCards.filter((p) =>
    selectedCity === "All Cities"
      ? true
      : (p.city || "").toLowerCase() === selectedCity.toLowerCase()
  )
    .filter((p) => {
      return categories === "All"
        ? true
        : (p.category || "").toLowerCase() === categories.toLowerCase();
    })
    .filter((p) =>
      (p.fullName || "").toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div>

      <div className="p-12">
        <h1 className="text-3xl font-bold text-black">
          Browse Services
        </h1>

        <p className="text-gray-500 mt-1">
          Find the right pro for the job.
        </p>

        {/* SEARCH + CITY */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 mt-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-96 flex-1 border border-gray-300 p-2 rounded"
          />

          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full md:w-48 p-2 border border-gray-300 rounded"
          >
            <option value="All Cities">All Cities</option>
            <option value="Lahore">Lahore</option>
            <option value="Karachi">Karachi</option>
            <option value="Islamabad">Islamabad</option>
            <option value="Peshawar">Peshawar</option>
            <option value="Quetta">Quetta</option>
            <option value="Rawalpindi">Rawalpindi</option>
          </select>
        </div>

        {/* CATEGORY BUTTONS */}
        <div className="flex flex-wrap gap-3 mt-4">
          {["All", "AC Tech", "Painting", "Electrical", "Carpentry", "Plumbing", "Cleaning"].map((cat) => (
            <button
              key={cat}
              onClick={() => setcategories(cat)}
              className={`px-4 py-1 rounded-full border ${categories === cat
                  ? "bg-orange-700 text-white"
                  : "border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

     
      <div className="bg-gray-50 min-h-screen p-6" >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {filteredProviders.length > 0 ? (
            filteredProviders.map((provider) => (
            

              <div
              key={provider._id + provider.category}
                onClick={() => navigate(`/details/${provider._id}`)}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition border overflow-hidden"
              >
                  <img
            src={`http://localhost:5000/upload/${provider.img}`}
            alt={provider.fullName}
            className="w-full h-52 object-cover"
          />
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-semibold text-orange-700 uppercase">
                      {provider.category}
                    </h3>


                  </div>

                  <h2 className="text-xl font-bold text-gray-800 mt-1">
                    {provider.fullName}
                  </h2>

                  <p className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                    <MapPin size={18} />
                    {provider.city}
                  </p>

                  <p className="text-sm text-orange-800 mt-1">
                    From: {provider.startingPrice}
                  </p>

                  {/* USER BUTTONS */}
                  <div className="mt-5 flex gap-3">
                    <a
                      href={`tel:${provider.phone}`}
                      className="flex-1 text-center bg-orange-700 text-white py-2 rounded-lg hover:bg-orange-800 text-sm font-medium"
                    >
                      Call Now
                    </a>

                    <a
                      href={`https://wa.me/${provider.phone}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center border border-orange-700 text-orange-700 py-2 rounded-lg hover:bg-orange-700 hover:text-white text-sm font-medium"
                    >
                      WhatsApp
                    </a>
                  </div>



                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">No service providers found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cards;
