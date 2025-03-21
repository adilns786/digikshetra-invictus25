
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { Filter, Heart, MapPin, Search } from "lucide-react";

// export default function SearchProperties() {
//   const [showFilters, setShowFilters] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   // Dummy Data (Replace with API Data Later)
//   const properties = [
//     {
//       id: 1,
//       title: "Luxury Riverside Villa",
//       location: "Miami, FL",
//       price: 850000,
//       size: 2200,
//       image: "https://source.unsplash.com/400x300/?house,villa",
//     },
//     {
//       id: 2,
//       title: "Modern Mountain Retreat",
//       location: "Denver, CO",
//       price: 650000,
//       size: 1800,
//       image: "https://source.unsplash.com/400x300/?cabin,mountain",
//     },
//     {
//       id: 3,
//       title: "Elegant City Apartment",
//       location: "New York, NY",
//       price: 950000,
//       size: 1400,
//       image: "https://source.unsplash.com/400x300/?apartment,city",
//     },
//     {
//       id: 4,
//       title: "Spacious Suburban Home",
//       location: "Los Angeles, CA",
//       price: 720000,
//       size: 2500,
//       image: "https://source.unsplash.com/400x300/?house,suburb",
//     },
//   ];

//   return (
//     <div className="p-6  bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="mb-8">
//         <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">Find Your Dream Home</h2>
//         <p className="text-lg text-gray-600">Explore the best properties with ease.</p>
//       </div>

//       {/* Search & Filter Bar */}
//       <div className="flex flex-col md:flex-row gap-6">
//         <div className="relative flex-1">
//           <input
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search by location, property type..."
//             className="pl-12 py-3 border rounded-lg w-full text-lg shadow-sm focus:ring-2 focus:ring-blue-500"
//           />
//           <Search className="absolute left-4 top-3 h-6 w-6 text-gray-500" />
//         </div>
//         <button
//           onClick={() => setShowFilters(!showFilters)}
//           className="flex items-center gap-2 px-6 py-3 border rounded-lg text-lg font-medium bg-white hover:bg-gray-200 shadow"
//         >
//           <Filter className="h-5 w-5" />
//           {showFilters ? "Hide Filters" : "Show Filters"}
//         </button>
//       </div>

//       {/* Filters */}
//       {showFilters && (
//         <div className="mt-6 p-6 bg-white border rounded-lg shadow-lg">
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//             <div className="space-y-3">
//               <label className="text-lg font-medium">Price Range</label>
//               <div className="flex gap-3">
//                 <input type="number" placeholder="Min" className="border p-3 rounded-lg w-full text-lg shadow-sm" />
//                 <span className="text-lg">-</span>
//                 <input type="number" placeholder="Max" className="border p-3 rounded-lg w-full text-lg shadow-sm" />
//               </div>
//             </div>

//             <div className="space-y-3">
//               <label className="text-lg font-medium">Property Type</label>
//               <select className="border p-3 rounded-lg w-full text-lg shadow-sm">
//                 <option value="">All Types</option>
//                 <option value="residential">Residential</option>
//                 <option value="commercial">Commercial</option>
//                 <option value="agricultural">Agricultural</option>
//               </select>
//             </div>
//           </div>
//           <button className="mt-6 py-3 w-full bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 shadow">
//             Apply Filters
//           </button>
//         </div>
//       )}

//       {/* Property Listings */}
//       <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//         {properties
//           .filter((property) =>
//             property.title.toLowerCase().includes(searchQuery.toLowerCase())
//           )
//           .map((property) => (
//             <div key={property.id} className="border rounded-lg overflow-hidden bg-white shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1">
//               {/* Image */}
//               <div className="relative">
//                 <img src={property.image} alt={property.title} className="w-full h-56 object-cover" />
//                 <button className="absolute top-4 right-4 bg-white/90 text-pink-500 p-3 rounded-full shadow">
//                   <Heart className="h-5 w-5" />
//                 </button>
//               </div>

//               {/* Property Info */}
//               <div className="p-6">
//                 <h3 className="text-xl font-bold text-gray-900">{property.title}</h3>
//                 <p className="text-gray-600 flex items-center text-lg mt-2">
//                   <MapPin className="h-5 w-5 mr-2 text-blue-500" />
//                   {property.location}
//                 </p>

//                 <div className="mt-4 flex justify-between text-lg font-semibold text-gray-800">
//                   <p className="text-blue-600">${property.price.toLocaleString()}</p>
//                   <p>{property.size} sqft</p>
//                 </div>

