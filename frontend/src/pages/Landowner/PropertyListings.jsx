import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit, MapPin, PlusCircle, Trash2, Search } from "lucide-react";
import { db } from "../../Firebase/config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function PropertyListings() {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [blockchainData, setBlockchainData] = useState([]);

  // Fetch Firebase properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "PropertyData"));
        const fetchedProperties = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((property) => property.Approved === true);
        setProperties(fetchedProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    const fetchBlockchainData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/ledgers/blockchain/");
        const data = await response.json();
        console.log(data.blockchain);
  
        if (data.blockchain) {
          // Filter only approved properties
          const approvedProperties = data.blockchain.flat().filter(property => property.Approved === true);
          setBlockchainData(approvedProperties);
        }
      } catch (error) {
        console.error("Error fetching blockchain data:", error);
      }
    };
  
    fetchBlockchainData();
  }, []);
  

  // Filter Firebase properties based on search
  const filteredProperties = properties.filter(
    (property) =>
      property.title?.toLowerCase().includes(search.toLowerCase()) ||
      property.location?.toLowerCase().includes(search.toLowerCase()) ||
      property.propertyType?.toLowerCase().includes(search.toLowerCase())
  );

  // Handle property deletion
  const handleDelete = async (propertyId) => {
    try {
      await deleteDoc(doc(db, "PropertyData", propertyId));
      setProperties((prevProperties) =>
        prevProperties.filter((property) => property.id !== propertyId)
      );
      toast.success("Property deleted successfully!");
    } catch (error) {
      console.error("Error deleting property:", error);
      toast.error("Failed to delete property.");
    }
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-4xl font-bold text-gray-800">🏡 Property Listings</h2>
          <p className="text-gray-600">Manage all your properties in one place.</p>
        </div>
        <Link
          to="/landowner/properties/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition"
        >
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

      {/* Firebase Properties Section */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">🌍 Properties </h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <Link
                key={property.id}
                to={`/property/${property.id}`} // Route to details page
                className="bg-white shadow-lg rounded-xl overflow-hidden transition transform hover:scale-105"
              >
                <div className="aspect-video bg-gray-200 flex items-center justify-center text-gray-400 text-lg">
                  {property.propertyImages && property.propertyImages.length > 0 ? (
                    <img
                      src={property.propertyImages[0]}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
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
                      <Link
                        to={`/landowner/property/edit/${property.id}`}
                        className="text-blue-600 hover:text-blue-800"
                        onClick={(e) => e.stopPropagation()} // Prevent card click
                      >
                        <Edit className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card click
                          handleDelete(property.id);
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
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
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500">No approved properties found.</p>
          )}
        </div>
      </div>

      {/* Blockchain Properties Section */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-700 mt-10 mb-4">🔗 Properties from Blockchain</h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blockchainData.length > 0 &&
            blockchainData.map((block, index) =>
              block.dlid ? (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded-xl overflow-hidden transition transform hover:scale-105"
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">DLID: {block.dlid}</h3>
                        <p className="flex items-center text-gray-600 text-sm mt-1">
                          <MapPin className="mr-1 h-4 w-4 text-blue-500" /> {block.landmark}
                        </p>
                      </div>
                    </div>
                    <hr className="my-3" />
                    <div className="flex justify-between text-gray-700">
                      <div>
                        <p className="text-sm font-medium">Owner</p>
                        <p className="text-lg font-bold">{block.owner_name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Area</p>
                        <p className="text-lg font-bold">{block.area}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Type</p>
                        <p className="text-lg font-bold">{block.property_type}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Price</p>
                        <p className="text-lg font-bold">${block.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null
            )}
        </div>
      </div>
    </div>
  );
}