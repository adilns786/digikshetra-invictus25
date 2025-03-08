import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Home, MapPin, Clock, User, XCircle, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { db } from "../../Firebase/config";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import config from '../../config';

const VerifyProperties = () => {
  const [pendingProperties, setPendingProperties] = useState([]);
  const [fraudPredictions, setFraudPredictions] = useState({});

  // Fetch properties where Approved is false
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "PropertyData"));
        const properties = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((property) => property.Approved === false);

        setPendingProperties(properties);

        // Fetch fraud predictions for each property
        properties.forEach((property) => {
          fetchFraudPrediction(property);
        });
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  // Function to fetch fraud prediction
  const fetchFraudPrediction = async (property) => {
    try {
      const payload = mapPropertyToPredictPayload(property);

      const response = await fetch(`${config.apiBaseUrl}/api/predict/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to fetch fraud prediction");

      const result = await response.json();
      setFraudPredictions((prev) => ({
        ...prev,
        [property.id]: result.is_fraud,
      }));
    } catch (error) {
      console.error("Error fetching fraud prediction:", error);
    }
  };

  // Function to map Firebase property data to the predict route payload
  const mapPropertyToPredictPayload = (property) => {
    const now = new Date();
    const timestamp = now.toISOString();

    return {
      property_type: property.propertyType || "unknown",
      area_sqft: property.area || 0,
      location: property.location || "unknown",
      amenities: property.amenities || "",
      nearby_landmarks: property.nearbyLandmarks || "",
      has_extract7_12: !!property.documents?.extract7_12,
      has_mutation_certificate: !!property.documents?.mutationCertificate,
      has_property_tax_receipt: !!property.documents?.propertyTaxReceipt,
      has_sale_deed: !!property.documents?.saleDeed,
      legal_compliance_complete: !!property.legalCompliance,
      price: property.price || 0,
      price_change_percent: 0, // Placeholder, replace with actual data if available
      transaction_speed_days: calculateDaysOnMarket(property.createdAt),
      multiple_transaction_30days: false, // Placeholder
      seller_previous_fraud: false, // Placeholder
    };
  };

  // Helper function to calculate days on market
  const calculateDaysOnMarket = (createdAt) => {
    if (!createdAt?.seconds) return 0;
    const createdDate = new Date(createdAt.seconds * 1000);
    const now = new Date();
    const diffTime = Math.abs(now - createdDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

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

                  {/* Fraud Prediction */}
                  {fraudPredictions[property.id] && (
                    <div className="flex items-center gap-4">
                      <p className="text-muted-foreground">
                        Fraud Prediction:{" "}
                        <span
                          className={`font-semibold ${
                            fraudPredictions[property.id][0] ? "text-red-600" : "text-green-600"
                          }`}
                        >
                          {fraudPredictions[property.id][0] ? "Fraudulent" : "Legitimate"} (
                          {(fraudPredictions[property.id][1] * 100).toFixed(2)}%)
                        </span>
                      </p>
                    </div>
                  )}

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