import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../Firebase/config"; // Update import path
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import MapCard from "./component/MapCard";
import { CheckCircle } from "lucide-react";

const steps = [
  "Property Details",
  "Ownership History",
  "Nearby Landmarks",
  "Contact Details",
  "Legal Compliance",
];

export default function AddNewProperty() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    propertyType: "",
    area: "",
    price: "",
    description: "",
    amenities: "",
    restrictions: "",
    coordinates: "",
    ownershipHistory: "",
    nearbyLandmarks: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    legalCompliance: "",
    Approved: false,
  });

  // Load/save to localStorage (keep if you need draft functionality)
  useEffect(() => {
    const savedFormData = localStorage.getItem("propertyFormData");
    if (savedFormData) setFormData(JSON.parse(savedFormData));

    // Set contactName and contactEmail from sessionStorage
    const name = sessionStorage.getItem("name");
    const email = sessionStorage.getItem("email");
    if (name && email) {
      setFormData((prevData) => ({
        ...prevData,
        contactName: name,
        contactEmail: email,
      }));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("propertyFormData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Firebase document structure
      const propertyData = {
        ...formData,
        metadata: {
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          status: "draft",
        },
        // Convert string numbers to numbers
        area: Number(formData.area),
        price: Number(formData.price),
      };

      // Step 1: Add document to Firestore
      const docRef = await addDoc(collection(db, "PropertyData"), propertyData);
      console.log("Document written with ID: ", docRef.id);

      // Step 2: Send data to your server at /predict (only if Firebase upload is successful)
      try {
        const response = await fetch("http://localhost:8000/api/predict/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(propertyData), // Send the same data to your server
        });

        if (!response.ok) {
          throw new Error("Failed to send data to server");
        }

        const result = await response.json();
        console.log("Server response:", result);
      } catch (serverError) {
        console.error("Error sending data to server:", serverError);
        // Handle server error (e.g., log it or show a warning)
        toast.warning("Property saved to Firebase, but failed to send to server.");
      }

      // Clear local storage
      localStorage.removeItem("propertyFormData");

      toast.success("Property saved successfully! 🎉");

      // Redirect to media upload page with new document ID
      navigate(`/landowner/properties/new/media/${docRef.id}`);
    } catch (firebaseError) {
      console.error("Error saving property to Firebase:", firebaseError);
      toast.error("Failed to save property. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link to="/landowner/properties">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Add New Property</h2>
          <p className="text-muted-foreground">
            Fill in the details to list a new property for sale
          </p>
        </div>
      </div>

      <div className="flex justify-between">
        {steps.map((s, index) => (
          <div
            key={index}
            className={`text-sm font-medium ${
              index <= step ? "text-blue-600" : "text-gray-400"
            }`}
          >
            {index <= step ? (
              <CheckCircle className="inline-block mr-2" />
            ) : (
              "○"
            )}{" "}
            {s}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left Column */}
          {step === 0 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Property Details</CardTitle>
                  <CardDescription>
                    Basic information about your property
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <Input
                    id="title"
                    placeholder="Brief description"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    id="location"
                    placeholder="Address or GPS coordinates"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                  <div className="grid gap-4 grid-cols-2">
                    <Select
                      onValueChange={(value) =>
                        setFormData({ ...formData, propertyType: value })
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="agricultural">
                          Agricultural
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      id="area"
                      type="number"
                      placeholder="Total area (sqft)"
                      value={formData.area}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Asking price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                  <Textarea
                    id="description"
                    placeholder="Detailed description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </CardContent>
              </Card>
            </div>
          )}
          {step === 1 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ownership History</CardTitle>
                  <CardDescription>
                    Provide details of previous ownership
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    id="ownershipHistory"
                    placeholder="Previous owners and transfer dates"
                    value={formData.ownershipHistory}
                    onChange={handleChange}
                  />
                </CardContent>
              </Card>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Nearby Landmarks</CardTitle>
                  <CardDescription>
                    List nearby schools, hospitals, etc.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    id="nearbyLandmarks"
                    placeholder="Schools, hospitals, etc."
                    value={formData.nearbyLandmarks}
                    onChange={handleChange}
                  />
                </CardContent>
              </Card>
              <MapCard formData={formData} handleChange={handleChange} />
            </div>
          )}
          {step === 3 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Details</CardTitle>
                  <CardDescription>
                    Provide contact information for inquiries
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    id="contactName"
                    placeholder="Contact person's name"
                    value={formData.contactName}
                    onChange={handleChange}
                    readOnly // Make the field read-only
                    required
                  />
                  <Input
                    id="contactPhone"
                    type="tel"
                    placeholder="Contact phone number"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    id="contactEmail"
                    type="email"
                    placeholder="Contact email"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    readOnly // Make the field read-only
                    required
                  />
                </CardContent>
              </Card>
            </div>
          )}
          {step === 4 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Legal Compliance</CardTitle>
                  <CardDescription>
                    Provide legal and environmental details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    id="legalCompliance"
                    placeholder="Legal or environmental restrictions"
                    value={formData.legalCompliance}
                    onChange={handleChange}
                  />
                </CardContent>
              </Card>
            </div>
          )}

          <div className="space-y-6">
            <div className="flex justify-between mt-6">
              {step > 0 && (
                <Button type="button" onClick={() => setStep(step - 1)}>
                  Previous
                </Button>
              )}
              {step < 5 ? (
                <Button type="button" onClick={() => setStep(step + 1)}>
                  Next
                </Button>
              ) : (
                <Button type="submit">Save</Button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}