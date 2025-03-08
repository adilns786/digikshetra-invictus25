import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Share2,
  Heart,
  MapPin,
  CalendarClock,
  Bed,
  Bath,
  Home,
  Maximize2,
  Ruler,
  Wifi,
  Droplets,
  Zap,
  Car,
  Trees,
  ShieldCheck,
  Phone,
  Mail,
  Globe,
  ChevronLeft,
  ChevronRight,
  Info,
  Clock,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { db } from "../../Firebase/config"; // Update import path
import { doc, getDoc } from "firebase/firestore";
import config from '../../config';

export default function PropertyDetails() {
  const { id } = useParams();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blockchainData, setBlockchainData] = useState([]);

  // Fetch property data from Firestore
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const propertyRef = doc(db, "PropertyData", id);
        const propertyDoc = await getDoc(propertyRef);
console.log(propertyDoc.data());
        if (propertyDoc.exists()) {
          setProperty(propertyDoc.data());
        } else {
          setError("Property not found");
        }
      } catch (err) {
        setError("Failed to fetch property data");
        console.error("Error fetching property:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  // Handle image navigation
  const handleNextImage = () => {
    if (property?.propertyImages) {
      setActiveImageIndex((prev) =>
        prev === property.propertyImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handlePrevImage = () => {
    if (property?.propertyImages) {
      setActiveImageIndex((prev) =>
        prev === 0 ? property.propertyImages.length - 1 : prev - 1
      );
    }
  };
  useEffect(() => {
    const fetchBlockchainData = async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}/ledgers/blockchain/`);
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
  // Toggle wishlist
  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  // Handle share
  const handleShare = () => {
    alert("Share functionality would open here!");
  };

  // Loading state
  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  // Error state
  if (error) {
    return <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>;
  }

  // If property data is not found
  if (!property) {
    return <div className="container mx-auto px-4 py-8">Property not found.</div>;
  }

  // Default values for missing data
  const {
    title = "Untitled Property",
    address = "Address not provided",
    price = 0,
    area = 0,
    propertyType = "Unknown",
    bedrooms = 0,
    bathrooms = 0,
    yearBuilt = "Unknown",
    description = "No description provided.",
    longDescription = "No detailed description provided.",
    images = [],
    features = [],
    amenities = [],
    nearbyLandmarks = "None specified",
    agent = {
      name: "Unknown Agent",
      phone: "Not provided",
      email: "Not provided",
      image: "",
      rating: 0,
      reviews: 0,
      listings: 0,
    },
    reviews = [],
    nearbyPlaces = [],
    lastUpdated = "Unknown",
    propertyImages = [],
    documents = {},
  } = property;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button and actions */}
      <div className="flex justify-between items-center mb-6">
        <Link to="/properties" className="flex items-center text-primary hover:underline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Listings
        </Link>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleWishlist}
            className={isWishlisted ? "text-red-500" : ""}
          >
            <Heart className={`h-4 w-4 mr-2 ${isWishlisted ? "fill-red-500" : ""}`} />
            {isWishlisted ? "Saved" : "Save"}
          </Button>
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Property title and address */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
        <div className="flex items-center mt-2 text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{address}</span>
        </div>
        <div className="flex items-center mt-2 text-sm text-muted-foreground">
          <CalendarClock className="h-4 w-4 mr-1" />
          <span>Listed: {lastUpdated}</span>
          <Badge variant="outline" className="ml-4">
            {propertyType}
          </Badge>
        </div>
      </div>

      {/* Property images */}
      <div className="relative mb-8 overflow-hidden rounded-lg border shadow-md">
        <div className="aspect-video bg-muted relative">
          {propertyImages.length > 0 ? (
            <img
              src={propertyImages[activeImageIndex]}
              alt={`${title} - Image ${activeImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No images available
            </div>
          )}
          {propertyImages.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 shadow-md"
                onClick={handlePrevImage}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 shadow-md"
                onClick={handleNextImage}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 px-3 py-1 rounded-full text-sm">
                {activeImageIndex + 1} / {propertyImages.length}
              </div>
            </>
          )}
        </div>
        {propertyImages.length > 1 && (
          <div className="flex p-2 overflow-x-auto gap-2 bg-muted/20">
            {propertyImages.map((img, index) => (
              <div
                key={index}
                className={`w-20 h-20 flex-shrink-0 cursor-pointer rounded overflow-hidden border-2 ${
                  activeImageIndex === index ? "border-primary" : "border-transparent"
                }`}
                onClick={() => setActiveImageIndex(index)}
              >
                <img src={img} alt={`Thumbnail ${index}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price and key details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-2">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Price</p>
                <p className="text-3xl font-bold text-primary">${price.toLocaleString()}</p>
              </div>
              <div className="flex gap-6 mt-4 md:mt-0">
                <div className="flex flex-col items-center">
                  <div className="flex items-center text-muted-foreground mb-1">
                    <Bed className="h-4 w-4 mr-1" />
                    <span className="text-sm">Bedrooms</span>
                  </div>
                  <p className="font-bold">3</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex items-center text-muted-foreground mb-1">
                    <Bath className="h-4 w-4 mr-1" />
                    <span className="text-sm">Bathrooms</span>
                  </div>
                  <p className="font-bold">2</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex items-center text-muted-foreground mb-1">
                    <Maximize2 className="h-4 w-4 mr-1" />
                    <span className="text-sm">Area</span>
                  </div>
                  <p className="font-bold">{area} sqft</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              <h3 className="font-semibold">Request a Tour</h3>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <Button variant="outline" size="sm" className="w-full justify-center">Today</Button>
              <Button variant="outline" size="sm" className="w-full justify-center">Tomorrow</Button>
            </div>
            <Button className="w-full mb-2">Schedule Tour</Button>
            <Button variant="outline" className="w-full">Request Info</Button>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for property details */}
      <Tabs defaultValue="overview" className="mb-12">
        <TabsList className="w-full justify-start mb-6 border-b">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="features">Features & Amenities</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="contact">Contact Agent</TabsTrigger>
        </TabsList>

        {/* Tabs content */}
        <TabsContent value="overview" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">Property Overview</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Property Type</p>
                  <p className="font-medium">{propertyType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Year Built</p>
                  <p className="font-medium">2019</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Area</p>
                  <p className="font-medium">{area} sqft</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bedrooms</p>
                  <p className="font-medium">3</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bathrooms</p>
                  <p className="font-medium">2</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p className="font-medium">{lastUpdated}</p>
                </div>
              </div>

              <Separator className="my-6" />

              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <div className="space-y-4 mb-8">
                <p className="leading-relaxed whitespace-pre-line">{description}</p>
              </div>
            </div>

            <div>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={agent.image} alt={agent.name} />
                      <AvatarFallback>{agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold">Rahul Singh</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 mr-1" />
                        <span>4 (10 reviews)</span>
                      </div>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-primary" />
                      <span>985462317</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-primary" />
                      <span>agent.rahul@gmail.com</span>
                    </div>
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-primary" />
                      <span>5 active listings</span>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <Button className="w-full">Contact Agent</Button>
                </CardContent>
              </Card>

              <h3 className="font-bold mt-8 mb-3">Nearby Places</h3>
              <div className="space-y-2">
                {nearbyPlaces.map((place, index) => (
                  <div key={index} className="flex justify-between items-center text-sm p-2 border-b">
                    <span>{place.name}</span>
                    <span className="text-muted-foreground">{place.distance}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
 {/* Features & Amenities Tab */}
 <TabsContent value="features">
        <h2 className="text-2xl font-bold mb-4">Features & Amenities</h2>
        <p className="text-lg">Nearby Landmarks: {nearbyLandmarks || "None specified"}</p>
        <p className="text-lg">{amenities || "No amenities listed"}</p>
      </TabsContent>

      {/* Location Tab */}
      <TabsContent value="location">
        <h2 className="text-2xl font-bold mb-4">Location</h2>
        {/* <p className="text-lg">Coordinates: {coordinates || "Not provided"}</p> */}
        <p className="text-lg">Nearby Landmarks: {nearbyLandmarks
 || "None specified"}</p>
      </TabsContent>

      <TabsContent value="contact">
      <h2 className="text-2xl font-bold mb-4">Documents</h2>
        <ul className="space-y-2">
          {documents ? (
            Object.entries(documents).map(([key, url]) => (
              <li key={key} className="text-blue-500 underline">
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </a>
              </li>
            ))
          ) : (
            <p>No documents available</p>
          )}
        </ul>
        </TabsContent>
        {/* Other tabs (features, location, contact) */}
        {/* ... (rest of the code remains the same) ... */}
      </Tabs>
    </div>
  );
}