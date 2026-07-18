import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ProviderCTA = () => {
  return (
    <section >
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Content */}
          <div className="max-w-2xl">
            <span className="inline-block bg-orange-100 text-orange-600 font-semibold px-4 py-2 rounded-full text-sm">
              Join FixWala Today
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-5">
              Are you a service provider?
            </h2>

            <p className="text-gray-600 mt-4 text-lg leading-8">
              Create your profile in minutes and start receiving customers
              near you. Grow your business with FixWala and reach thousands
              of people looking for trusted services every day.
            </p>
          </div>

          {/* Right Button */}
          <div>
            <Link
              to="/userForm2"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-4 rounded-xl transition duration-300 shadow-lg"
            >
              Create Your Profile
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProviderCTA;