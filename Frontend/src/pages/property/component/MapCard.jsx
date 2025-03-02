import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapCard = ({ formData, handleChange }) => {
    const navigate = useNavigate();
    const [coordinates, setCoordinates] = useState([]);

    // Load stored coordinates when the component mounts
    useEffect(() => {
        const storedCoordinates = JSON.parse(localStorage.getItem("coordinates")) || [];
        setCoordinates(storedCoordinates);
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>GIS Mapping</CardTitle>
                <CardDescription>Define property boundaries</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="aspect-video w-full bg-muted rounded-md flex items-center justify-center text-muted-foreground relative">
                    {coordinates.length > 2 ? (
                        <MapContainer
                            center={coordinates[0]} // Center map on first coordinate
                            zoom={14}
                            style={{ height: "100%", width: "100%", borderRadius: "8px" }}
                            className="absolute inset-0"
                        >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <Polygon positions={coordinates} color="blue" fillOpacity={0.4} />
                        </MapContainer>
                    ) : (
                        <span>Map Interface Placeholder</span>
                    )}
                </div>
                <Input id="coordinates" placeholder="GPS coordinates" value={formData.coordinates} onChange={handleChange} />
                <Button onClick={() => navigate("/map")} className="w-full mt-2">➕ Add Location</Button>
            </CardContent>
        </Card>
    );
};

export default MapCard;
