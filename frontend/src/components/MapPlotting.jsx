

// import React, { useState } from "react";
// import { MapContainer, TileLayer, Polygon, Popup, useMapEvents } from "react-leaflet";
// import { Button, ButtonGroup } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const AddCoordinatesOnClick = ({ setCoordinates, setIsAdding }) => {
//   useMapEvents({
//     click(e) {
//       if (setIsAdding) {
//         const { lat, lng } = e.latlng;
//         setCoordinates((prevCoords) => [...prevCoords, [lat, lng]]);
//       }
//     },
//   });

//   return null;
// };

// const MapPlotting = ({ setCoordinates }) => {
//   const [coordinates, setLocalCoordinates] = useState([]);
//   const [isAdding, setIsAdding] = useState(false);
//   const navigate = useNavigate();

//   const handleFinalize = () => {
//     setIsAdding(false);
//     // setCoordinates(coordinates); 
//     localStorage.setItem("coordinates", JSON.stringify(coordinates));
//     navigate("/dashboard/addproject"); // Navigate back to form
//   };

//   const handleClear = () => {
//     setLocalCoordinates([]);
//   };

//   return (
//     <div>
//       <MapContainer center={[19.076, 72.8777]} zoom={13} style={{ height: "80vh", width: "100%" }}>
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         <AddCoordinatesOnClick setCoordinates={setLocalCoordinates} setIsAdding={setIsAdding} />
//         {coordinates.length > 2 && (
//           <Polygon positions={coordinates} color="blue" fillOpacity={0.4}>
//             <Popup>Selected Area</Popup>
//           </Polygon>
//         )}
//       </MapContainer>
//       <ButtonGroup>
//         <Button onClick={() => setIsAdding(true)}>Add Points</Button>
//         <Button onClick={handleFinalize} disabled={!isAdding}>Finalize</Button>
//         <Button onClick={handleClear}>Clear</Button>
//       </ButtonGroup>
//     </div>
//   );
// };

// export default MapPlotting;
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Polygon, Popup, useMapEvents } from "react-leaflet";
import { Button, ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css"; 

// Component to add coordinates on map click
const AddCoordinatesOnClick = ({ setCoordinates, isAdding }) => {
  useMapEvents({
    click(e) {
      if (isAdding) {
        const { lat, lng } = e.latlng;
        setCoordinates((prev) => [...prev, [lat, lng]]);
      }
    },
  });
  return null;
};

export default function MapPlotting() {
  const [coordinates, setCoordinates] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  // Load stored coordinates when the component mounts
  useEffect(() => {
    const storedCoordinates = JSON.parse(localStorage.getItem("coordinates")) || [];
    setCoordinates(storedCoordinates);
  }, []);

  const handleFinalize = () => {
    setIsAdding(false);
    localStorage.setItem("coordinates", JSON.stringify(coordinates));
    navigate("/landowner/properties/new"); // Corrected navigation path
  };

  const handleClear = () => {
    setCoordinates([]);
    localStorage.removeItem("coordinates");
  };

  return (
    <div className="w-full h-screen flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">📍 Select Property Boundaries</h2>
      <MapContainer
        center={[19.076, 72.8777]}
        zoom={13}
        style={{ height: "70vh", width: "90vw", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <AddCoordinatesOnClick setCoordinates={setCoordinates} isAdding={isAdding} />
        {coordinates.length > 2 && (
          <Polygon positions={coordinates} color="blue" fillOpacity={0.4}>
            <Popup>Selected Area</Popup>
          </Polygon>
        )}
      </MapContainer>

      <ButtonGroup className="mt-4">
        <Button onClick={() => setIsAdding(true)} variant="contained" color="primary">Add Points</Button>
        <Button onClick={handleFinalize} disabled={coordinates.length < 3} variant="contained" color="success">
          Finalize
        </Button>
        <Button onClick={handleClear} variant="contained" color="error">Clear</Button>
      </ButtonGroup>
    </div>
  );
}
