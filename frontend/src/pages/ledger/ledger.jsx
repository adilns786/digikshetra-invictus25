import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate for navigation

// Navbar component
const Navbar = () => (
  <nav className="bg-gray-900 p-4 shadow-md">
    <div className="container mx-auto flex items-center justify-between">
      <h1 className="text-white text-2xl font-bold">Land Record Management</h1>
      <div className="space-x-4">
        <button className="text-white">Home</button>
        <button className="text-white">Blockchain</button>
        <button className="text-white">About</button>
      </div>
    </div>
  </nav>
);

export default function BlockchainProperties() {
  const [blockchainData, setBlockchainData] = useState([]);
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Fetch blockchain properties
  useEffect(() => {
    const fetchBlockchainData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/ledgers/blockchain/"
        );
        const data = await response.json();
        if (data.blockchain) {
          setBlockchainData(data.blockchain.flat());
        }
      } catch (error) {
        console.error("Error fetching blockchain data:", error);
      }
    };
    fetchBlockchainData();
  }, []);

  // Handle "Purchase" button click
  const handlePurchase = (dlid, e) => {
    e.stopPropagation(); // Prevent the card's onClick event from firing
    navigate(`/blockchain-details/${dlid}`); // Redirect to the details page
  };

  // Handle "Consult" button click
  const handleConsult = (e) => {
    e.stopPropagation(); // Prevent the card's onClick event from firing
    navigate("/consult"); // Redirect to a temporary route
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      <div className="space-y-6 p-6 flex-grow">
        {/* Blockchain Properties Section */}
        <div>
          <h3 className="text-2xl font-semibold text-blue-400 mb-4">
            🔗 Properties from Blockchain
          </h3>
          {/* Updated responsive grid */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
            {blockchainData.length > 0 ? (
              blockchainData.map((block, index) =>
                block.dlid ? (
                  <div
                    key={index}
                    className="bg-gray-800 shadow-lg rounded-xl overflow-hidden transition transform hover:scale-105 cursor-pointer"
                    onClick={() => {
                      // Navigate to details page when the card is clicked
                      navigate(`/blockchain-details/${block.dlid}`);
                    }}
                  >
                    <div className="p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-blue-400">
                            DLID: {block.dlid}
                          </h3>
                          <p className="flex items-center text-gray-400 text-sm mt-1">
                            📍 {block.landmark}
                          </p>
                        </div>
                      </div>
                      <hr className="my-3 border-gray-600" />
                      {/* 2x2 grid for property details */}
                      <div className="grid grid-cols-2 gap-4 text-gray-300">
                        <div>
                          <p className="text-sm font-medium">Owner</p>
                          <p className="text-lg font-bold">
                            {block.owner_name}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Area</p>
                          <p className="text-lg font-bold">{block.area}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Type</p>
                          <p className="text-lg font-bold">
                            {block.property_type}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Price</p>
                          <p className="text-lg font-bold">${block.price}</p>
                        </div>
                      </div>
                      {/* Buttons */}
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={(e) => handlePurchase(block.dlid, e)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
                        >
                          Purchase
                        </button>
                        <button
                          onClick={handleConsult}
                          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition"
                        >
                          Consult
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null
              )
            ) : (
              <p className="text-center text-gray-500">
                No blockchain properties found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}