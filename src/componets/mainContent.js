import fixWala from "./fixWala.png";
import { Link, useNavigate } from "react-router-dom";
import {
  Wind,
  Paintbrush,
  Zap,
  Hammer,
  Wrench,
  Sparkles,
} from "lucide-react";
function MainContent() {
  const navigate= useNavigate();
  const categories = [
  { name: "AC Tech", icon: <Wind size={22} /> },
  { name: "Painting", icon: <Paintbrush size={22} /> },
  { name: "Electrical", icon: <Zap size={22} /> },
  { name: "Carpentry", icon: <Hammer size={22} /> },
  { name: "Plumbing", icon: <Wrench size={22} /> },
  { name: "Cleaning", icon: <Sparkles size={22} /> },
];
  return (
    <div className="px-6 md:px-16 lg:px-24 py-10">

      {/* main container */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">

        {/* LEFT SIDE (TEXT) */}
        <div className="flex-1 text-left">

          <span className="px-6 py-1 rounded-full border border-orange-500 bg-orange-100 text-orange-700 text-xs inline-block">
            Trusted local providers
          </span>

          <div className="text-[60px] text-orange-700 font-bold leading-tight mt-4 text-left">
            Find a provider for every fix
          </div>

          <div className="text-gray-600 text-[20px] mt-4 text-left">
            Search local AC technicians, plumbers, electricians and more.
            Or list your own services and grow your client base.
          </div>

          <div className="flex gap-4 mt-6">
            <button onClick={() => navigate("/provider")}  className="rounded px-9 py-2 border border-orange-500 bg-orange-700 text-white text-md">
              Search providers
            </button>

            <button onClick={() => navigate("/services")}  className="rounded px-6 py-2 border border-orange-500 bg-white text-black text-md">
              Search services
            </button>
          </div>

          {/* Note box */}
          <div className="border border-orange-400 bg-orange-50 rounded-lg p-4 inline-block max-w-md mt-6">

            <h1 className="font-semibold text-orange-600 mb-1">
              Note:
            </h1>

            <div className="text-md text-orange-700">
              If you want to add feedback to any provider, go to their profile and add a review.
            </div>

          </div>

          {/* bottom tags */}
          <div className="flex gap-6 mt-6 text-gray-700 font-medium">
            <span>Verified Profile</span>
            <span>Local & reliable</span>
          </div>

        </div>

        {/* RIGHT SIDE (IMAGE) */}
        <div className="flex-1 flex justify-center md:justify-end">
          <img
            src={fixWala}
            alt="FixWala"
            className="h-70 w-auto rounded-2xl shadow-lg transition-all duration-500 hover:scale-105 animate-float "
          />
        </div>

      </div>
      {/* POPULAR CATEGORIES SECTION */}
<div className="p-8 mt-10 bg-gray-50 rounded-2xl">

  <h2 className="text-2xl font-bold mb-6 text-gray-800">
    Popular Categories
  </h2>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">

    {categories.map((cat, index) => (
      <Link
        key={index}
        to={`/services?category=${cat.name}`}
        className="group"
      >

        <div className="border border-gray-200 rounded-xl p-5 text-center bg-white shadow-sm hover:shadow-xl hover:border-orange-400 hover:-translate-y-1 transition-all duration-300 cursor-pointer">

          {/* ICON */}
          <div className="flex justify-center mb-2 text-orange-800 group-hover:scale-110 transition">
            {cat.icon}  {cat.name}
          </div>

        </div>

      </Link>
    ))}

  </div>

</div>
    </div>
  );
}

export default MainContent;
