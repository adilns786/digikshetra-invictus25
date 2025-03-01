import React from "react";
import { Link } from "react-router-dom";
import { BarChart3, Home, ListFilter, MessageSquare, PlusCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your properties and activities.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link to="/landowner/properties/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Property
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Properties", count: 12, change: "+2 from last month", icon: <Home className="h-4 w-4 text-muted-foreground" /> },
          { title: "Active Listings", count: 8, change: "+1 from last month", icon: <ListFilter className="h-4 w-4 text-muted-foreground" /> },
          { title: "New Inquiries", count: 5, change: "+3 from last week", icon: <MessageSquare className="h-4 w-4 text-muted-foreground" /> },
          { title: "Property Views", count: 423, change: "+22% from last month", icon: <BarChart3 className="h-4 w-4 text-muted-foreground" /> },
        ].map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.count}</div>
              <p className="text-xs text-muted-foreground">{item.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Inquiries</CardTitle>
            <CardDescription>You have 5 new inquiries this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 rounded-lg border p-3">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Inquiry about Riverside Property</p>
                    <p className="text-sm text-muted-foreground">from John Smith • {i} day{i !== 1 ? "s" : ""} ago</p>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Properties</CardTitle>
            <CardDescription>Your recently added properties</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Riverside Villa", daysAgo: 2 },
                { name: "Mountain View Cottage", daysAgo: 4 },
                { name: "Downtown Apartment", daysAgo: 6 },
              ].map((property, i) => (
                <div key={i} className="flex items-center gap-4 rounded-lg border p-3">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{property.name}</p>
                    <p className="text-sm text-muted-foreground">Added {property.daysAgo} days ago</p>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;