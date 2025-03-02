import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Error Boundary Component for catching errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log("Error caught by error boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center text-white mt-6">Something went wrong.</div>
      );
    }

    return this.props.children;
  }
}

// Blockchain Details page component
const BlockchainDetails = () => {
  const { dlid } = useParams();
  const [ledger, setLedger] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLedgerData = async () => {
      console.log("Fetching data for DLID:", dlid); // Log the DLID value

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/ledgers/get-ledger/${dlid}/`
        );
        const data = await response.json();

        console.log("API Response:", data); // Log the full response

        if (data && Array.isArray(data.ledger)) {
          setLedger(data.ledger);
        } else {
          setError("Invalid response structure.");
        }
      } catch (error) {
        console.error("Error fetching ledger data:", error);
        setError("Error fetching data, please try again later.");
      }
    };

    if (dlid) {
      fetchLedgerData();
    }
  }, [dlid]); // This will ensure API call is made only once

  if (error) {
    return (
      <div className="text-center text-white mt-6">
        <p>{error}</p>
      </div>
    );
  }

  if (!ledger) {
    return (
      <div className="text-center text-white mt-6">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen w-full p-6 overflow-auto">
      <div className="bg-gray-800 shadow-lg rounded-xl p-6 space-y-4 w-full max-w-7xl mx-auto">
        <h3 className="text-2xl font-semibold text-blue-400 text-center">
          Blockchain Ledger
        </h3>
        <div className="space-y-4 text-gray-300 mt-4">
          {ledger.map((block, index) => (
            <div
              key={index}
              className="block-div space-y-2 ml-4 mb-4 p-4 border-2 border-gray-600 rounded-lg"
            >
              {/* Each block is wrapped in its own div with unique styling */}
              <div className="space-y-1">
                <h4 className="font-semibold text-lg text-blue-300">
                  Block {index}{" "}
                  {index === 0 ? "(Genesis Block)" : "(Transaction Block)"}
                </h4>
                {index === 0 ? (
                  <div className="space-y-1">
                    <p>
                      <strong>DLID:</strong> {block.dlid}
                    </p>
                    <p>
                      <strong>Owner Name:</strong> {block.owner_name}
                    </p>
                    <p>
                      <strong>Area:</strong> {block.area}
                    </p>
                    <p>
                      <strong>Landmark:</strong> {block.landmark}
                    </p>
                    <p>
                      <strong>Price:</strong> ${block.price}
                    </p>
                    <p>
                      <strong>Property Type:</strong> {block.property_type}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p>
                      <strong>Sender:</strong> {block.sender}
                    </p>
                    <p>
                      <strong>Receiver:</strong> {block.receiver}
                    </p>
                    <p>
                      <strong>Amount:</strong> ${block.amount}
                    </p>
                    <p>
                      <strong>Timestamp:</strong> {block.timestamp}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function BlockchainDetailsWrapper() {
  return (
    <ErrorBoundary>
      <BlockchainDetails />
    </ErrorBoundary>
  );
}
