import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { db } from "../../Firebase/config";
// import { doc, getDoc } from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userDoc = await getDoc(doc(db, "users", email)); // Check Firestore using email as the document ID

      if (!userDoc.exists()) {
        alert("User not found!");
        return;
      }

      const userData = userDoc.data();
      if (userData.password !== password) {
        alert("Incorrect password!");
        return;
      }

      // Store email and role in session storage
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("role", userData.role);
      sessionStorage.setItem("name", userData.name);

      alert("Login successful!");
      navigate("/"); // Redirect to dashboard
    } catch (error) {
      console.error("Login error:", error);
      alert("Error logging in. Please try again.");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="bg-white lg:flex-row flex-col lg:p-8 p-6 rounded-lg shadow-lg flex lg:w-3/4 h-4/5">
        <div className="lg:w-1/2 w-full items-center justify-center lg:p-6">
          <h1 className="text-3xl font-bold mb-4">Welcome to DigiKshetra</h1>
          <h2 className="text-sm mb-4">
            Secure & Transparent Land Records Management
          </h2>
         
          <form onSubmit={handleSubmit} className="w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-gray-300 border rounded-md px-4 py-2 mb-4 w-full"
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-gray-300 border rounded-md px-4 py-2 mb-4 w-full"
              placeholder="Password"
              required
            />
            <button
              type="submit"
              className="bg-blue-800 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600"
            >
              Sign In
            </button>
          </form>
          <p className="mt-4">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-800">
              Sign up
            </a>
          </p>
        </div>
        <div className="lg:w-1/2 w-full flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1522881451255-f59ad836fdfb?q=80&w=1935&auto=format&fit=crop"
            alt="DigiKshetra Login"
            className="rounded-lg object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
