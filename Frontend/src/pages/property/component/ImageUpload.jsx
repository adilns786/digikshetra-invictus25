import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { db } from "../../../Firebase/config"; // Update import path
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import config from '../../../config';

const ImageUpload = () => {
  const { id } = useParams(); // Extract property ID from the URL
  const [documents, setDocuments] = useState({
    saleDeed: null,
    extract7_12: null,
    mutationCertificate: null,
    propertyTaxReceipt: null,
  });
  const [propertyImages, setPropertyImages] = useState([]); // For property display images
  const [isUploading, setIsUploading] = useState(false);

  // Handle file selection for documents
  const handleDocumentUpload = (e, field) => {
    const file = e.target.files[0];
    setDocuments((prev) => ({ ...prev, [field]: file }));
  };

  // Handle file selection for property images
  const handlePropertyImageUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setPropertyImages(selectedFiles);
  };


  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "invictus"); // Replace with your upload preset
    data.append("cloud_name", "dycqmvz0s"); // Replace with your cloud name
    
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dycqmvz0s/upload`, // Replace with your cloud name
        {
          method: "POST",
          body: data,
        }
      );
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error?.message || "Failed to upload to Cloudinary");
      }
      const fileData = await res.json();
      console.log(fileData.secure_url)

      return fileData.secure_url; // Return the secure URL of the uploaded file
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  };
  const uploadToServer = async (file, type) => {
    // Validate the type parameter
    if (type !== "property-images" ) {
        type = "documents"
    //   throw new Error("Invalid upload type. Must be 'property-images' or 'documents'.");
    }
  
    const formData = new FormData();
    formData.append("files", file); // Append the file
    formData.append("type", type); // Append the upload type
    console.log(documents)
    try {
      const response = await fetch(`${config.apiBaseUrl}/api/upload/`, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json(); // Parse error response if available
        throw new Error(errorData.error || "Failed to upload to server");
      }
  
      const result = await response.json();
      return result.fileUrl; // Assuming your server returns { fileUrl: "..." }
    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
      throw error; // Re-throw the error for handling in the calling function
    }
  };
  // Handle form submission
  const handleSubmit = async () => {
    if (
      !documents.saleDeed ||
      !documents.extract7_12 ||
      !documents.mutationCertificate ||
      !documents.propertyTaxReceipt ||
      propertyImages.length === 0
    ) {
      toast.error("Please upload all required documents and property images");
      return;
    }
  
    setIsUploading(true);
  
    try {
      // Upload documents to Cloudinary and server in parallel
      const documentUploads = Object.entries(documents).map(
        async ([field, file]) => {
          if (!file) {
            console.error(`No file provided for ${field}`);
            return { field, url: null };
          }
  
          try {
            const cloudinaryUrl = await uploadToCloudinary(file);
            await uploadToServer(file, "documents"); // Use "documents" as the type
            return { field, url: cloudinaryUrl };
          } catch (error) {
            console.error(`Error uploading ${field}:`, error);
            await uploadToServer(file, "documents"); // Ensure file is uploaded to server even if Cloudinary fails
            return { field, url: null }; // Return null if Cloudinary fails
          }
        }
      );
  
      // Upload property images to Cloudinary and server in parallel
      const propertyImageUploads = propertyImages.map(async (file) => {
        if (!file) {
          console.error("No file provided for property image");
          return null;
        }
  
        try {
          const cloudinaryUrl = await uploadToCloudinary(file);
          await uploadToServer(file, "property-images");
          return cloudinaryUrl;













        } catch (error) {
          console.error("Error uploading property image:", error);
          await uploadToServer(file, "property-images");
          return null; // Return null if Cloudinary fails
        }
      });
  
      // Wait for all uploads to complete
      const documentResults = await Promise.all(documentUploads);
      const propertyImageUrls = await Promise.all(propertyImageUploads);
  
      // Prepare data for Firestore
      const documentUrls = {};
      documentResults.forEach(({ field, url }) => {
        if (url) {
          documentUrls[field] = url; // Store Cloudinary URLs (null if upload failed)
        }
      });
  
      // Update Firestore document with the uploaded URLs
      const propertyRef = doc(db, "PropertyData", id);
      await updateDoc(propertyRef, {
        documents: documentUrls,
        propertyImages: propertyImageUrls.filter((url) => url !== null), // Filter out null values
        metadata: {
          updatedAt: new Date().toISOString(),
        },
      });
  
      toast.success("Files uploaded successfully!");
      setDocuments({
        saleDeed: null,
        extract7_12: null,
        mutationCertificate: null,
        propertyTaxReceipt: null,
      });
      setPropertyImages([]);
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("Failed to upload files. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4 p-4">
      {/* Document Upload Section */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Upload Documents</label>
        {[
          { field: "saleDeed", label: "Property Sale Deed" },
          { field: "extract7_12", label: "7/12 Extract" },
          { field: "mutationCertificate", label: "Mutation Certificate" },
          { field: "propertyTaxReceipt", label: "Property Tax Receipt" },
        ].map(({ field, label }) => (
          <div key={field} className="space-y-2">
            <label className="text-sm font-medium">{label}</label>
            <input
              type="file"
              id={field}
              className="hidden"
              onChange={(e) => handleDocumentUpload(e, field)}
              accept=".pdf,.jpg,.jpeg,.png"
            />
            <label htmlFor={field} className="w-full">
              <Button variant="outline" className="w-full" asChild>
                <div>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload {label}
                </div>
              </Button>
            </label>
            {documents[field] && (
              <p className="text-sm text-gray-500">
                Selected: {documents[field].name}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Property Image Upload Section */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Upload Property Images</label>
        <input
          type="file"
          id="property-image-upload"
          multiple
          className="hidden"
          onChange={handlePropertyImageUpload}
          accept=".jpg,.jpeg,.png"
        />
        <label htmlFor="property-image-upload" className="w-full">
          <Button variant="outline" className="w-full" asChild>
            <div>
              <Upload className="mr-2 h-4 w-4" />
              Upload Property Images (4-5 images)
            </div>
          </Button>
        </label>
        {propertyImages.length > 0 && (
          <p className="text-sm text-gray-500">
            Selected property images: {propertyImages.length}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        className="w-full"
        onClick={handleSubmit}
        disabled={
          isUploading ||
          !documents.saleDeed ||
          !documents.extract7_12 ||
          !documents.mutationCertificate ||
          !documents.propertyTaxReceipt ||
          propertyImages.length === 0
        }
      >
        {isUploading ? "Uploading..." : "Upload All Files"}
      </Button>
    </div>
  );
};

export default ImageUpload;