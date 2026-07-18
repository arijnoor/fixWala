import { useEffect, useState } from "react";
import { getApprovedUsers } from "../service/userService";
import { useLocation, useNavigate } from "react-router-dom";
import { Phone, MessageCircle, MapPin } from "lucide-react";
function Providers() {
    const [providers, setProviders] = useState([]);
    const [selectedCity, setSelectedCity] = useState("All Cities");
    const [search, setSearch] = useState("");
    const navigate=useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            const data = await getApprovedUsers();
            setProviders(data);
        };
        fetchData();
    }, []);

 const filteredProviders = providers
  .filter((p) =>
    selectedCity === "All Cities"
      ? true
      : p.city?.trim().toLowerCase() === selectedCity?.toLowerCase()
  )
  .filter((p) =>
    search === ""
      ? true
      : p.name?.toLowerCase().includes(search.toLowerCase())
  );
    return (
        <div>
            {/* TOP SECTION */}
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

                    <select value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="w-full md:w-48 p-2 border border-gray-300 rounded">
                        <option value="All Cities">All Cities</option>
                        <option value="Lahore">Lahore</option>
                        <option value="Karachi">Karachi</option>
                        <option value="Islamabad">Islamabad</option>
                        <option value="Peshawar">Peshawar</option>
                        <option value="Quetta">Quetta</option>
                        <option value="Rawalpindi">Rawalpindi</option>
                    </select>

                </div>
            </div>
            <div className="bg-gray-50 min-h-screen p-6">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {filteredProviders.map((provider) => (

                        <div
                            key={provider._id}
                            onClick={() => navigate(`/details/${provider._id}`)}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition border border-orange-100 overflow-hidden"
                        >

                            <div className="p-5">

<img
            src={`http://localhost:5000/upload/${provider.img}`}
            alt={provider.fullName}
            className="w-full h-52 object-cover"
          />

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

                                {/* BUTTONS */}
                                <div className="mt-5 flex gap-3">

                                    <a
                                        href={`tel:${provider.phone}`}
                                        className="flex-1 text-center bg-orange-700 text-white py-2 rounded-lg hover:bg-orange-800"
                                    >
                                        Call Now
                                    </a>

                                    <a
                                        href={`https://wa.me/${provider.phone}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex-1 text-center border border-orange-700 text-orange-700 py-2 rounded-lg hover:bg-orange-700 hover:text-white"
                                    >
                                        WhatsApp
                                    </a>

                                </div>

                            </div>
                        </div>

                    ))}

                </div>
            </div>
        </div>
    );
}

export default Providers;

