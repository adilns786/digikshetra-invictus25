import { Link } from "react-router-dom";
import { Edit, MapPin, PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";

export default function PropertyListings() {
  const [properties] = useState(Array.from({ length: 6 }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Property Listings</h2>
          <p className="text-muted-foreground">Manage all your property listings in one place</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn">
            <Link to="/properties/new" className="flex items-center">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Property
            </Link>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <input placeholder="Search properties..." className="pl-8 p-2 border rounded" />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </div>
        <button className="btn-outline">Filter</button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((_, i) => (
          <div key={i} className="card">
            <div className="aspect-video w-full bg-muted relative flex items-center justify-center text-muted-foreground">
              Property Image
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold">
                    {i % 3 === 0 ? "Riverside Villa" : i % 3 === 1 ? "Mountain View Cottage" : "Downtown Apartment"}
                  </h3>
                  <p className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-3 w-3" />
                    {i % 3 === 0
                      ? "123 River Road, Riverside"
                      : i % 3 === 1
                      ? "45 Mountain View, Highland"
                      : "789 Main St, Downtown"}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button className="btn-icon">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="btn-icon text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium">Price</p>
                  <p className="text-xl font-bold">${(200000 + i * 50000).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Area</p>
                  <p className="text-xl font-bold">{1000 + i * 200} sqft</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Type</p>
                  <p className="text-xl font-bold">
                    {i % 3 === 0 ? "Residential" : i % 3 === 1 ? "Agricultural" : "Commercial"}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="btn">
                  <Link to={`/properties/${i}`}>View Details</Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
