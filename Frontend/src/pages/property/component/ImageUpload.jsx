import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { toast } from "sonner";

const ImageUpload = () => {
    const [files, setFiles] = useState([]);
    const [isUploading, setIsUploading] = useState(false);

    // Handle file selection
    const handleFileUpload = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);
    };

    // Handle file upload to local server
    const handleSubmit = async () => {
        if (files.length === 0) {
            toast.error("Please select at least one file to upload");
            return;
        }

        setIsUploading(true);

        try {
            const formData = new FormData();
            files.forEach((file) => formData.append("files", file));

            const response = await fetch("http://localhost:8000/api/upload/", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to upload files");
            }

            const result = await response.json();
            console.log("Upload successful:", result);
            toast.success("Files uploaded successfully!");
            setFiles([]); // Clear selected files
        } catch (error) {
            console.error("Error uploading files:", error);
            toast.error("Failed to upload files. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="space-y-4 p-4">
            <div className="space-y-2">
                <input
                    type="file"
                    id="file-upload"
                    multiple
                    className="hidden"
                    onChange={handleFileUpload}
                />
                <label htmlFor="file-upload" className="w-full">
                    <Button variant="outline" className="w-full" asChild>
                        <div>
                            <Upload className="mr-2 h-4 w-4" />
                            Select Files
                        </div>
                    </Button>
                </label>
                {files.length > 0 && (
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            Selected files: {files.length}
                        </p>
                    </div>
                )}
            </div>

            <Button
                className="w-full"
                onClick={handleSubmit}
                disabled={isUploading || files.length === 0}
            >
                {isUploading ? "Uploading..." : "Upload Files"}
            </Button>
        </div>
    );
};

export default ImageUpload;