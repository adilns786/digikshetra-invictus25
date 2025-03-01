
// import { useState } from "react";
// import { ArrowLeft, Upload } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";

// export default function AddNewProperty() {
//   const [formData, setFormData] = useState({
//     title: "",
//     location: "",
//     propertyType: "",
//     area: "",
//     price: "",
//     description: "",
//     amenities: "",
//     restrictions: "",
//     coordinates: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center gap-4">
//         <Button variant="outline" size="icon" asChild>
//           <Link href="/properties">
//             <ArrowLeft className="h-4 w-4" />
//             <span className="sr-only">Back</span>
//           </Link>
//         </Button>
//         <div>
//           <h2 className="text-3xl font-bold tracking-tight">Add New Property</h2>
//           <p className="text-muted-foreground">Fill in the details to list a new property for sale</p>
//         </div>
//       </div>

//       <div className="grid gap-6 md:grid-cols-2">
//         <div className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Property Details</CardTitle>
//               <CardDescription>Basic information about your property</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <Input id="title" placeholder="Brief description" value={formData.title} onChange={handleChange} />
//               <Input id="location" placeholder="Address or GPS coordinates" value={formData.location} onChange={handleChange} />
//               <div className="grid gap-4 grid-cols-2">
//                 <select id="propertyType" className="input" value={formData.propertyType} onChange={handleChange}>
//                   <option value="">Select type</option>
//                   <option value="residential">Residential</option>
//                   <option value="commercial">Commercial</option>
//                   <option value="agricultural">Agricultural</option>
//                 </select>
//                 <Input id="area" type="number" placeholder="Total area" value={formData.area} onChange={handleChange} />
//               </div>
//               <Input id="price" type="number" placeholder="Asking price" value={formData.price} onChange={handleChange} />
//               <textarea id="description" rows={4} placeholder="Detailed description" className="input" value={formData.description} onChange={handleChange}></textarea>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Additional Features</CardTitle>
//               <CardDescription>More details about your property</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <Input id="amenities" placeholder="Schools, hospitals, etc." value={formData.amenities} onChange={handleChange} />
//               <Input id="restrictions" placeholder="Any legal or environmental restrictions" value={formData.restrictions} onChange={handleChange} />
//             </CardContent>
//           </Card>
//         </div>

//         <div className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Documents</CardTitle>
//               <CardDescription>Upload required documents</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {['Title Deed', 'Encumbrance Certificate', 'Property Tax Receipts', 'Identification Proofs'].map((doc, index) => (
//                 <div key={index} className="space-y-2">
//                   <label className="text-sm font-medium">{doc}</label>
//                   <Button variant="outline" className="w-full">
//                     <Upload className="mr-2 h-4 w-4" />
//                     Upload {doc}
//                   </Button>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>GIS Mapping</CardTitle>
//               <CardDescription>Define property boundaries</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="aspect-video w-full bg-muted rounded-md flex items-center justify-center text-muted-foreground">
//                 Map Interface Placeholder
//               </div>
//               <Input id="coordinates" placeholder="GPS coordinates" value={formData.coordinates} onChange={handleChange} />
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Photos and Videos</CardTitle>
//               <CardDescription>Upload media files</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {['Photos', 'Videos (Optional)'].map((media, index) => (
//                 <div key={index} className="space-y-2">
//                   <label className="text-sm font-medium">Property {media}</label>
//                   <Button variant="outline" className="w-full">
//                     <Upload className="mr-2 h-4 w-4" />
//                     Upload {media}
//                   </Button>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       <div className="flex justify-end gap-4">
//         <Button variant="outline" asChild>
//           <Link href="/properties">Cancel</Link>
//         </Button>
//         <Button>Save Property</Button>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function AddNewProperty() {
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
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
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
          <p className="text-muted-foreground">Fill in the details to list a new property for sale</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
              <CardDescription>Basic information about your property</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input id="title" placeholder="Brief description" value={formData.title} onChange={handleChange} />
              <Input id="location" placeholder="Address or GPS coordinates" value={formData.location} onChange={handleChange} />
              <div className="grid gap-4 grid-cols-2">
                <select id="propertyType" className="input" value={formData.propertyType} onChange={handleChange}>
                  <option value="">Select type</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="agricultural">Agricultural</option>
                </select>
                <Input id="area" type="number" placeholder="Total area" value={formData.area} onChange={handleChange} />
              </div>
              <Input id="price" type="number" placeholder="Asking price" value={formData.price} onChange={handleChange} />
              <textarea id="description" rows={4} placeholder="Detailed description" className="input" value={formData.description} onChange={handleChange}></textarea>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Features</CardTitle>
              <CardDescription>More details about your property</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input id="amenities" placeholder="Schools, hospitals, etc." value={formData.amenities} onChange={handleChange} />
              <Input id="restrictions" placeholder="Any legal or environmental restrictions" value={formData.restrictions} onChange={handleChange} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>Upload required documents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {['Title Deed', 'Encumbrance Certificate', 'Property Tax Receipts', 'Identification Proofs'].map((doc, index) => (
                <div key={index} className="space-y-2">
                  <label className="text-sm font-medium">{doc}</label>
                  <Button variant="outline" className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload {doc}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

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

          <Card>
            <CardHeader>
              <CardTitle>Photos and Videos</CardTitle>
              <CardDescription>Upload media files</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {['Photos', 'Videos (Optional)'].map((media, index) => (
                <div key={index} className="space-y-2">
                  <label className="text-sm font-medium">Property {media}</label>
                  <Button variant="outline" className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload {media}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" asChild>
          <Link to="/landowner/properties">Cancel</Link>
        </Button>
        <Button>Save Property</Button>
      </div>
    </div>
  );
}
