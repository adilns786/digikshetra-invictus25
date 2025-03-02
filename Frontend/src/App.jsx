
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import React from "react";
import Login from "./pages/registration/Login";
import Signup from "./pages/registration/Signup";
// import LandingPage from "./pages/landingpage/LandingPage";
import GamifiedNavbar from "./pages/landingpage/Navbar";
import LandOwnerPage from "./pages/Landowner/LandOwnerPage";
import Dashboard from "./pages/Landowner/Dashboard";
import PropertyListings from "./pages/Landowner/PropertyListings";
import Inquiries from "./pages/Landowner/Enquires";
import ProfileManagement from "./pages/Landowner/Profile";
import HelpSupport from "./pages/Landowner/Help";
import Sidebar from "@/components/sidebar";
// import { Button } from "@/components/ui/button";
import LandingPage from "./pages/home/home";
import PropertyDetails from "./pages/property/property";
import { Toaster } from "@/components/ui/sonner";
import AddNewProperty from "./pages/property/AddNewProperty";
// Buyer Pages
import BuyerDashboard from "./pages/buyer/BuyerDashboard";
import SearchProperties from "./pages/buyer/SearchProperties";

import MortgageCalculator from "./pages/buyer/Calculator";
import ReviewsAndRatings from "./pages/buyer/ReviewsAndRatings";
import Favorites from "./pages/buyer/Favourites";

import SidebarProvider from "@/components/ui/sidebar";
import GovernmentDashboard from "./pages/govOfficer/Dashboard";
import VerifyProperties from "./pages/govOfficer/VerifyProperty";
import ImageUpload from "./pages/property/component/ImageUpload";

const App = () => {
  return (
    <BrowserRouter>
      <Content />
    </BrowserRouter>
  );
};

const Content = () => {
  const location = useLocation();
  const showSidebar = location.pathname.startsWith("/landowner") || location.pathname.startsWith("/gov");

  return (
    <SidebarProvider>
    <div className="flex w-full h-screen">
      {showSidebar && <Sidebar className="w-64"/>} {/* Show sidebar for buyers & landowners */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Landowner Routes */}
        <Route path="/landowner" element={<LandOwnerPage />}>
          <Route index element={<Dashboard />} />
          <Route path="properties" element={<PropertyListings />} />
          <Route path="properties/new/media" element={<ImageUpload />} />

          <Route path="properties/new" element={<AddNewProperty />} />
          <Route path="inquiries" element={<Inquiries />} />
          <Route path="profile" element={<ProfileManagement />} />
          <Route path="help" element={<HelpSupport />} />
        </Route>
        <Route path="/gov" element={<LandOwnerPage />}>
          <Route index element={<GovernmentDashboard/>} />
          <Route path="verify-properties" element={<VerifyProperties />} />
          
          <Route path="properties/new" element={<AddNewProperty />} />
          <Route path="inquiries" element={<Inquiries />} />
          <Route path="profile" element={<ProfileManagement />} />
          <Route path="help" element={<HelpSupport />} />
        </Route>
        {/* Buyer Routes */}
        <Route path="/buyer" element={<BuyerDashboard />} />
        <Route path="/buyer/search" element={<SearchProperties />} />
        <Route path="/buyer/favorites" element={<Favorites />} />
        <Route path="/buyer/property/:id" element={<PropertyDetails />} />
        <Route path="/buyer/calculator" element={<MortgageCalculator />} />
        <Route path="/buyer/reviews" element={<ReviewsAndRatings />} />
      </Routes>
      <Toaster />

      </div>
    
    </SidebarProvider>
  );
};

export default App;