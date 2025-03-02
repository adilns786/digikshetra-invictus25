import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
  Shield,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
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
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const govItems = [
    {
      label: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      path: "/gov",
    },
    {
      label: "Verify Properties",
      icon: <Shield className="h-5 w-5" />,
      path: "/gov/verify-properties",
    },
    {
      label: "Verified Properties",
      icon: <CheckCircle className="h-5 w-5" />,
      path: "/gov/verified-properties",
    },
    {
      label: "Verify Transactions",
      icon: <User className="h-5 w-5" />,
      path: "/gov/verify-transactions",
    },
  ];
  const userItems = [
    {
      label: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      path: "/landowner",
    },
    {
      label: "Property Listings",
      icon: <ListFilter className="h-5 w-5" />,
      path: "/landowner/properties",
    },
    {
      label: "My Properties",
      icon: <Home className="h-5 w-5" />,
      path: "/landowner/myproperty",
    },
    {
      label: "Buyer Search",
      icon: <ListFilter className="h-5 w-5" />,
      path: "landowner/buyer",
    },

    {
      label: "Add New Property",
      icon: <PlusCircle className="h-5 w-5" />,
      path: "/landowner/properties/new",
    },
    {
      label: "Favorites",
      icon: <Heart className="h-5 w-5" />,
      path: "/landowner/favorites",
    },
    {
      label: "Mortgage Calculator",
      icon: <Calculator className="h-5 w-5" />,
      path: "/landowner/calculator",
    },
    {
      label: "Reviews & Ratings",
      icon: <Star className="h-5 w-5" />,
      path: "/landowner/reviews",
    },
    {
      label: "Inquiries",
      icon: <MessageSquare className="h-5 w-5" />,
      path: "/landowner/inquiries",
    },
    {
      label: "Profile Management",
      icon: <User className="h-5 w-5" />,
      path: "landowner/profile",
    },
    {
      label: "Help & Support",
      icon: <Settings className="h-5 w-5" />,
      path: "landowner/help",
    },
  ];

  return (
    <div
      className={`sidebar h-screen flex flex-col bg-background border-r transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <SidebarHeader className="flex items-center justify-between p-4">
        <Link to="/">
          <div className="flex items-center gap-2">
            <Map className="h-6 w-6" />
            {!isCollapsed && (
              <span className="text-lg font-bold">Real Estate Portal</span>
            )}
          </div>
        </Link>
        <button onClick={toggleCollapse} className="p-2 hover:bg-muted rounded">
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent className="flex-1 overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "hidden" : ""}>
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {location.pathname.startsWith("/landowner") &&
                userItems.map((item, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton
                      asChild
                      className={`flex items-center gap-3 p-3 hover:bg-muted rounded ${
                        location.pathname === item.path ? "bg-muted" : ""
                      }`}
                    >
                      <Link to={item.path}>
                        {item.icon}
                        {!isCollapsed && <span>{item.label}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
            <SidebarMenu>
              {location.pathname.startsWith("/gov") &&
                govItems.map((item, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton
                      asChild
                      className={`flex items-center gap-3 p-3 hover:bg-muted rounded ${
                        location.pathname === item.path ? "bg-muted" : ""
                      }`}
                    >
                      <Link to={item.path}>
                        {item.icon}
                        {!isCollapsed && <span>{item.label}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div
          className={`flex items-center gap-2 rounded-md border p-2 ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <User className="h-4 w-4" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-medium">John Doe</span>
              <span className="text-xs text-muted-foreground">
                john.doe@example.com
              </span>
            </div>
          )}
        </div>
      </SidebarFooter>
    </div>
  );
};

export default Sidebar;
