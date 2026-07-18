import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { approveUser, getUserById, rejectUser } from "../service/userService";

import {
    FaInstagram,
    FaFacebook,
    FaLinkedin,
} from "react-icons/fa";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { BadgeDollarSign, MapPin, MessageCircle, Phone } from "lucide-react";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});
function PendingDetails() {
    const { id } = useParams();
    console.log(id)
    const [showReason, setShowReason] = useState(false);
    const [reason, setReason] = useState("");
    const [provider, setProvider] = useState(null);
const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {

            const data = await getUserById(id);
            console.log(data)
            setProvider(data);

        };

        fetchData();
    }, [id]);

    if (provider) {
        console.log(JSON.stringify(provider, null, 2));
        console.log("Latitude:", provider.lat);
        console.log("Longitude:", provider.lng);
        console.log("Number Lat:", Number(provider.lat));
        console.log("Number Lng:", Number(provider.lng));
    }

    if (!provider) {
        return <h1>Loading...</h1>;
    }
    const handleApprove = async () => {

        await approveUser(id)
        navigate("/pending")

        console.log("Approved");

    };

  const handleReject = async () => {
  if (!reason.trim()) {
    alert("Please enter rejection reason");
    return;
  }

  await rejectUser(id, reason);

  alert("User Rejected");
navigate("/pending")
};

    return (
        <div>
            <div className="bg-gray-100 min-h-screen">

                {/* SHOP IMAGES */}


                {/* PROFILE CARD */}
                <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                    <div className="flex flex-col lg:flex-row gap-10">

                        {/* LEFT SIDE */}
                        <div className="lg:w-1/3 flex flex-col items-center">
                            <img
                                src={`http://localhost:5000/upload/${provider.img}`}
                                alt=""
                                className="w-52 h-52 rounded-full border-4 border-orange-600 object-cover"
                            />

                            <h1 className="text-4xl font-bold mt-5 text-center">
                                {provider.businessName}
                            </h1>

                            <div className="flex items-center gap-2 mt-4 text-gray-600">
                                <MapPin size={20} />
                                <span>{provider.city}</span>
                            </div>

                            <div className="flex items-center gap-2 mt-4 text-orange-700 font-semibold text-xl">
                                <BadgeDollarSign size={22} />
                                Starting From Rs {provider.startingPrice}
                            </div>

                            {/* SOCIAL LINKS */}
                            <div className="flex gap-6 mt-8">
                                <a href={provider.instagram} target="_blank" rel="noreferrer">
                                    <FaInstagram size={28} className="text-pink-600 hover:scale-125 transition" />
                                </a>
                                <a href={provider.facebook} target="_blank" rel="noreferrer">
                                    <FaFacebook size={28} className="text-blue-700 hover:scale-125 transition" />
                                </a>
                                <a href={provider.linkedin} target="_blank" rel="noreferrer">
                                    <FaLinkedin size={28} className="text-blue-900 hover:scale-125 transition" />
                                </a>
                            </div>

                            {/* BUTTONS */}
                            <div className="flex gap-4 mt-10 w-full">
                                <a
                                    href={`tel:${provider.phone}`}
                                    className="flex-1 bg-orange-700 hover:bg-orange-800 text-white rounded-lg py-3 text-center font-semibold"
                                >
                                    <Phone className="inline mr-2" size={18} />
                                    Call
                                </a>
                                <a
                                    href={`https://wa.me/${provider.phone}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-1 border-2 border-orange-700 text-orange-700 rounded-lg py-3 text-center font-semibold hover:bg-orange-700 hover:text-white"
                                >
                                    <MessageCircle className="inline mr-2" size={18} />
                                    WhatsApp
                                </a>
                            </div>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="lg:w-2/3">

                            {/* ABOUT */}
                            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                                <h2 className="text-3xl font-bold mb-4">About Business</h2>
                                <p className="text-gray-700 leading-8">{provider.bio}</p>
                            </div>

                            {/* BUSINESS INFORMATION */}
                            <div className="bg-white mt-8 border rounded-xl p-6">
                                <h2 className="text-3xl font-bold mb-6">Business Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-gray-500">Business Name</p>
                                        <h3 className="font-semibold text-xl">{provider.businessName}</h3>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Phone Number</p>
                                        <h3 className="font-semibold text-xl">{provider.phone}</h3>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">City</p>
                                        <h3 className="font-semibold text-xl">{provider.city}</h3>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Starting Price</p>
                                        <h3 className="font-semibold text-xl text-orange-700">Rs {provider.startingPrice}</h3>
                                    </div>
                                </div>
                            </div>

                            {/* SERVICE */}
                            <div className="bg-white mt-8 border rounded-xl p-6">
                                <h2 className="text-3xl font-bold mb-5">Current Service</h2>
                                <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
                                    <h3 className="text-2xl font-bold text-orange-700">{provider.title}</h3>
                                    <p className="text-gray-700 leading-8 mt-4">{provider.description}</p>
                                </div>
                            </div>

                            {/* OTHER SERVICES */}
                            <div className="bg-white mt-8 border rounded-xl p-6">
                                <h2 className="text-3xl font-bold mb-6">Services</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {provider.category?.map((cat, index) => (
                                        <div
                                            key={index}
                                            className="rounded-xl border border-orange-200 bg-orange-50 p-5 hover:shadow-lg transition"
                                        >
                                            <h3 className="text-xl font-bold text-orange-700">{cat}</h3>
                                            <p className="text-gray-600 mt-3">{provider.businessName} also provides this service.</p>
                                            <div className="mt-5 flex justify-between items-center">
                                                <span className="font-semibold text-orange-700">Rs {provider.startingPrice}</span>
                                                <span className="bg-orange-700 text-white px-3 py-1 rounded-full text-sm">Available</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white mt-8 border rounded-xl p-6">
                                <h2 className="text-3xl font-bold mb-6">Shope Images</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                                    {provider.shopImage?.map((image, index) => (
                                        <img
                                            key={index}
                                            src={`http://localhost:5000/upload/${image}`}
                                            alt=""
                                            className="h-60 w-full rounded-xl object-cover shadow-md hover:scale-105 transition"
                                        />
                                    ))}
                                </div>
                            </div>

                            {provider?.lat != null && provider?.lng != null && (
                                <div className="bg-white mt-8 border rounded-xl p-6 overflow-hidden ">
                                    <h2 className="text-3xl font-bold mb-6">Business Location</h2>


                                    <MapContainer
                                        key={`${provider.lat}-${provider.lng}`}
                                        center={[provider.lat, provider.lng]}
                                        zoom={15}
                                        style={{ height: "400px", width: "100%" }}
                                    >
                                        <TileLayer
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            attribution="&copy; OpenStreetMap contributors"
                                        />
                                        <Marker position={[provider.lat, provider.lng]} />
                                    </MapContainer>

                                    <div className="mb-4 bg-gray-100 p-4 rounded-lg">
                                        <p>
                                            <strong>Latitude:</strong> {provider.lat}
                                        </p>

                                        <p>
                                            <strong>Longitude:</strong> {provider.lng}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* SOCIAL LINKS CONNECT */}
                            <div className="bg-white mt-8 border rounded-xl p-6">
                                <h2 className="text-3xl font-bold mb-6">Connect With Business</h2>
                                <div className="flex flex-wrap gap-5">
                                    <a href={provider.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-pink-100 px-5 py-3 rounded-lg hover:shadow-md">
                                        <FaInstagram className="text-pink-600" /> Instagram
                                    </a>
                                    <a href={provider.facebook} target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-blue-100 px-5 py-3 rounded-lg hover:shadow-md">
                                        <FaFacebook className="text-blue-700" /> Facebook
                                    </a>
                                    <a href={provider.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-sky-100 px-5 py-3 rounded-lg hover:shadow-md">
                                        <FaLinkedin className="text-sky-700" /> LinkedIn
                                    </a>
                                </div>
                            </div>
                            {/* reason */}
                            <div className="bg-white mt-8 border rounded-xl p-6">

                                <h2 className="text-2xl font-bold mb-6">
                                    Review Request
                                </h2>

                                <div className="flex gap-4">

                                    <button
                                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold"
                                        onClick={()=>handleApprove(provider._id)}
                                    >
                                        Accept
                                    </button>

                                    <button
                                        className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold"
                                        onClick={() => setShowReason(true)}
                                    >
                                        Reject
                                    </button>

                                </div>

                                {showReason && (

                                    <div className="mt-6">

                                        <label className="block font-semibold mb-2">
                                            Reason
                                        </label>

                                        <textarea
                                            value={reason}
                                            onChange={(e) => setReason(e.target.value)}
                                            placeholder="Write rejection reason..."
                                            className="w-full border rounded-lg p-3 h-32 outline-none focus:ring-2 focus:ring-red-500"
                                        />

                                        <button
                                            onClick={()=>handleReject(provider._id)}
                                            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
                                        >
                                            Submit Reason
                                        </button>

                                    </div>

                                )}

                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default PendingDetails;