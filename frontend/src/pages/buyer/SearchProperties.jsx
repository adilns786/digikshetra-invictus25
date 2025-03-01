import { useState } from "react";
import { Link } from "react-router-dom";
import { Filter, Heart, MapPin, Search } from "lucide-react";

export default function SearchProperties() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Search Properties</h2>
        <p className="text-muted-foreground">Find your dream property with our advanced search</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input placeholder="Search by location, property type, etc." className="pl-10 border p-2 rounded w-full" />
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        </div>
        <button onClick={() => setShowFilters(!showFilters)} className="border p-2 rounded">
          <Filter className="mr-2 h-4 w-4" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {showFilters && (
        <div className="p-4 border rounded">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Price Range</label>
              <div className="flex gap-2">
                <input type="number" placeholder="Min" className="border p-2 rounded w-full" />
                <span>-</span>
                <input type="number" placeholder="Max" className="border p-2 rounded w-full" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Property Type</label>
              <select className="border p-2 rounded w-full">
                <option value="">All Types</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="agricultural">Agricultural</option>
              </select>
            </div>
          </div>
          <button className="mt-4 p-2 border rounded w-full">Apply Filters</button>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="border rounded overflow-hidden">
            <div className="aspect-video w-full bg-gray-200 relative">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">Property Image</div>
              <button className="absolute top-2 right-2 bg-white/80 text-pink-500 p-2 rounded-full">
                <Heart className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-bold">{i % 3 === 0 ? "Riverside Villa" : i % 3 === 1 ? "Mountain View Cottage" : "Downtown Apartment"}</h3>
              <p className="text-sm text-gray-500 flex items-center"><MapPin className="h-3 w-3 mr-1" />Location</p>
              <div className="mt-4 flex justify-between">
                <p className="font-bold">${(200000 + i * 50000).toLocaleString()}</p>
                <p className="font-bold">{1000 + i * 200} sqft</p>
              </div>
              <div className="mt-4">
                <Link to={`/buyer/property/${i}`} className="p-2 border rounded block text-center">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
