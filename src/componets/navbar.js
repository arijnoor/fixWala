import { useState } from "react";
import logo from "./logo.png";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleBecomeProvider = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/auth", {
        state: {
          signup: true,
          redirectTo: "/userform2",
        },
      });
    } else {
      navigate("/userform2");
    }

    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md">
     <div className="w-full px-4 sm:px-6 lg:px-10">

        {/* Navbar Top */}
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div>
           <img
  src={logo}
  alt="Logo"
  className="h-24 md:h-32 lg:h-36 w-auto cursor-pointer"
/>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">

            <button
              onClick={() => navigate("/services")}
              className="text-gray-600 hover:text-orange-500 font-medium"
            >
              Service
            </button>

            <button
              onClick={() => navigate("/provider")}
              className="text-gray-600 hover:text-orange-500 font-medium"
            >
              Provider
            </button>

            <button
              onClick={() => navigate("/auth")}
              className="text-gray-600 hover:text-orange-500 font-medium"
            >
              Sign In
            </button>

            <button
              onClick={handleBecomeProvider}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
            >
              Become a Provider
            </button>

          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X size={30} />
            ) : (
              <Menu size={30} />
            )}
          </button>

        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-5 flex flex-col gap-4">

            <button
              onClick={() => {
                navigate("/services");
                setMenuOpen(false);
              }}
              className="text-left text-gray-600 hover:text-orange-500"
            >
              Service
            </button>

            <button
              onClick={() => {
                navigate("/provider");
                setMenuOpen(false);
              }}
              className="text-left text-gray-600 hover:text-orange-500"
            >
              Provider
            </button>

            <button
              onClick={() => {
                navigate("/auth");
                setMenuOpen(false);
              }}
              className="text-left text-gray-600 hover:text-orange-500"
            >
              Sign In
            </button>

            <button
              onClick={handleBecomeProvider}
              className="bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
            >
              Become a Provider
            </button>

          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;