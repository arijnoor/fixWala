import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    changePassword,
  getAdminProfile,
  updateAdminProfile,
} from "../service/userService";
function Setting() {
    const navigate = useNavigate();

const [fullName, setFullName] = useState("");
const [email, setEmail] = useState("");
const [message, setMessage] = useState("");
const [currentPassword, setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const [passwordMessage, setPasswordMessage] = useState("");
const [passwordError, setPasswordError] = useState("");
const [showLogoutModal, setShowLogoutModal] = useState(false);
const user = JSON.parse(localStorage.getItem("user"));
const id = user._id;
const handleUpdate = async () => {
  await updateAdminProfile(id, {
    fullName,
    email,
  });

  setMessage("Profile Updated Successfully");

  const updatedUser = {
    ...user,
    fullName,
    email,
  };

  localStorage.setItem("user", JSON.stringify(updatedUser));
};
const handleChangePassword = async () => {

  setPasswordError("");
  setPasswordMessage("");

  if (!currentPassword || !newPassword || !confirmPassword) {
    setPasswordError("Please fill all fields.");
    return;
  }

  if (newPassword !== confirmPassword) {
    setPasswordError("New Password and Confirm Password do not match.");
    return;
  }

  try {

    const res = await changePassword(id, {
      currentPassword,
      newPassword,
    });

    setPasswordMessage(res.message);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

  } catch (err) {

    setPasswordError(
      err.response?.data?.message || "Something went wrong."
    );

  }
};
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

<button
onClick={() => navigate("/dashboard")}
className="w-full flex items-center gap-3 px-6 py-4 hover:bg-orange-700"
>
<LayoutDashboard size={20}/>
Dashboard
</button>

<button
onClick={() => navigate("/totalUser")}
className="w-full flex items-center gap-3 px-6 py-4 hover:bg-orange-700"
>
<Users size={20}/>
Users
</button>

<button
className="w-full flex items-center gap-3 px-6 py-4 bg-orange-700"
>
<Settings size={20}/>
Settings
</button>

<button  onClick={() => setShowLogoutModal(true)} 
className="w-full flex items-center gap-3 px-6 py-4 hover:bg-orange-700"
>
<LogOut size={20}/>
Logout
</button>

</nav>

</aside>

{/* Main */}

<div className="flex-1">

<header className="bg-white shadow px-8 py-5">

<h1 className="text-3xl font-bold text-orange-600">
Settings
</h1>

</header>

<div className="p-8">

<div className="bg-white rounded-xl shadow p-8">

<h2 className="text-2xl font-bold text-orange-600 mb-6">
Admin Profile
</h2>

{message && (
<p className="text-green-600 mb-5 font-medium">
{message}
</p>
)}

<div className="space-y-5">

<div>

<label className="block mb-2 font-medium">
Full Name
</label>

<input
type="text"
value={fullName}
onChange={(e)=>setFullName(e.target.value)}
className="w-full border rounded-lg p-3 focus:outline-none focus:border-orange-600"
/>

</div>

<div>

<label className="block mb-2 font-medium">
Email
</label>

<input
type="email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="w-full border rounded-lg p-3 focus:outline-none focus:border-orange-600"
/>

</div>

<button
onClick={handleUpdate}
className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700"
>

Save Changes

</button>

</div>

</div>
<div className="bg-white rounded-xl shadow p-8 mt-8">

  <h2 className="text-2xl font-bold text-orange-600 mb-6">
    Change Password
  </h2>

  {passwordError && (
    <p className="text-red-600 font-medium mb-4">
      {passwordError}
    </p>
  )}

  {passwordMessage && (
    <p className="text-green-600 font-medium mb-4">
      {passwordMessage}
    </p>
  )}

  <div className="space-y-5">

    <div>

      <label className="block mb-2 font-medium">
        Current Password
      </label>

      <input
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        className="w-full border rounded-lg p-3 focus:outline-none focus:border-orange-600"
      />

    </div>

    <div>

      <label className="block mb-2 font-medium">
        New Password
      </label>

      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full border rounded-lg p-3 focus:outline-none focus:border-orange-600"
      />

    </div>

    <div>

      <label className="block mb-2 font-medium">
        Confirm Password
      </label>

      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full border rounded-lg p-3 focus:outline-none focus:border-orange-600"
      />

    </div>

    <button
      onClick={handleChangePassword}
      className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg"
    >
      Update Password
    </button>

  </div>

</div>

</div>

</div>

</div>
);
}

export default Setting;