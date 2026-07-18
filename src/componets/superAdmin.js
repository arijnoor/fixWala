import { useEffect, useState } from "react";
import { approveUser, getUsers, rejectUser } from "../service/userService";

function SuperAdmin() {

  const [provider, setprovider] = useState([]);

  const getProviders = async () => {
    const dataOfProvider = await getUsers()
    console.log(dataOfProvider)
    setprovider(dataOfProvider);
  }


  useEffect(() => {
    getProviders();
  }, []);

  const handleReject = async (id) => {
    await rejectUser(id);
   await getProviders()
  }

  const handleApprove = async (id) => {
    await approveUser(id);
   await getProviders()
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-orange-600 mb-8">
        Super Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {provider.map((p) => (
          <div
            key={p._id}
            className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <img
               src={`http://localhost:5000/upload/${p.img}`}
              alt={p.fullName}
               className="flex-1 text-white py-2 rounded-3xl"
            />

            <h2 className="text-2xl font-bold text-center mt-4 text-gray-800">
              {p.fullName}
            </h2>

            <p className="mt-4 text-gray-700 font-medium">
              Category: {p.category}
            </p>

            <p className="mt-2 text-gray-700 font-medium">
              City: {p.city}
            </p>

            <p className="mt-2 text-gray-700 font-medium">
              Phone: {p.phone}
            </p>

           

            <p className="mt-2 text-orange-600 font-bold">
              Starting From: Rs. {p.startingPrice}
            </p>
            <p>Status : {p.status}</p>
            
            <div className="flex gap-3 mt-6">
              <button className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                onClick={() => handleApprove(p._id)}>
                Approve
              </button>

              <button className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                onClick={() => handleReject(p._id)}>
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
}

export default SuperAdmin;