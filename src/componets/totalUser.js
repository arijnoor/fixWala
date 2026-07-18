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
import { getUsers } from "../service/userService"
import { useNavigate } from "react-router-dom";
function TotalUser() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
useEffect(() => {
  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  fetchUsers();
}, []);
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

          <button onClick={()=> navigate("/dashboard")}  className="w-full flex items-center gap-3 px-6 py-4 hover:bg-orange-700 transition">
            <LayoutDashboard size={20} />
            Dashboard
          </button>

          <button  className="w-full flex items-center gap-3 px-6 py-4 hover:bg-orange-700 transition">
            <Users size={20} />
            Users
          </button>

          <button  onClick={()=> navigate("/setting")} className="w-full flex items-center gap-3 px-6 py-4 hover:bg-orange-700 transition">
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

  <div className="bg-white rounded-xl shadow">

    <div className="p-5 border-b">
      <h2 className="text-2xl font-bold text-orange-600">
        Total User
      </h2>
    </div>
    <div className="overflow-x-auto">
  <table className="w-full">
    <thead className="bg-orange-50">
      <tr>
        <th className="text-left p-4">Image</th>
        <th className="text-left p-4">Name</th>
        <th className="text-left p-4">Business</th>
        <th className="text-left p-4">Email</th>
        <th className="text-left p-4">Phone</th>
        <th className="text-left p-4">Role</th>
        <th className="text-left p-4">Status</th>
      </tr>
    </thead>

    <tbody>
      {users.map((user) => (
        <tr
          key={user._id}
          className="border-b hover:bg-gray-50"
        >
          <td className="p-4">
            <img
              src={`http://localhost:5000/upload/${user.img}`}
              alt=""
              className="w-14 h-14 rounded-full object-cover"
            />
          </td>

          <td className="p-4 font-medium">{user.fullName}</td>

          <td className="p-4">{user.businessName}</td>

          <td className="p-4">{user.email}</td>

          <td className="p-4">{user.phone}</td>

          <td className="p-4 capitalize">{user.role}</td>

          <td className="p-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                user.status === "Approved"
                  ? "bg-green-100 text-green-700"
                  : user.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {user.status}
            </span>
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
        </div>
     );
}

export default TotalUser;