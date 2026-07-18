import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signupUser, loginUser } from "../service/userService";

function Auth() {
  const navigate = useNavigate();
const location=useLocation()
  const [isLogin, setIsLogin] = useState(!location.state?.signup);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
  
        const data = {
          email,
          password,
        };

        const res = await loginUser(data);
console.log("Login Response:", res);
        localStorage.setItem("user", JSON.stringify(res));

        if (res.role === "admin") {

    navigate("/dashboard");

} else {

    navigate(location.state?.redirectTo || "/");

}    
    }
 else {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      
        const data = {
          fullName,
          email,
          password,
        };

        await signupUser(data);

alert("Account Created Successfully");

navigate(location.state?.redirectTo || "/");

        setIsLogin(true);

        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    
      
      
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">

        <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">
          {isLogin ? "Sign In" : "Sign Up"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>

          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          )}

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}

          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-orange-600 font-semibold hover:underline"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>

        </p>

      </div>
    </div>
  );
}

export default Auth;