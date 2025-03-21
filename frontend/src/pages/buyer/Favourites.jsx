// import {Link} from "react-router-dom";
// import { Heart, MapPin, Trash2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";

// export default function Favorites() {
//   return (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-3xl font-bold tracking-tight">Favorites</h2>
//         <p className="text-muted-foreground">Your saved properties and searches</p>
//       </div>

//       <div className="flex items-center justify-between">
//         <div className="flex gap-2">
//           <Button variant="outline" className="bg-primary/5">Saved Properties</Button>
//           <Button variant="outline">Saved Searches</Button>
//         </div>
//         <Button variant="outline" size="sm" className="text-destructive">
//           <Trash2 className="mr-2 h-4 w-4" />
//           Clear All
//         </Button>
//       </div>

//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {[...Array(6)].map((_, i) => (
//           <Card key={i} className="overflow-hidden">
//             <div className="aspect-video w-full bg-muted relative">
//               <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
//                 Property Image
//               </div>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="absolute top-2 right-2 h-8 w-8 bg-white/80 text-pink-500 hover:bg-white/90 hover:text-pink-600"
//               >
//                 <Heart className="h-4 w-4" fill="currentColor" />
//                 <span className="sr-only">Remove from favorites</span>
//               </Button>
//             </div>
//             <CardHeader className="p-4">
//               <CardTitle className="line-clamp-1">
//                 {i % 3 === 0 ? "Riverside Villa" : i % 3 === 1 ? "Mountain View Cottage" : "Downtown Apartment"}
//               </CardTitle>
//               <CardDescription className="flex items-center mt-1">
//                 <MapPin className="mr-1 h-3 w-3" />
//                 {i % 3 === 0 ? "123 River Road, Riverside" : i % 3 === 1 ? "45 Mountain View, Highland" : "789 Main St, Downtown"}
//               </CardDescription>
//             </CardHeader>
//             <Separator />
//             <CardContent className="p-4">
//               <div className="flex justify-between">
//                 <div>
//                   <p className="text-sm font-medium">Price</p>
//                   <p className="text-xl font-bold">${(200000 + i * 50000).toLocaleString()}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium">Area</p>
//                   <p className="text-xl font-bold">{1000 + i * 200} sqft</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium">Type</p>
//                   <p className="text-xl font-bold">{i % 3 === 0 ? "Residential" : i % 3 === 1 ? "Agricultural" : "Commercial"}</p>
//                 </div>
//               </div>
//               <div className="mt-4 flex justify-end">
//                 <Button asChild>
//                   <Link href={`/buyer/property/${i}`}>View Details</Link>
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <div className="mt-8">
//         <h3 className="text-xl font-semibold mb-4">Saved Searches</h3>
//         <div className="space-y-4">
//           {["Residential properties in Riverside under $300,000", "Agricultural land near Highland with 5+ acres", "Commercial spaces in Downtown with parking"].map((search, i) => (
//             <Card key={i} className="flex items-center p-4">
//               <div className="flex-1">
//                 <p className="font-medium">{search}</p>
//                 <p className="text-sm text-muted-foreground">Last updated {i + 1} day{i !== 0 ? "s" : ""} ago</p>
//               </div>
//               <div className="flex gap-2">
//                 <Button variant="outline" size="sm" asChild>
//                   <Link href="/buyer/search">Run Search</Link>
//                 </Button>
//                 <Button variant="ghost" size="sm" className="text-destructive">
//                   <Trash2 className="h-4 w-4" />
//                   <span className="sr-only">Delete</span>
//                 </Button>
//               </div>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, MapPin, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { db } from "../../Firebase/config";
import { doc, getDoc } from "firebase/firestore";

export default function SavedProperties() {
  const [savedProperties, setSavedProperties] = useState([]);
  const username = sessionStorage.getItem("name");

  const clearAllFavorites = () => {
   
    fetch("/api/favorites", { method: "DELETE" });
  };

  useEffect(() => {
    const fetchSavedProperties = async () => {
      if (!username) return;
      try {
        const userDoc = await getDoc(doc(db, "SavedProperties", username));
        if (userDoc.exists()) {
          const savedIds = userDoc.data().saved || [];
          const fetchedProperties = [];

          for (let id of savedIds) {
            const propertyDoc = await getDoc(doc(db, "PropertyData", id));
            if (propertyDoc.exists()) {
              fetchedProperties.push({ id: propertyDoc.id, ...propertyDoc.data() });
            }
          }

          setSavedProperties(fetchedProperties);
        }
      } catch (error) {
        console.error("Error fetching saved properties:", error);
      }
    };
    fetchSavedProperties();
  }, [username]);

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="text-center">
        <h2 className="text-4xl font-bold tracking-tight">Favorites</h2>
        <p className="text-muted-foreground text-lg">Your saved properties and searches</p>
      </div>
      
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-4">
          <Button variant="outline" className="bg-primary/10 px-6 py-2 text-lg">Saved Properties</Button>
          <Button variant="outline" className="px-6 py-2 text-lg">Saved Searches</Button>
        </div>
        <Button variant="outline" size="lg" className="text-destructive flex items-center" onClick={clearAllFavorites}>
          <Trash2 className="mr-2 h-5 w-5" />
          Clear All
        </Button>
      </div>

      
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {savedProperties.map((property) => (
          <div key={property.id} className="rounded-lg overflow-hidden bg-white shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-2">
            <div className="relative">
              <img src={property.propertyImages?.[0] || "https://source.unsplash.com/400x300/?house"} alt={property.title} className="w-full h-56 object-cover" />
              <button className="absolute top-4 right-4 bg-pink-500 text-white p-3 rounded-full shadow transition">
                <Heart className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900">{property.title || "No Title"}</h3>
              <p className="text-gray-600 flex items-center text-lg mt-2">
                <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                {property.location || "Unknown Location"}
              </p>
              <div className="mt-4 flex justify-between text-lg font-semibold text-gray-800">
                <p className="text-blue-600">${property.price?.toLocaleString() || 0}</p>
                <p>{property.area || 0} sqft</p>
              </div>
              <div className="mt-6">
                <Link
                  to={`/property/${property.id}`}
                  className="block py-3 text-center bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
