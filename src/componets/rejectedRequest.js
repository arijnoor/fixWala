import {
  LayoutDashboard,
  Users,
  UserCheck,
  UserX,
  Clock3,
  Settings,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  
  approveUser,

  deleteUser,

  getRejectedUser,

  getUserById,
  getUsers,
  rejectUser,
} from "../service/userService";
import { useNavigate } from "react-router-dom";
function RejectedRequest() {
const [users, setUsers] = useState([]);

useEffect(() => {
    const loadUsers = async () => {
  
    const data = await getRejectedUser();
    setUsers(data);
  
  };
  loadUsers();
}, []);
const handleDelete = async (id) => {
  await deleteUser(id);

  setUsers((prev) => prev.filter((user) => user._id !== id));
};

const handleApprove = async (id) => {
  
    await approveUser(id);

    setUsers((prev) => prev.filter((user) => user._id !== id));
 
};
const navigate=useNavigate();
 const [showLogoutModal, setShowLogoutModal] = useState(false);
 const handleLogout = () => {
  localStorage.removeItem("user"); // agar user localStorage me save hai

  setShowLogoutModal(false);

  navigate("/");
};
    return (
        <div>
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
             <div className="min-h-screen bg-gray-100 flex">
            
      <aside className="w-64 bg-orange-600 text-white flex flex-col">

        <div className="text-3xl font-bold p-6 border-b border-orange-500">
          FixWala
        </div>

        <nav className="flex-1 mt-6">

          <button onClick={ ()=>navigate("/dashboard")}  className="w-full flex items-center gap-3 px-6 py-4 hover:bg-orange-700 transition">
            <LayoutDashboard size={20} />
            Dashboard
          </button>

          <button onClick={ ()=>navigate("/totalUser")} className="w-full flex items-center gap-3 px-6 py-4 hover:bg-orange-700 transition">
            <Users size={20} />
            Users
          </button>

          <button onClick={ ()=>navigate("/setting")} className="w-full flex items-center gap-3 px-6 py-4 hover:bg-orange-700 transition">
            <Settings size={20} />
            Settings
          </button>

        <button   onClick={() => setShowLogoutModal(true)} className="w-full flex items-center gap-3 px-6 py-4 hover:bg-orange-700 transition">
            <LogOut size={20} />
            Logout
          </button>

        </nav>

      </aside>
      <div className="flex-1">
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
                <div className="p-8">
  <h2 className="text-2xl font-bold mb-6">Rejected Requests</h2>

  <div className="grid gap-5">
    {users.map((user) => (
      <div
        key={user._id}
        className="bg-white shadow rounded-lg p-5 flex justify-between items-center"
      >
        <div>
          
          <h3 className="font-bold text-lg">{user.fullName}</h3>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-500">{user.phone}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => handleApprove(user._id)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Accept
          </button>
  <button
    onClick={() => handleDelete(user._id)}
    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
  >
    Delete
  </button>
          
        </div>
      </div>
    ))}
  </div>
</div>
        </div>

        </div>
         </div>
      );
}

export default RejectedRequest;