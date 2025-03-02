
// import { Link } from "react-router-dom";
// import { Edit, MapPin, PlusCircle, Trash2, Search } from "lucide-react";
// import { useState } from "react";

// export default function PropertyListings() {
//   const [properties, setProperties] = useState([
//     { id: 1, name: "Riverside Villa", location: "123 River Road, Riverside", price: 250000, area: 1200, type: "Residential" },
//     { id: 2, name: "Mountain View Cottage", location: "45 Mountain View, Highland", price: 320000, area: 1500, type: "Agricultural" },
//     { id: 3, name: "Downtown Apartment", location: "789 Main St, Downtown", price: 450000, area: 1000, type: "Commercial" },
//     { id: 4, name: "Seaside Bungalow", location: "22 Ocean Drive, Seaside", price: 530000, area: 1800, type: "Residential" },
//     { id: 5, name: "Countryside Farmhouse", location: "67 Green Fields, Countryside", price: 290000, area: 2500, type: "Agricultural" },
//     { id: 6, name: "City Center Loft", location: "99 Central Plaza, Metro City", price: 370000, area: 900, type: "Commercial" }
//   ]);
  
//   const [search, setSearch] = useState("");

//   const filteredProperties = properties.filter(property =>
//     property.name.toLowerCase().includes(search.toLowerCase()) ||
//     property.location.toLowerCase().includes(search.toLowerCase()) ||
//     property.type.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleDelete = (id) => {
//     setProperties(properties.filter(property => property.id !== id));
//   };

//   return (
//     <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//         <div>
//           <h2 className="text-4xl font-bold text-gray-800">🏡 Property Listings</h2>
//           <p className="text-gray-600">Manage all your properties in one place.</p>
//         </div>
//         <Link to="/landowner/properties/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition">
//           <PlusCircle className="mr-2 h-5 w-5" /> Add New Property
//         </Link>
//       </div>

//       {/* Search Bar */}
//       <div className="flex items-center gap-4">
//         <div className="relative flex-1">
//           <input 
//             type="text"
//             placeholder="Search properties..." 
//             className="w-full pl-10 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
//         </div>
//         <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg">Filter</button>
//       </div>

//       {/* Property Cards */}
//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {filteredProperties.length > 0 ? (
//           filteredProperties.map((property) => (
//             <div key={property.id} className="bg-white shadow-lg rounded-xl overflow-hidden transition transform hover:scale-105">
//               <div className="aspect-video bg-gray-200 flex items-center justify-center text-gray-400 text-lg">
//                 🏠 Property Image
//               </div>
//               <div className="p-5">
//                 <div className="flex items-start justify-between">
//                   <div>
//                     <h3 className="text-xl font-semibold text-gray-800">{property.name}</h3>
//                     <p className="flex items-center text-gray-600 text-sm mt-1">
//                       <MapPin className="mr-1 h-4 w-4 text-blue-500" /> {property.location}
//                     </p>
//                   </div>
//                   <div className="flex gap-2">
//                     <Link to={`/landowner/property/edit/${property.id}`} className="text-blue-600 hover:text-blue-800">
//                       <Edit className="h-5 w-5" />
//                     </Link>
//                     <button onClick={() => handleDelete(property.id)} className="text-red-600 hover:text-red-800">
//                       <Trash2 className="h-5 w-5" />
//                     </button>
//                   </div>
//                 </div>
//                 <hr className="my-3" />
//                 <div className="flex justify-between text-gray-700">
//                   <div>
//                     <p className="text-sm font-medium">Price</p>
//                     <p className="text-lg font-bold">${property.price.toLocaleString()}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium">Area</p>
//                     <p className="text-lg font-bold">{property.area} sqft</p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium">Type</p>
//                     <p className="text-lg font-bold">{property.type}</p>
//                   </div>
//                 </div>
//                 <div className="mt-4 flex justify-end">
//                   <Link to={`/landowner/propertydetail/${property.id}`} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
//                     View Details
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500">No properties found.</p>
//         )}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit, MapPin, PlusCircle, Trash2, Search } from "lucide-react";
import { db } from "../../Firebase/config"; // Adjust the path as needed
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function PropertyListings() {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "PropertyData"));
        const fetchedProperties = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((property) => property.Approved === true); // Only fetch approved properties
        setProperties(fetchedProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "PropertyData", id));
      setProperties(properties.filter((property) => property.id !== id));
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  const filteredProperties = properties.filter(
    (property) =>
      property.title?.toLowerCase().includes(search.toLowerCase()) ||
      property.location?.toLowerCase().includes(search.toLowerCase()) ||
      property.propertyType?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-4xl font-bold text-gray-800">🏡 Property Listings</h2>
          <p className="text-gray-600">Manage all your properties in one place.</p>
        </div>
        <Link to="/landowner/properties/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition">
          <PlusCircle className="mr-2 h-5 w-5" /> Add New Property
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search properties..."
            className="w-full pl-10 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
        </div>
      </div>

      {/* Property Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <div key={property.id} className="bg-white shadow-lg rounded-xl overflow-hidden transition transform hover:scale-105">
              <div className="aspect-video bg-gray-200 flex items-center justify-center text-gray-400 text-lg">
                {property.propertyImages && property.propertyImages.length > 0 ? (
                  <img src={property.propertyImages[0]} alt={property.title} className="w-full h-full object-cover" />
                ) : (
                  "🏠 No Image Available"
                )}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{property.title}</h3>
                    <p className="flex items-center text-gray-600 text-sm mt-1">
                      <MapPin className="mr-1 h-4 w-4 text-blue-500" /> {property.location}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/landowner/property/edit/${property.id}`} className="text-blue-600 hover:text-blue-800">
                      <Edit className="h-5 w-5" />
                    </Link>
                    <button onClick={() => handleDelete(property.id)} className="text-red-600 hover:text-red-800">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between text-gray-700">
                  <div>
                    <p className="text-sm font-medium">Price</p>
                    <p className="text-lg font-bold">${property.price?.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Area</p>
                    <p className="text-lg font-bold">{property.area} sqft</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Type</p>
                    <p className="text-lg font-bold">{property.propertyType}</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Link to={`/landowner/property/${property.id}`} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No approved properties found.</p>
        )}
      </div>
    </div>
  );
}
