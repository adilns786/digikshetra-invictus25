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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [savedSearches, setSavedSearches] = useState([]);

  useEffect(() => {
    // Fetch favorites and saved searches from DB
    fetch("/api/favorites")
      .then(res => res.json())
      .then(data => setFavorites(data))
      .catch(error => console.error("Error fetching favorites:", error));
    
    fetch("/api/saved-searches")
      .then(res => res.json())
      .then(data => setSavedSearches(data))
      .catch(error => console.error("Error fetching saved searches:", error));
  }, []);

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(property => property.id !== id));
    fetch(`/api/favorites/${id}`, { method: "DELETE" });
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    fetch("/api/favorites", { method: "DELETE" });
  };

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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.map((property) => (
          <Card key={property.id} className="overflow-hidden shadow-lg rounded-lg">
            <div className="relative aspect-video w-full bg-gray-200">
              <img src={property.image} alt={property.name} className="w-full h-full object-cover" />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-10 w-10 bg-white/80 text-pink-500 hover:bg-white/90 hover:text-pink-600 rounded-full"
                onClick={() => removeFavorite(property.id)}
              >
                <Heart className="h-6 w-6" fill="currentColor" />
              </Button>
            </div>
            <CardHeader className="p-5">
              <CardTitle className="text-xl font-semibold truncate">{property.name}</CardTitle>
              <CardDescription className="flex items-center text-gray-600 mt-1">
                <MapPin className="mr-1 h-4 w-4" />
                {property.location}
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="p-5">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Price</p>
                  <p className="text-lg font-bold">${property.price.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Area</p>
                  <p className="text-lg font-bold">{property.area} sqft</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Type</p>
                  <p className="text-lg font-bold">{property.type}</p>
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <Button asChild className="px-6 py-2 text-lg">
                  <Link to={`/buyer/property/${property.id}`}>View Details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-semibold mb-4">Saved Searches</h3>
        <div className="space-y-6">
          {savedSearches.map((search, i) => (
            <Card key={i} className="flex items-center justify-between p-5 shadow-md rounded-lg">
              <div className="flex-1">
                <p className="text-lg font-medium">{search}</p>
                <p className="text-sm text-gray-500">Last updated {i + 1} day{i !== 0 ? "s" : ""} ago</p>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" size="lg" asChild>
                  <Link to="/buyer/search">Run Search</Link>
                </Button>
                <Button variant="ghost" size="lg" className="text-destructive flex items-center">
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
