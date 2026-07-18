import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Logo & About */}
        <div>
          <h2 className="text-3xl font-bold text-orange-500">
            Fix<span className="text-white">Wala</span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-400">
            FixWala connects you with trusted professionals for all your home
            and business service needs. Fast, reliable and affordable services
            at your doorstep.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3">
            <li>
              <a href="/" className="hover:text-orange-500 transition">
                Home
              </a>
            </li>

            <li>
              <a href="/providers" className="hover:text-orange-500 transition">
                Providers
              </a>
            </li>

            <li>
              <a href="/about" className="hover:text-orange-500 transition">
                About Us
              </a>
            </li>

            <li>
              <a href="/contact" className="hover:text-orange-500 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-5">
            Popular Services
          </h3>

          <ul className="space-y-3">
            <li>Electrical</li>
            <li>Plumbing</li>
            <li>Painting</li>
            <li>Cleaning</li>
            <li>Carpentry</li>
            <li>AC Technician</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-5">
            Contact
          </h3>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-orange-500" />
              <span>Rawalpindi, Pakistan</span>
            </div>

            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-orange-500" />
              <span>+92 300 1234567</span>
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope className="text-orange-500" />
              <span>support@fixwala.com</span>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 pt-4">
              <a
                href="a"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-orange-600 flex items-center justify-center transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="a"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-orange-600 flex items-center justify-center transition"
              >
                <FaInstagram />
              </a>

              <a
                href="a"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-orange-600 flex items-center justify-center transition"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 py-5 text-center text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="text-orange-500 font-semibold">FixWala</span>. All
        Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;