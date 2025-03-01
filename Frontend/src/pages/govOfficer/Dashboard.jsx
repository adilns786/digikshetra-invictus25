import React from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  Home,
  ListFilter,
  MessageSquare,
  Shield,
  User,
  BarChart3,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const GovernmentDashboard = () => {
  return (
    <div className="space-y-8 p-6 md:p-8 lg:p-10 xl:p-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-4xl font-bold tracking-tight">Government Dashboard</h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Welcome! Manage property verifications and user data here.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild className="px-5 py-3 text-base md:text-lg">
            <Link to="/government/verify-properties">
              <CheckCircle className="mr-2 h-6 w-6" />
              Verify Properties
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Total Properties",
            count: 45,
            change: "+5 from last month",
            icon: <Home className="h-6 w-6 text-muted-foreground" />,
          },
          {
            title: "Pending Verifications",
            count: 12,
            change: "+3 from last week",
            icon: <Shield className="h-6 w-6 text-muted-foreground" />,
          },
          {
            title: "Verified Properties",
            count: 33,
            change: "+2 from last month",
            icon: <CheckCircle className="h-6 w-6 text-muted-foreground" />,
          },
          {
            title: "User Reports",
            count: 8,
            change: "+1 from last week",
            icon: <User className="h-6 w-6 text-muted-foreground" />,
          },
        ].map((item, index) => (
          <Card
            key={index}
            className="shadow-lg hover:shadow-xl transition rounded-xl p-4"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{item.count}</div>
              <p className="text-sm text-muted-foreground">{item.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        {/* Pending Verifications */}
        <Card className="col-span-4 shadow-lg hover:shadow-xl transition rounded-xl p-5">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Pending Verifications
            </CardTitle>
            <CardDescription className="text-base">
              Properties awaiting approval
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-5 rounded-lg border p-4 bg-white hover:bg-gray-100 transition"
                >
                  <div className="flex-1 space-y-2">
                    <p className="text-lg font-medium">Property #{i}</p>
                    <p className="text-sm text-muted-foreground">
                      Submitted by John Doe • {i} day{i !== 1 ? "s" : ""} ago
                    </p>
                  </div>
                  <Button variant="outline" size="lg">
                    Verify
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Verified Properties */}
        <Card className="col-span-3 shadow-lg hover:shadow-xl transition rounded-xl p-5">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Recent Verified Properties
            </CardTitle>
            <CardDescription className="text-base">
              Properties approved recently
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {[
                { name: "Riverside Villa", daysAgo: 2 },
                { name: "Mountain View Cottage", daysAgo: 4 },
                { name: "Downtown Apartment", daysAgo: 6 },
              ].map((property, i) => (
                <div
                  key={i}
                  className="flex items-center gap-5 rounded-lg border p-4 bg-white hover:bg-gray-100 transition"
                >
                  <div className="flex-1 space-y-2">
                    <p className="text-lg font-medium">{property.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Verified {property.daysAgo} days ago
                    </p>
                  </div>
                  <Button variant="outline" size="lg">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GovernmentDashboard;