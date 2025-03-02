import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, MapPin, Clock, User, CheckCircle, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { db } from "../../Firebase/config";
import { collection, getDocs } from "firebase/firestore";

const VerifiedProperties = () => {
  const [verifiedProperties, setVerifiedProperties] = useState([]);

  // Fetch properties where Approved is true
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "PropertyData"));
        const properties = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((property) => property.Approved === true); // Ensure boolean check

        setVerifiedProperties(properties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="space-y-6 p-6 md:p-8 lg:p-10 xl:p-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Verified Properties</h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Browse through properties that have been approved.
          </p>
        </div>
      </div>

      {/* List of Verified Properties */}
      <div className="space-y-6">
        {verifiedProperties.length === 0 ? (
          <p className="text-center text-gray-500">No verified properties available.</p>
        ) : (
          verifiedProperties.map((property) => (
            <Card key={property.id} className="shadow-lg hover:shadow-xl transition rounded-xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{property.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Property Details */}
                  <div className="flex items-center gap-4">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <p className="text-muted-foreground">{property.location || "N/A"}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Home className="h-5 w-5 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      {property.propertyType || "Unknown"} • {property.area || "N/A"} sqft
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Submitted by {property.contactName || "N/A"} ({property.contactEmail || "N/A"})
                    </p>
                  </div>
                  {property.contactNumber && (
                    <div className="flex items-center gap-4">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <p className="text-muted-foreground">Phone: {property.contactNumber}</p>
                    </div>
                  )}
                  <div className="flex items-center gap-4">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Verified on{" "}
                      {property.updatedAt?.seconds
                        ? new Date(property.updatedAt.seconds * 1000).toLocaleDateString()
                        : "Unknown"}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-4">
                    <Button variant="outline" asChild>
                      <Link to={`/property/${property.id}`}>View Details</Link>
                    </Button>
                    <Button variant="default" className="bg-green-600" disabled>
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Verified
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default VerifiedProperties;
