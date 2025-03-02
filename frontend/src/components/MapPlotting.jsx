

import React, { useState } from "react";
import { MapContainer, TileLayer, Polygon, Popup, useMapEvents } from "react-leaflet";
import { Button, ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddCoordinatesOnClick = ({ setCoordinates, setIsAdding }) => {
  useMapEvents({
    click(e) {
      if (setIsAdding) {
        const { lat, lng } = e.latlng;
        setCoordinates((prevCoords) => [...prevCoords, [lat, lng]]);
      }
    },
  });

  return null;
};

const MapPlotting = ({ setCoordinates }) => {
  const [coordinates, setLocalCoordinates] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  const handleFinalize = () => {
    setIsAdding(false);
    // setCoordinates(coordinates); 
    localStorage.setItem("coordinates", JSON.stringify(coordinates));
    navigate("/dashboard/addproject"); // Navigate back to form
  };

  const handleClear = () => {
    setLocalCoordinates([]);
  };

  return (
    <div>
      <MapContainer center={[19.076, 72.8777]} zoom={13} style={{ height: "80vh", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <AddCoordinatesOnClick setCoordinates={setLocalCoordinates} setIsAdding={setIsAdding} />
        {coordinates.length > 2 && (
          <Polygon positions={coordinates} color="blue" fillOpacity={0.4}>
            <Popup>Selected Area</Popup>
          </Polygon>
        )}
      </MapContainer>
      <ButtonGroup>
        <Button onClick={() => setIsAdding(true)}>Add Points</Button>
        <Button onClick={handleFinalize} disabled={!isAdding}>Finalize</Button>
        <Button onClick={handleClear}>Clear</Button>
      </ButtonGroup>
    </div>
  );
};

export default MapPlotting;