//                 <div className="mt-6">
//                   <Link
//                     to={`/buyer/property/${property.id}`}
//                     className="block py-3 text-center bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow"
//                   >
//                     View Details
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// }

// // const [properties, setProperties] = useState([]);

// // // Fetch properties from Firestore
// // useEffect(() => {
// //   const fetchProperties = async () => {
// //     const querySnapshot = await getDocs(collection(db, "properties"));
// //     const fetchedProperties = querySnapshot.docs.map((doc) => ({
// //       id: doc.id,
// //       ...doc.data(),
// //     }));
// //     setProperties(fetchedProperties);
// //   };

// //   fetchProperties();
// // }, []);
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Filter, Heart, MapPin, Search } from "lucide-react";
// import { db } from "../../Firebase/config";
// import { collection, getDocs } from "firebase/firestore";

// export default function SearchProperties() {
//   const [properties, setProperties] = useState([]);
//   const [showFilters, setShowFilters] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "PropertyData"));
//         const fetchedProperties = querySnapshot.docs
//           .map((doc) => {
//             const data = doc.data();
//             return {
//               id: doc.id,
//               title: data.title || "No Title",
//               location: data.location || "Unknown Location",
//               price: data.price || 0,
//               size: data.area || 0,
//               image: data.propertyImages?.[0] || "https://source.unsplash.com/400x300/?house",
//               approved: data.Approved || false
//             };
//           })
//           .filter((property) => property.approved);

//         setProperties(fetchedProperties);
//       } catch (error) {
//         console.error("Error fetching properties:", error);
//       }
//     };
//     fetchProperties();
//   }, []);

//   return (
//     <div className="p-6 bg-gray-100 w-full pt-30 min-h-screen">
//       <div className="mb-8 text-center">
//         <h2 className="text-4xl font-extrabold text-gray-900">Find Your Dream Home</h2>
//         <p className="text-lg text-gray-600 mt-2">Explore the best properties with ease.</p>
//       </div>
      
//       <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
//         <div className="relative w-full md:w-1/2">
//           <input
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search by location, property type..."
//             className="pl-12 py-3 border rounded-lg w-full text-lg shadow-sm focus:ring-2 focus:ring-blue-500"
//           />
//           <Search className="absolute left-4 top-3 h-6 w-6 text-gray-500" />
//         </div>
//         <button
//           onClick={() => setShowFilters(!showFilters)}
//           className="flex items-center gap-2 px-6 py-3 border rounded-lg text-lg font-medium bg-white hover:bg-gray-200 shadow"
//         >
//           <Filter className="h-5 w-5" />
//           {showFilters ? "Hide Filters" : "Show Filters"}
//         </button>
//       </div>
      
//       {showFilters && (
//         <div className="mt-6 p-6 bg-white border rounded-lg shadow-lg">
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//             <div className="space-y-3">
//               <label className="text-lg font-medium">Price Range</label>
//               <div className="flex gap-3">
//                 <input type="number" placeholder="Min" className="border p-3 rounded-lg w-full text-lg shadow-sm" />
//                 <span className="text-lg">-</span>
//                 <input type="number" placeholder="Max" className="border p-3 rounded-lg w-full text-lg shadow-sm" />
//               </div>
//             </div>
//             <div className="space-y-3">
//               <label className="text-lg font-medium">Property Type</label>
//               <select className="border p-3 rounded-lg w-full text-lg shadow-sm">
//                 <option value="">All Types</option>
//                 <option value="residential">Residential</option>
//                 <option value="commercial">Commercial</option>
//                 <option value="agricultural">Agricultural</option>
//               </select>
//             </div>
//           </div>
//           <button className="mt-6 py-3 w-full bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 shadow">
//             Apply Filters
//           </button>
//         </div>
//       )}

