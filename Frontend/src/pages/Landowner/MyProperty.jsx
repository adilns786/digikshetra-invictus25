import { useState, useEffect } from "react";
import { db } from "../../Firebase/config"; // Update import path
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function UserProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const userEmail = sessionStorage.getItem("email"); // Get logged-in user's email

  // Fetch properties added by the logged-in user
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "PropertyData"));
        const userProperties = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.contactEmail === userEmail) {
            userProperties.push({ id: doc.id, ...data });
          }
        });
        setProperties(userProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
        toast.error("Failed to fetch properties.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [userEmail]);

  // Mark property as Sold
  const markAsSold = async (propertyId) => {
    try {
      const propertyRef = doc(db, "PropertyData", propertyId);
      await updateDoc(propertyRef, {
        status: "sold",
      });
      toast.success("Property marked as Sold!");
      // Update local state to reflect the change
      setProperties((prevProperties) =>
        prevProperties.map((property) =>
          property.id === propertyId
            ? { ...property, status: "sold" }
            : property
        )
      );
    } catch (error) {
      console.error("Error marking property as Sold:", error);
      toast.error("Failed to mark property as Sold.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Your Properties</h2>
      <p className="text-muted-foreground">
        View and manage properties you have added.
      </p>

      {properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <Card key={property.id}>
              <CardHeader>
                <CardTitle>{property.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  <strong>Location:</strong> {property.location}
                </p>
                <p>
                  <strong>Price:</strong> ${property.price}
                </p>
                <p>
                  <strong>Area:</strong> {property.area} sqft
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`font-bold ${
                      property.status === "sold" ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {property.status || "Available"}
                  </span>
                </p>
                {property.status !== "sold" && (
                  <Button
                    variant="outline"
                    onClick={() => markAsSold(property.id)}
                  >
                    Mark as Sold
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}