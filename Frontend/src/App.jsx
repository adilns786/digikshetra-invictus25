import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import React from "react";
import Login from "./pages/registration/Login";
import Signup from "./pages/registration/Signup";
// import LandingPage from "./pages/landingpage/LandingPage";
import GamifiedNavbar from "./pages/landingpage/Navbar";
import LandOwnerPage from "./pages/Landowner/LandOwnerPage";
import Dashboard from "./pages/Landowner/Dashboard";
import PropertyListings from "./pages/Landowner/PropertyListings";
import AddProperty from "./pages/Landowner/AddNewProperty";
import Inquiries from "./pages/Landowner/Enquires";
import ProfileManagement from "./pages/Landowner/Profile";
import HelpSupport from "./pages/Landowner/Help";
import Sidebar from "@/components/sidebar";
// import { Button } from "@/components/ui/button";
import LandingPage from "./pages/home/home";

const App = () => {
  return (
    <BrowserRouter>
      <Content />
    </BrowserRouter>
  );
};

const Content = () => {
  const location = useLocation();
  // const isLandownerPage = location.pathname.startsWith("/landowner");

  return (
    <div className="flex">
   
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Landowner Pages with Sidebar */}
        <Route path="/landowner" element={<LandOwnerPage />}>
          <Route index element={<Dashboard />} />
          <Route path="properties" element={<PropertyListings />} />
          <Route path="properties/new" element={<AddProperty />} />
          <Route path="inquiries" element={<Inquiries />} />
          <Route path="profile" element={<ProfileManagement />} />
          <Route path="help" element={<HelpSupport />} />
        </Route>
      </Routes>
   
      </div>
    
  );
};

export default App;