//       <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//         {properties
//           .filter((property) =>
//             property.title.toLowerCase().includes(searchQuery.toLowerCase())
//           )
//           .map((property) => (
//             <div key={property.id} className="rounded-lg overflow-hidden bg-white shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-2">
//               <div className="relative">
//                 <img src={property.image} alt={property.title} className="w-full h-56 object-cover" />
//                 <button className="absolute top-4 right-4 bg-white/90 text-pink-500 p-3 rounded-full shadow hover:bg-pink-100 transition">
//                   <Heart className="h-5 w-5" />
//                 </button>
//               </div>
//               <div className="p-6">
//                 <h3 className="text-xl font-bold text-gray-900">{property.title}</h3>
//                 <p className="text-gray-600 flex items-center text-lg mt-2">
//                   <MapPin className="h-5 w-5 mr-2 text-blue-500" />
//                   {property.location}
//                 </p>
//                 <div className="mt-4 flex justify-between text-lg font-semibold text-gray-800">
//                   <p className="text-blue-600">${property.price.toLocaleString()}</p>
//                   <p>{property.size} sqft</p>
//                 </div>
//                 <div className="mt-6">
//                   <Link
//                     to={`/buyer/property/${property.id}`}
//                     className="block py-3 text-center bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow"
//                   >
//                     View Details
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Filter, Heart, MapPin, Search } from "lucide-react";
import { db } from "../../Firebase/config";
import { collection, getDocs, doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";

export default function SearchProperties() {
  const [properties, setProperties] = useState([]);
  const [savedProperties, setSavedProperties] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const username = sessionStorage.getItem("name"); // Get username from session storage

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "PropertyData"));
        const fetchedProperties = querySnapshot.docs
          .map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              title: data.title || "No Title",
              location: data.location || "Unknown Location",
              price: data.price || 0,
              size: data.area || 0,
              image: data.propertyImages?.[0] || "https://source.unsplash.com/400x300/?house",
              approved: data.Approved || false
            };
          })
          .filter((property) => property.approved);

        setProperties(fetchedProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    const fetchSavedProperties = async () => {
      if (!username) return;
      try {
        const userDoc = await getDoc(doc(db, "SavedProperties", username));
        if (userDoc.exists()) {
          setSavedProperties(userDoc.data().saved || []);
        }
      } catch (error) {
        console.error("Error fetching saved properties:", error);
      }
    };

    fetchProperties();
    fetchSavedProperties();
  }, [username]);

  const toggleSaveProperty = async (propertyId) => {
    if (!username) {
      alert("Please log in to save properties.");
      return;
    }

    const userDocRef = doc(db, "SavedProperties", username);
    const isSaved = savedProperties.includes(propertyId);

    try {
      if (isSaved) {
        const updatedSaved = savedProperties.filter((id) => id !== propertyId);
        setSavedProperties(updatedSaved);
        await setDoc(userDocRef, { saved: updatedSaved }, { merge: true });
      } else {
        const updatedSaved = [...savedProperties, propertyId];
        setSavedProperties(updatedSaved);
        await setDoc(userDocRef, { saved: updatedSaved }, { merge: true });
      }
    } catch (error) {
      console.error("Error updating saved properties:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 w-full pt-30 min-h-screen">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900">Find Your Dream Home</h2>
        <p className="text-lg text-gray-600 mt-2">Explore the best properties with ease.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
        <div className="relative w-full md:w-1/2">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by location, property type..."
            className="pl-12 py-3 border rounded-lg w-full text-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-4 top-3 h-6 w-6 text-gray-500" />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-6 py-3 border rounded-lg text-lg font-medium bg-white hover:bg-gray-200 shadow"
        >
          <Filter className="h-5 w-5" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {showFilters && (
        <div className="mt-6 p-6 bg-white border rounded-lg shadow-lg">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-3">
              <label className="text-lg font-medium">Price Range</label>
              <div className="flex gap-3">
                <input type="number" placeholder="Min" className="border p-3 rounded-lg w-full text-lg shadow-sm" />
                <span className="text-lg">-</span>
                <input type="number" placeholder="Max" className="border p-3 rounded-lg w-full text-lg shadow-sm" />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-lg font-medium">Property Type</label>
              <select className="border p-3 rounded-lg w-full text-lg shadow-sm">
                <option value="">All Types</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="agricultural">Agricultural</option>
              </select>
            </div>
          </div>
          <button className="mt-6 py-3 w-full bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 shadow">
            Apply Filters
          </button>
        </div>
      )}

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {properties
          .filter((property) =>
            property.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((property) => (
            <div key={property.id} className="rounded-lg overflow-hidden bg-white shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-2">
              <div className="relative">
                <img src={property.image} alt={property.title} className="w-full h-56 object-cover" />
                <button
                  className={`absolute top-4 right-4 p-3 rounded-full shadow transition ${
                    savedProperties.includes(property.id) ? "bg-pink-500 text-white" : "bg-white/90 text-pink-500 hover:bg-pink-100"
                  }`}
                  onClick={() => toggleSaveProperty(property.id)}
                >
                  <Heart className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">{property.title}</h3>
                <p className="text-gray-600 flex items-center text-lg mt-2">
                  <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                  {property.location}
                </p>
                <div className="mt-4 flex justify-between text-lg font-semibold text-gray-800">
                  <p className="text-blue-600">${property.price.toLocaleString()}</p>
                  <p>{property.size} sqft</p>
                </div>
                <div className="mt-6">
                  <Link
                    to={`property/${property.id}`}
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
