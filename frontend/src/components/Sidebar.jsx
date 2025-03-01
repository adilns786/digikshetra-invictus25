
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  ListFilter,
  Map,
  MessageSquare,
  PlusCircle,
  Settings,
  User,
  Calculator,
  Heart,
  Star,
  Search,
  Menu,
  X
} from "lucide-react";

import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Mobile Sidebar Toggle */}
      <button 
        className="md:hidden p-2 fixed top-4 left-4 z-50 bg-primary text-white rounded-full shadow-lg" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      
      {/* Sidebar Container */}
      <div 
        className={`fixed md:relative top-0 left-0 h-full bg-white shadow-lg transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} w-64 md:w-72 z-40`}
      >
        <SidebarHeader className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Map className="h-6 w-6" />
            <span className="text-lg font-bold">Real Estate Portal</span>
          </div>
          
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          {/* Landowner Section */}
          <SidebarGroup>
            <SidebarGroupLabel>Landowner Portal</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/landowner">
                      <Home />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/landowner/properties">
                      <ListFilter />
                      <span>Property Listings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/landowner/properties/new">
                      <PlusCircle />
                      <span>Add New Property</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/landowner/inquiries">
                      <MessageSquare />
                      <span>Inquiries & Offers</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />

          {/* Buyer Section */}
          <SidebarGroup>
            <SidebarGroupLabel>Buyer Portal</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/buyer">
                      <Home />
                      <span>Buyer Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/buyer/search">
                      <Search />
                      <span>Search Properties</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/buyer/favorites">
                      <Heart />
                      <span>Favorites</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/buyer/calculator">
                      <Calculator />
                      <span>Mortgage Calculator</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/buyer/reviews">
                      <Star />
                      <span>Reviews & Ratings</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />

          {/* Account Section */}
          <SidebarGroup>
            <SidebarGroupLabel>Account</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/landowner/profile">
                      <User />
                      <span>Profile Management</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/landowner/help">
                      <Settings />
                      <span>Help & Support</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarFooter className="p-4">
            <div className="flex items-center gap-2 rounded-md border p-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <User className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">John Doe</span>
                <span className="text-xs text-muted-foreground">john.doe@example.com</span>
              </div>
            </div>
          </SidebarFooter>
        </SidebarContent>
      </div>
    </div>
  );
};

export default Sidebar;