

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../Firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { TextField, Button, MenuItem } from "@mui/material";
import { Person, Email, Lock, LocationOn, Phone, Gavel } from "@mui/icons-material";
import config from '../../config';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    aadhaarId: "",
    password: "",
    confirmPassword: "",
    role: "User",
    dob: "", 
    panNumber: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const verificationData = {
      name: formData.name,
      dob: formData.dob,
      phone_number: formData.phone,
      aadhaar_number: formData.aadhaarId,
      pan_number: formData.panNumber,
    };

    try {
      const response = await fetch(`${config.apiBaseUrl}/api-auth/verify/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(verificationData),
      });

      if (!response.ok) throw new Error("Verification failed");

      const result = await response.json();

      if (result.status === "success") {
        alert("Verification successful! Details fully verified ✅");

        await setDoc(doc(db, formData.role, formData.email), {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          location: formData.location,
          aadhaarId: formData.aadhaarId,
          panNumber: formData.panNumber,
          role: formData.role,
          password: formData.password,
        });

        alert("Signup successful! Welcome to DigiKshetra.");
        navigate("/login");
      } else {
        alert("Verification failed. Please check your details.");
      }
    } catch (error) {
      console.error("Error during verification: ", error);
      alert("Verification failed. Try again!");
    }
  };

  return (
    <div className="flex justify-center h-fit items-center py-20 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="bg-white lg:flex-row flex-col lg:p-8 p-6 rounded-lg shadow-lg flex lg:w-3/4">
        <div className="lg:w-1/2 w-full items-center justify-center lg:p-6">
          <h1 className="text-3xl font-bold mb-4 text-blue-700">
            DigiKshetra - Secure Land Ownership 
          </h1>
          <p className="mb-6 text-gray-600">
            Join DigiKshetra for secure, transparent, and fraud-free land transactions.
          </p>
          <form onSubmit={handleSubmit} className="w-full">
            <TextField label="Full Name" name="name" value={formData.name} onChange={handleChange} fullWidth margin="normal" required InputProps={{ startAdornment: <Person /> }} />
            <TextField label="Date of Birth (YYYY-MM-DD)" name="dob" value={formData.dob} onChange={handleChange} fullWidth margin="normal" required InputProps={{ startAdornment: <Person /> }} />
            <TextField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} fullWidth margin="normal" required InputProps={{ startAdornment: <Phone /> }} />
            <TextField label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} fullWidth margin="normal" required InputProps={{ startAdornment: <Email /> }} />
            <TextField label="Location (City, State)" name="location" value={formData.location} onChange={handleChange} fullWidth margin="normal" required InputProps={{ startAdornment: <LocationOn /> }} />
            <TextField select label="Role" name="role" value={formData.role} onChange={handleChange} fullWidth margin="normal" required>
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Register Officer">Register Officer</MenuItem>
            </TextField>
            <TextField label="Aadhaar ID" name="aadhaarId" value={formData.aadhaarId} onChange={handleChange} fullWidth margin="normal" required InputProps={{ startAdornment: <Gavel /> }} />
            <TextField label="PAN Number" name="panNumber" value={formData.panNumber} onChange={handleChange} fullWidth margin="normal" required InputProps={{ startAdornment: <Gavel /> }} />
            <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} fullWidth margin="normal" required InputProps={{ startAdornment: <Lock /> }} />
            <TextField label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} fullWidth margin="normal" required InputProps={{ startAdornment: <Lock /> }} />
            <Button type="submit" variant="contained" color="primary" fullWidth className="mt-4">
              Sign Up
            </Button>
          </form>
          <p className="mt-4">
            Already registered? <a href="/login" className="text-blue-600">Log in here</a>
          </p>
        </div>
        <div className="lg:w-1/2 w-full flex items-center justify-center">
          <img src="https://images.unsplash.com/photo-1522881451255-f59ad836fdfb?q=80&w=1935&auto=format&fit=crop" alt="Land Ownership" className="rounded-lg object-cover w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
