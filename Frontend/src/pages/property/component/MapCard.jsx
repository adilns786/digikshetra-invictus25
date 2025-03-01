import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Input } from "@/components/ui/input";

const MapCard = ({formData ,handleChange}) => {
    return (
        <Card>
        <CardHeader>
          <CardTitle>GIS Mapping</CardTitle>
          <CardDescription>Define property boundaries</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-video w-full bg-muted rounded-md flex items-center justify-center text-muted-foreground">
            Map Interface Placeholder
          </div>
          <Input
            id="coordinates"
            placeholder="GPS coordinates"
            value={formData.coordinates}
            onChange={handleChange}
          />
        </CardContent>
      </Card>
    );
};

export default MapCard;