import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Home, MapPin, Clock, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const VerifyProperties = () => {
  // Mock data for pending properties (replace with API call)
  const [pendingProperties, setPendingProperties] = useState([
    {
      id: 1,
      title: "Riverside Villa",
      location: "123 River Road, Riverside",
      propertyType: "Residential",
      area: "1200 sqft",
      price: "$250,000",
      description: "A beautiful villa with a scenic view of the river.",
      contactName: "John Doe",
      contactPhone: "+91 98765 43210",
      contactEmail: "john.doe@example.com",
      submittedDate: "2023-10-01",
    },
    {
      id: 2,
      title: "Mountain View Cottage",
      location: "45 Mountain View, Highland",
      propertyType: "Agricultural",
      area: "5000 sqft",
      price: "$150,000",
      description: "A cozy cottage with a stunning mountain view.",
      contactName: "Jane Smith",
      contactPhone: "+91 98765 12345",
      contactEmail: "jane.smith@example.com",
      submittedDate: "2023-10-05",
    },
  ]);

  // Fetch pending properties from the backend (replace with actual API call)
  useEffect(() => {
    // Example: Fetch pending properties
    // fetch("/api/pending-properties")
    //   .then((response) => response.json())
    //   .then((data) => setPendingProperties(data))
    //   .catch((error) => console.error("Error fetching properties:", error));
  }, []);

  return (
    <div className="space-y-6 p-6 md:p-8 lg:p-10 xl:p-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Pending Properties</h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Review and approve properties submitted by users.
          </p>
        </div>
      </div>

      {/* List of Pending Properties */}
      <div className="space-y-6">
        {pendingProperties.map((property) => (
          <Card
            key={property.id}
            className="shadow-lg hover:shadow-xl transition rounded-xl"
          >
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                {property.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Property Details */}
                <div className="flex items-center gap-4">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <p className="text-muted-foreground">{property.location}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Home className="h-5 w-5 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    {property.propertyType} • {property.area}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Submitted by {property.contactName} ({property.contactEmail})
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Submitted on {property.submittedDate}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4">
                  <Button variant="outline" asChild>
                    <Link to={`/property/${property.id}`}>View Details</Link>
                  </Button>
                  <Button variant="default" className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Approve
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VerifyProperties;