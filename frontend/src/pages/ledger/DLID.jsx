import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../Firebase/config"; // Update import path
import { doc, setDoc } from "firebase/firestore"; // Import setDoc for creating documents
import { toast } from "sonner"; // For toast notifications
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Import shadcn components
import { Button } from "@/components/ui/button"; // Import shadcn button


// Error Boundary Component for catching errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log("Error caught by error boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center text-white mt-6">Something went wrong.</div>
      );
    }

    return this.props.children;
  }
}
// Blockchain Details page component
const BlockchainDetails = () => {
  const { dlid } = useParams();
  const [ledger, setLedger] = useState(null);
  const [error, setError] = useState(null);
  const [documents, setDocuments] = useState({
    paymentProof: null,
    saleDeed: null,
    extract7_12: null,
    mutationCertificate: null,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch ledger data
  useEffect(() => {
    const fetchLedgerData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/ledgers/get-ledger/${dlid}/`
        );
        const data = await response.json();

        if (data && Array.isArray(data.ledger)) {
          setLedger(data.ledger);
        } else {
          setError("Invalid response structure.");
        }
      } catch (error) {
        console.error("Error fetching ledger data:", error);
        setError("Error fetching data, please try again later.");
      }
    };

    if (dlid) {
      fetchLedgerData();
    }
  }, [dlid]);

  // Upload to Cloudinary
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
      return fileData.secure_url; // Return the secure URL of the uploaded file
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  };

  const handleDocumentUpload = async (field, file) => {
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    setIsUploading(true);

    try {
      const cloudinaryUrl = await uploadToCloudinary(file);

      // Create or update Firestore transaction document
      const transactionRef = doc(db, "transactions", dlid);
      await setDoc(
        transactionRef,
        {
          [field]: {
            url: cloudinaryUrl,
            approved: false, // Default to false
          },
          metadata: {
            createdAt: new Date().toISOString(), // Add creation timestamp
            updatedAt: new Date().toISOString(),
          },
        },
        { merge: true } // Merge with existing data if the document already exists
      );

      toast.success(`${field} uploaded successfully!`);
      setDocuments((prev) => ({
        ...prev,
        [field]: { url: cloudinaryUrl, approved: false },
      }));
    } catch (error) {
      console.error(`Error uploading ${field}:`, error);
      toast.error(`Failed to upload ${field}. Please try again.`);
    } finally {
      setIsUploading(false);
    }
  };

  if (error) {
    return (
      <div className="text-center text-white mt-6">
        <p>{error}</p>
      </div>
    );
  }

  if (!ledger) {
    return (
      <div className="text-center text-white mt-6">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen w-full p-6 overflow-auto">
      <div className="bg-gray-800 shadow-lg rounded-xl p-6 space-y-4 w-full max-w-7xl mx-auto border border-gray-700">
        <h3 className="text-2xl font-semibold text-blue-400 text-center">
          Blockchain Ledger
        </h3>
        <div className="space-y-4 text-gray-300 mt-4">
          {ledger.map((block, index) => (
            <div
              key={index}
              className="block-div space-y-2 ml-4 mb-4 p-4 border-2 border-gray-700 rounded-lg"
            >
              <div className="space-y-1">
                <h4 className="font-semibold text-lg text-blue-400">
                  Block {index}{" "}
                  {index === 0 ? "(Genesis Block)" : "(Transaction Block)"}
                </h4>
                {index === 0 ? (
                  <div className="space-y-1">
                    <p>
                      <strong>DLID:</strong> {block.dlid}
                    </p>
                    <p>
                      <strong>Owner Name:</strong> {block.owner_name}
                    </p>
                    <p>
                      <strong>Area:</strong> {block.area}
                    </p>
                    <p>
                      <strong>Landmark:</strong> {block.landmark}
                    </p>
                    <p>
                      <strong>Price:</strong> ${block.price}
                    </p>
                    <p>
                      <strong>Property Type:</strong> {block.property_type}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p>
                      <strong>Sender:</strong> {block.sender}
                    </p>
                    <p>
                      <strong>Receiver:</strong> {block.receiver}
                    </p>
                    <p>
                      <strong>Amount:</strong> ${block.amount}
                    </p>
                    <p>
                      <strong>Timestamp:</strong> {block.timestamp}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Proceed Button */}
        <div className="mt-6 flex justify-center">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Proceed to Upload Documents
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-gray-800 border-gray-700">
              <DialogHeader>
                <DialogTitle className="text-blue-400">
                  Upload Required Documents
                </DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(documents).map(([field, url]) => (
                  <div key={field} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      {field.replace(/([A-Z])/g, " $1").toUpperCase()}
                    </label>
                    <input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          handleDocumentUpload(field, file);
                        }
                      }}
                      className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                      disabled={isUploading}
                    />
                    {url && (
                      <a
                        href={url.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        View Uploaded Document
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default function BlockchainDetailsWrapper() {
  return (
    <ErrorBoundary>
      <BlockchainDetails />
    </ErrorBoundary>
  );
}