
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { db } from "../../Firebase/config";
// import { doc, getDoc } from "firebase/firestore";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Check both "User" and "Register Officer" collections
//       const userRef = doc(db, "User", email);
//       const officerRef = doc(db, "Register Officer", email);

//       const userDoc = await getDoc(userRef);
//       const officerDoc = await getDoc(officerRef);

//       let userData = null;
//       let role = "";

//       if (userDoc.exists()) {
//         userData = userDoc.data();
//         role = "User";
//       } else if (officerDoc.exists()) {
//         userData = officerDoc.data();
//         role = "Register Officer";
//       }

//       if (!userData) {
//         alert("User not found!");
//         return;
//       }

//       if (userData.password !== password) {
//         alert("Incorrect password!");
//         return;
//       }

//       // Store user session details
//       sessionStorage.setItem("email", email);
//       sessionStorage.setItem("role", role);
//       sessionStorage.setItem("name", userData.name);

//       alert("Login successful!");
//       navigate("/"); // Redirect to dashboard
//     } catch (error) {
//       console.error("Login error:", error);
//       alert("Error logging in. Please try again.");
//     }
//   };

//   return (
//     <div className="flex h-screen justify-center items-center bg-gray-100">
//       <div className="bg-white lg:flex-row flex-col lg:p-8 p-6 rounded-lg shadow-lg flex lg:w-3/4 h-4/5">
//         <div className="lg:w-1/2 w-full items-center justify-center lg:p-6">
//           <h1 className="text-3xl font-bold mb-4">Welcome to DigiKshetra</h1>
//           <h2 className="text-sm mb-4">Secure & Transparent Land Records Management</h2>

//           <form onSubmit={handleSubmit} className="w-full">
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="border-gray-300 border rounded-md px-4 py-2 mb-4 w-full"
//               placeholder="Email"
//               required
//             />
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="border-gray-300 border rounded-md px-4 py-2 mb-4 w-full"
//               placeholder="Password"
//               required
//             />
//             <button type="submit" className="bg-blue-800 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600">
//               Sign In
//             </button>
//           </form>
//           <p className="mt-4">
//             Don't have an account?{" "}
//             <a href="/signup" className="text-blue-800">Sign up</a>
//           </p>
//         </div>
//         <div className="lg:w-1/2 w-full flex items-center justify-center">
//           <img
//             src="https://images.unsplash.com/photo-1522881451255-f59ad836fdfb?q=80&w=1935&auto=format&fit=crop"
//             alt="DigiKshetra Login"
//             className="rounded-lg object-cover w-full h-full"
//           />
//           {/* <Spline scene="https://prod.spline.design/5jdsuHrsjExhFJua/scene.splinecode" /> */}
  

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../Firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userRef = doc(db, "User", email);
      const officerRef = doc(db, "Register Officer", email);
      const userDoc = await getDoc(userRef);
      const officerDoc = await getDoc(officerRef);

      let userData = null;
      let role = "";
      if (userDoc.exists()) {
        userData = userDoc.data();
        role = "User";
      } else if (officerDoc.exists()) {
        userData = officerDoc.data();
        role = "Register Officer";
      }

      if (!userData) return alert("User not found!");
      if (userData.password !== password) return alert("Incorrect password!");

      sessionStorage.setItem("email", email);
      sessionStorage.setItem("role", userData.role);
      sessionStorage.setItem("name", userData.name);
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      alert("Error logging in. Please try again.");
    }
  };

  return (
    <div className="flex items-center w-full justify-center min-h-screen bg-gradient-to-b from-gray-800 to-gray-900">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="bg-white shadow-2xl rounded-2xl flex flex-col md:flex-row overflow-hidden max-w-4xl w-full mx-4 md:mx-0"
      >
        {/* Left Side */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800">Welcome to DigiKshetra</h1>
          <p className="text-gray-600 mt-2">Secure & Transparent Land Records Management</p>
          <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">
              <span className="font-semibold">User Login (for testing):</span>
              <br />
              <span className="text-sm">Email: adilns786@gmail.com</span>
              <br />
              <span className="text-sm">Password: 12345</span>
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Gov Officer Login (for testing):</span>
              <br />
              <span className="text-sm">Email: testofficer@gmail.com</span>
              <br />
              <span className="text-sm">Password: 12345</span>
            </p>
          </div>
        </div>
         
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              required
            />
            <button 
              type="submit" 
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
            >
              Sign In
            </button>
          </form>
          <p className="mt-4 text-gray-600 text-sm">
            Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
          </p>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 hidden md:block">
          <img 
            src="https://images.unsplash.com/photo-1522881451255-f59ad836fdfb?q=80&w=1935&auto=format&fit=crop" 
            alt="DigiKshetra Login"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
