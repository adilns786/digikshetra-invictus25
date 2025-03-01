import { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";
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
  "Documents & Media",
];
export default function AddNewProperty() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  // const { toast } = useToast();
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
    photos: [],
    videos: [],
    documents: [],
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };


  const handleFileUpload = async (e, field) => {
    const files = e.target.files;
    const uploadedUrls = [];

    for (let file of files) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "your_cloudinary_preset");
      
      const res = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/upload", {
        method: "POST",
        body: data,
      });

      const fileData = await res.json();
      uploadedUrls.push(fileData.secure_url);
    }

    setFormData({ ...formData, [field]: [...formData[field], ...uploadedUrls] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/newproperty", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save property");
      }

      const result = await response.json();
      toast({
        title: "Success",
        description: "Property saved successfully!",
        status: "success",
      });
      console.log("Property saved:", result);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save property. Please try again.",
        status: "error",
      });
      console.error("Error saving property:", error);
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
          <h2 className="text-3xl font-bold tracking-tight">
            Add New Property
          </h2>
          <p className="text-muted-foreground">
            Fill in the details to list a new property for sale
          </p>
        </div>
      </div>

      <div className="flex justify-between">
        {steps.map((s, index) => (
          <div key={index} className={`text-sm font-medium ${index <= step ? "text-blue-600" : "text-gray-400"}`}>
            {index <= step ? <CheckCircle className="inline-block mr-2" /> : "○"} {s}
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
                      <SelectItem value="agricultural">Agricultural</SelectItem>
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
            <MapCard formData={formData} handleChange={handleChange}/>
            <Card>
            <CardHeader>
              <CardTitle>GIS Mapping</CardTitle>
              <CardDescription>Define property boundaries</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video w-full bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                Map Interface Placeholder
              </div>
              <Input id="coordinates" placeholder="GPS coordinates" value={formData.coordinates} onChange={handleChange} />
            </CardContent>
            
          </Card>
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

            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
                <CardDescription>Upload required documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "Title Deed",
                  "Encumbrance Certificate",
                  "Property Tax Receipts",
                  "Identification Proofs",
                ].map((doc, index) => (
                  <div key={index} className="space-y-2">
                    <label className="text-sm font-medium">{doc}</label>
                    <input
                      type="file"
                      id={`document-${index}`}
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, "documents")}
                    />
                    <label htmlFor={`document-${index}`} className="w-full">
                      <Button variant="outline" className="w-full" asChild>
                        <div>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload {doc}
                        </div>
                      </Button>
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>
            </div>
          )}
           {step === 5 && (
          

         
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Photos and Videos</CardTitle>
                <CardDescription>Upload media files</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Property Photos</label>
                  <input
                    type="file"
                    id="photos"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "photos")}
                  />
                  <label htmlFor="photos" className="w-full">
                    <Button variant="outline" className="w-full" asChild>
                      <div>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Photos
                      </div>
                    </Button>
                  </label>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Property Videos (Optional)
                  </label>
                  <input
                    type="file"
                    id="videos"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "videos")}
                  />
                  <label htmlFor="videos" className="w-full">
                    <Button variant="outline" className="w-full" asChild>
                      <div>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Videos
                      </div>
                    </Button>
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        <div className="space-y-6">
<div className="flex justify-between mt-6">
          {step > 0 && <Button onClick={() => setStep(step - 1)}>Previous</Button>}
          {step < 5 ? <Button onClick={() => setStep(step + 1)}>Next</Button> : <Button type="submit">Save </Button>}
        </div>
      </div>
    </div>
    </form>
    </div>
  );
}
