import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import React from "react";
import Login from "./pages/registration/Login";
import Signup from "./pages/registration/Signup";
import GamifiedNavbar from "./pages/landingpage/Navbar";
import LandOwnerPage from "./pages/Landowner/LandOwnerPage";
import Dashboard from "./pages/Landowner/Dashboard";
import PropertyListings from "./pages/Landowner/PropertyListings";
import Inquiries from "./pages/Landowner/Enquires";
import ProfileManagement from "./pages/Landowner/Profile";
import HelpSupport from "./pages/Landowner/Help";
import Sidebar from "@/components/sidebar";
import LandingPage from "./pages/home/home";
import PropertyDetails from "./pages/property/property";
import { Toaster } from "@/components/ui/sonner";
import AddNewProperty from "./pages/property/AddNewProperty";
import BuyerDashboard from "./pages/buyer/BuyerDashboard";
import SearchProperties from "./pages/buyer/SearchProperties";
import MortgageCalculator from "./pages/buyer/Calculator";
import ReviewsAndRatings from "./pages/buyer/ReviewsAndRatings";
import Favorites from "./pages/buyer/Favourites";
import SidebarProvider from "@/components/ui/sidebar";
import GovernmentDashboard from "./pages/govOfficer/Dashboard";
import VerifyProperties from "./pages/govOfficer/VerifyProperty";
import ImageUpload from "./pages/property/component/ImageUpload";
import VerifiedProperties from "./pages/govOfficer/VerifiedProperties";
import Ledger from "./pages/ledger/ledger";
import BlockDetails from "./pages/ledger/DLID";
import UserProperties from "./pages/Landowner/MyProperty";
import Navbar from "./components/Navbar";
import MapPlotting from "./components/MapPlotting";
import LawyerDashboard from "./pages/lawyer/LawyerDashboard";
import VerifyTransactions from "./pages/govOfficer/VerifyTransactions";

const PrivateRoute = ({ children, role }) => {
  const userRole = sessionStorage.getItem("role");
  return userRole === role ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Content />
    </BrowserRouter>
  );
};

const Content = () => {
  const location = useLocation();
  const showSidebar =
    location.pathname.startsWith("/landowner") ||
    location.pathname.startsWith("/gov");

  const showNavbar = !(
    location.pathname.startsWith("/landowner") ||
    location.pathname.startsWith("/gov") ||
    location.pathname.startsWith("/ledger")
  );

  return (
    <SidebarProvider>
      <div className="flex w-full h-screen">
        {showSidebar && <Sidebar className="w-64" />}
        {/* Show navbar except for specific routes like ledger, landowner, and government routes */}
        {showNavbar && <Navbar />}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Landowner Routes */}
          <Route
            path="landowner"
            element={
              <PrivateRoute role="User">
                <LandOwnerPage />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="properties/new" element={<AddNewProperty />} />
            <Route path="myproperty" element={<UserProperties />} />
            <Route path="properties" element={<PropertyListings />} />
            <Route path="properties/new/media/:id" element={<ImageUpload />} />
            <Route path="inquiries" element={<Inquiries />} />
            <Route path="profile" element={<ProfileManagement />} />
            <Route path="help" element={<HelpSupport />} />
          </Route>
          <Route path="/lawyer" element={<LawyerDashboard />} />
          <Route path="/landowner" element={<LandOwnerPage />}>
            <Route index element={<Dashboard />} />
            <Route path="properties" element={<PropertyListings />} />
            <Route path="properties/new/media/:id" element={<ImageUpload />} />
            <Route path="properties/new" element={<AddNewProperty />} />
            <Route path="inquiries" element={<Inquiries />} />
            <Route path="profile" element={<ProfileManagement />} />
            <Route path="help" element={<HelpSupport />} />
          </Route>
          <Route
            path="/gov"
            element={
              <PrivateRoute role="Register Officer">
                <LandOwnerPage />
              </PrivateRoute>
            }
          >
            <Route index element={<GovernmentDashboard />} />
            <Route path="verify-properties" element={<VerifyProperties />} />
            <Route
              path="verified-properties"
              element={<VerifiedProperties />}
            />
            <Route
              path="Verify-transactions"
              element={<VerifyTransactions />}
            />

            <Route path="properties/new" element={<AddNewProperty />} />
            <Route path="inquiries" element={<Inquiries />} />
            <Route path="profile" element={<ProfileManagement />} />
            <Route path="help" element={<HelpSupport />} />
          </Route>
          {/* Buyer Routes */}
          <Route path="landowner/buyer" element={<BuyerDashboard />} />
          <Route path="/buyer/search" element={<SearchProperties />} />
          <Route path="/landowner/favorites" element={<Favorites />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route
            path="/landowner/calculator"
            element={<MortgageCalculator />}
          />
          <Route path="/landowner/reviews" element={<ReviewsAndRatings />} />

          <Route path="/map" element={<MapPlotting />} />

          {/* Ledger Routes */}
          <Route path="ledger" element={<Ledger />} />
          <Route path="/blockchain-details/:dlid" element={<BlockDetails />} />

          {/* <Toaster /> */}
        </Routes>
      </div>
    </SidebarProvider>
  );
};

export default App;
