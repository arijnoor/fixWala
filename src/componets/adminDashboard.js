import {
  LayoutDashboard,
  Users,
  UserCheck,
  UserX,
  Clock3,
  Settings,
  LogOut,
} from "lucide-react";
import { getActiveProvider, getPendingRequest, getRejectedRequest, getTotalUser, getUsers } from "../service/userService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function AdminDashboard() {
  const [activeProvider, setActiveProvider] = useState(0);
const [totalUser, setTotalUser] = useState(0);
const [pendingRequest, setPendingRequest] = useState (0);
const [rejectedRequest, setRejectedRequest] = useState(0);
const [providers, setProviders] = useState([]);
const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate=useNavigate();
useEffect(() => {
  const fetchData = async () => {
    setActiveProvider(await getActiveProvider());
    setTotalUser(await getTotalUser());
    setPendingRequest(await getPendingRequest());
    setRejectedRequest(await getRejectedRequest());
  };


  fetchData();
}, []);
useEffect(() => {
  const fetchProviders = async () => {
    const data = await getUsers(); // ya jo bhi tumhari API hai
    setProviders(data);
  };

  fetchProviders();
}, []);
const handleLogout = () => {
  localStorage.removeItem("user"); // agar user localStorage me save hai

  setShowLogoutModal(false);

  navigate("/");
};
  return (
    <div className="min-h-screen bg-gray-100 flex">
{showLogoutModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl shadow-xl p-6 w-96">
      <h2 className="text-2xl font-bold text-orange-600 mb-3">
        Logout
      </h2>

      <p className="text-gray-600 mb-6">
        Are you sure you want to logout?
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowLogoutModal(false)}
          className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          onClick={handleLogout}
          className="px-5 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700"
        >
          OK
        </button>
      </div>
    </div>
  </div>
)}
      {/* Sidebar */}

      <aside className="w-64 bg-orange-600 text-white flex flex-col">

        <div className="text-3xl font-bold p-6 border-b border-orange-500">
          FixWala
        </div>

        <nav className="flex-1 mt-6">

          <button  className="w-full flex items-center gap-3 px-6 py-4 hover:bg-orange-700 transition">
            <LayoutDashboard size={20} />
            Dashboard
          </button>

          <button onClick={()=> navigate("/totalUser")}  className="w-full flex items-center gap-3 px-6 py-4 hover:bg-orange-700 transition">
            <Users size={20} />
            Users
          </button>

          <button  onClick={()=> navigate("/setting")} className="w-full flex items-center gap-3 px-6 py-4 hover:bg-orange-700 transition">
            <Settings size={20} />
            Settings
          </button>

          <button   onClick={() => setShowLogoutModal(true)}  className="w-full flex items-center gap-3 px-6 py-4 hover:bg-orange-700 transition">
            <LogOut size={20} />
            Logout
          </button>

        </nav>

      </aside>

      {/* Main Content */}

      <div className="flex-1">

        {/* Navbar */}

        <header className="bg-white shadow px-8 py-5 flex justify-between items-center">

          <h1 className="text-3xl font-bold text-orange-600">
            Admin Dashboard
          </h1>

          <div className="flex items-center gap-3">
            {/* <img
              src="https://i.pravatar.cc/40"
              alt=""
              className="w-10 h-10 rounded-full"
            /> */}

            <div>
              <h3 className="font-semibold">Admin</h3>
              <p className="text-sm text-gray-500">Administrator</p>
            </div>
          </div>

        </header>

        {/* Dashboard */}

        <div className="p-8">

          {/* Cards */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {/* Active Providers */}

            <div  onClick={()=> navigate("/totalUser")} className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-600">

              <div className="flex justify-between">

               <div>
                 <h2 className="text-gray-500">
                  Total User
                 </h2>


                  <h2 className="text-4xl font-bold mt-2">
                 {totalUser}
                  </h2>
                </div>

                <div className="bg-orange-100 p-3 rounded-full">
                  <UserCheck className="text-orange-600" />
                </div>

              </div>

            </div>

            {/* Users */}

            <div  onClick={()=> navigate("/activePro")} className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-600">

              <div className="flex justify-between">

                 <div>
                  <p className="text-gray-500">
                    Active Providers
                  </p>

                 <h2 className="text-4xl font-bold mt-2">{activeProvider}</h2>
                </div>

               

                <div className="bg-orange-100 p-3 rounded-full">
                  <Users className="text-orange-600" />
                </div>

              </div>

            </div>

            {/* Pending */}

            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-600" 
            onClick={()=> navigate("/pending")}>

              <div className="flex justify-between">

                <div>
                  <p className="text-gray-500">
                    Pending Requests
                  </p>

                <h2 className="text-4xl font-bold mt-2">{pendingRequest}</h2>
                </div>

                <div className="bg-orange-100 p-3 rounded-full">
                  <Clock3 className="text-orange-600" />
                </div>

              </div>

            </div>

            {/* Rejected */}

            <div  onClick={()=> navigate("/rejected")}
            className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">

              <div className="flex justify-between">

                <div>
                  <p className="text-gray-500">
                    Rejected Requests
                  </p>

                  <h2 className="text-4xl font-bold mt-2">{rejectedRequest}</h2>
                </div>

                <div className="bg-red-100 p-3 rounded-full">
                  <UserX className="text-red-500" />
                </div>

              </div>

            </div>

          </div>

          {/* Table */}
<div className="bg-white mt-10 rounded-xl shadow-lg overflow-hidden border border-orange-100">

  {/* Heading */}
  <div className="px-6 py-5 border-b flex justify-between items-center">
    <div>
      <h2 className="text-xl font-bold text-gray-800">
        Recent User Requests
      </h2>
     
    </div>

   
  </div>

  {/* Table */}
  <div className="overflow-x-auto">

    <table className="w-full">

      <thead className="bg-orange-600 text-white">

        <tr>
 <th className="py-4 px-6 text-left">
  Image
  </th>
          <th className="py-4 px-6 text-left">
            Name
          </th>

          <th className="px-6 text-center">
            Status
          </th>

          <th className="px-6 text-center">
            Category
          </th>

          <th className="px-6 text-center">
            Action
          </th>

        </tr>

      </thead>

      <tbody>

        {providers.map((provider) => (

          <tr
            key={provider._id}
            className="border-b "
          >
<td>
    <img
                  src={`http://localhost:5000/upload/${provider.img}`}
                  alt=""
                  className="w-14 h-14 rounded-full object-cover"
                />
</td>
            {/* Name */}
            <td className="py-4 px-6">

              <div>
              
                <h3 className="font-semibold text-gray-800">
                  {provider.fullName}
                </h3>

                <p className="text-sm text-gray-500">
                  {provider.email}
                </p>
              </div>

            </td>

            {/* Status */}
            <td className="text-center">

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  provider.status === "Approved"
                    ? "bg-green-100 text-green-600"
                    : provider.status === "Pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {provider.status}
              </span>

            </td>

            {/* Category */}
           <td className="py-4 px-6 text-center">
  <div className="flex flex-wrap justify-center items-center gap-2">
    {provider.category?.map((cat, index) => (
      <span
        key={index}
        className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium"
      >
        {cat}
      </span>
    ))}
  </div>
</td>
            {/* Action */}
            <td className="text-center">

              <button
                onClick={() => navigate(`/details/${provider._id}`)}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm transition"
              >
                View Details
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>

  </div>

</div>

        </div>

     
  );
}

export default AdminDashboard;