
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Home, MapPin, Clock, User, XCircle, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { db } from "../../Firebase/config";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

const VerifyProperties = () => {
  const [pendingProperties, setPendingProperties] = useState([]);

  // Fetch properties where Approved is false
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "PropertyData"));
        const properties = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((property) => property.Approved === false);
console.log(properties)
        setPendingProperties(properties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);
  const handleUpdateStatus = async (id, isApproved, property) => {
    try {
      if (isApproved) {
        // Prepare required fields for the Genesis block API
        const payload = {
          dlid: generateDLID(), // Generate unique DLID
          area: property.area,
          owner_name: property.contactName, // Mapping contact name as owner name
          landmark: property.nearbyLandmarks,
          property_type: property.propertyType,
          price: property.price,
        };
  
        // Post to the Genesis Ledger API
        const response = await fetch("http://127.0.0.1:8000/ledgers/create-genesis/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
  
        if (!response.ok) throw new Error("Failed to post to ledger");
  
        const result = await response.json();
  
        if (result.message === "Genesis block created successfully") {
          alert("Property successfully posted to ledger ✅");
  
          // Update Firestore after successful ledger creation
          const propertyRef = doc(db, "PropertyData", id);
          await updateDoc(propertyRef, {
            Approved: true,
            DLID: payload.dlid,
            updatedAt: new Date(),
          });
  
          setPendingProperties((prev) => prev.filter((p) => p.id !== id));
        } else {
          alert("Failed to post to ledger. Property not approved.");
        }
      } else {
        // Reject property without sending to ledger
        const propertyRef = doc(db, "PropertyData", id);
        await updateDoc(propertyRef, { Approved: false });
  
        setPendingProperties((prev) => prev.filter((p) => p.id !== id));
        alert("Property rejected.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update property status.");
    }
  };
  
  

  // Function to generate a unique DLID based on timestamp
  const generateDLID = () => {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2); 
    const month = (now.getMonth() + 1).toString().padStart(2, "0"); 
    const date = now.getDate().toString().padStart(2, "0");
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const milliseconds = now.getMilliseconds().toString().padStart(3, "0");

    return `DL${year}${month}${date}${hours}${minutes}${seconds}${milliseconds}`;
  };

  
  // const handleUpdateStatus = async (id, isApproved) => {
  //   try {
  //     const propertyRef = doc(db, "PropertyData", id);
  //     const updateData = {
  //       Approved: isApproved,
  //       updatedAt: new Date(),
  //     };

  //     if (isApproved) {
  //       updateData.DLID = generateDLID(); // Assign unique DLID on approval
  //     }

  //     await updateDoc(propertyRef, updateData);

      
  //     setPendingProperties((prev) => prev.filter((property) => property.id !== id));

  //     alert(`Property ${isApproved ? "approved" : "rejected"}!`);
  //   } catch (error) {
  //     console.error("Error updating status:", error);
  //     alert("Failed to update property status.");
  //   }
  // };

  return (
    <div className="space-y-6 p-6 md:p-8 lg:p-10 xl:p-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Pending Properties</h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Review and approve/reject properties submitted by users.
          </p>
        </div>
      </div>

      {/* List of Pending Properties */}
      <div className="space-y-6">
        {pendingProperties.length === 0 ? (
          <p className="text-center text-gray-500">No pending properties.</p>
        ) : (
          pendingProperties.map((property) => (
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
                      Submitted on{" "}
                      {property.createdAt?.seconds
                        ? new Date(property.createdAt.seconds * 1000).toLocaleDateString()
                        : "Unknown"}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-4">
                    <Button variant="outline" asChild>
                      <Link to={`/property/${property.id}`}>View Details</Link>
                    </Button>
                    <Button
  variant="default"
  className="bg-green-600 hover:bg-green-700"
  onClick={() => handleUpdateStatus(property.id, true, property)}
>
  <CheckCircle className="mr-2 h-5 w-5" />
  Approve
</Button>


                    <Button
                      variant="destructive"
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => handleUpdateStatus(property.id, false)}
                    >
                      <XCircle className="mr-2 h-5 w-5" />
                      Reject
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

export default VerifyProperties;
