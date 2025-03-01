import React from "react";
import { Outlet } from "react-router-dom"; // Import Outlet to render child routes
import SidebarProvider from "@/components/ui/sidebar";
import Sidebar from "@/components/sidebar";

const LandOwnerPage = () => {
  return (
    <div className="flex">
      <SidebarProvider>
        <Sidebar />
        <main className="flex-1 p-6">
          <Outlet /> {/* This will render child components */}
        </main>
      </SidebarProvider>
    </div>
  );
};

export default LandOwnerPage;
