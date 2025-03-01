import { useState } from "react";
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
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function PropertyDetails() {
  const { id } = useParams();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  // Mock data for a property
  const property = {
    id: parseInt(id),
    title: parseInt(id) % 3 === 0 
      ? "Riverside Villa" 
      : parseInt(id) % 3 === 1 
      ? "Mountain View Cottage" 
      : "Downtown Apartment",
    address: parseInt(id) % 3 === 0
      ? "123 River Road, Riverside"
      : parseInt(id) % 3 === 1
      ? "45 Mountain View, Highland"
      : "789 Main St, Downtown",
    price: (200000 + parseInt(id) * 50000).toLocaleString(),
    area: 1000 + parseInt(id) * 200,
    type: parseInt(id) % 3 === 0 
      ? "Residential" 
      : parseInt(id) % 3 === 1 
      ? "Agricultural" 
      : "Commercial",
    bedrooms: parseInt(id) % 3 === 0 ? 4 : parseInt(id) % 3 === 1 ? 3 : 2,
    bathrooms: parseInt(id) % 3 === 0 ? 3 : parseInt(id) % 3 === 1 ? 2 : 1,
    yearBuilt: 2000 + parseInt(id) * 2,
    description: "This beautiful property offers modern living with scenic views and premium amenities. Located in a prime area with excellent connectivity to major landmarks, schools, and shopping centers. The property features high-quality construction, spacious rooms, and elegant finishes throughout.",
    longDescription: "This exceptional property stands as a testament to thoughtful design and premium construction. Nestled in a sought-after location, it offers the perfect blend of comfort, convenience, and style. The spacious layout creates an inviting atmosphere for both everyday living and entertaining guests.\n\nThe interior boasts high ceilings, abundant natural light, and premium fixtures throughout. The kitchen features top-of-the-line appliances, custom cabinetry, and elegant countertops. Each bedroom offers generous space and carefully planned storage solutions.\n\nThe property's exterior is equally impressive, with professionally landscaped grounds, outdoor living spaces, and beautiful views. Energy-efficient systems ensure comfort while minimizing environmental impact.\n\nThis location offers unparalleled access to quality schools, shopping centers, dining establishments, and recreational facilities. Major transportation routes are easily accessible, making commuting a breeze.",
    images: [
      `/api/placeholder/800/600`,
      `/api/placeholder/800/600`,
      `/api/placeholder/800/600`,
      `/api/placeholder/800/600`,
      `/api/placeholder/800/600`,
    ],
    features: [
      "Modern Kitchen",
      "High Ceilings",
      "Hardwood Floors",
      "Large Windows",
      "Central Air Conditioning",
      "Heating System",
      "Walk-in Closets",
      "Fireplace",
      "Outdoor Space",
      "Storage Space"
    ],
    amenities: [
      { name: "Wi-Fi", icon: <Wifi className="h-4 w-4" /> },
      { name: "Water Supply", icon: <Droplets className="h-4 w-4" /> },
      { name: "Electricity", icon: <Zap className="h-4 w-4" /> },
      { name: "Parking", icon: <Car className="h-4 w-4" /> },
      { name: "Garden", icon: <Trees className="h-4 w-4" /> },
      { name: "Security", icon: <ShieldCheck className="h-4 w-4" /> },
    ],
    agent: {
      name: "Alex Johnson",
      phone: "+1 (555) 123-4567",
      email: "alex.johnson@digiland.com",
      image: "/api/placeholder/150/150",
      rating: 4.8,
      reviews: 24,
      listings: 45
    },
    reviews: [
      {
        id: 1,
        name: "Sarah Williams",
        date: "3 months ago",
        rating: 5,
        comment: "Beautiful property with amazing views. The agent was very helpful throughout the process."
      },
      {
        id: 2,
        name: "Michael Chen",
        date: "5 months ago",
        rating: 4,
        comment: "Great location and well-maintained property. Just what we were looking for."
      }
    ],
    nearbyPlaces: [
      { name: "City Center", distance: "2.5 miles" },
      { name: "Central Park", distance: "1.2 miles" },
      { name: "Memorial Hospital", distance: "3.1 miles" },
      { name: "Westfield Mall", distance: "0.8 miles" },
      { name: "St. Mary's School", distance: "1.5 miles" },
      { name: "Metro Station", distance: "0.6 miles" }
    ],
    lastUpdated: "2 days ago"
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleShare = () => {
    // In a real app, this would open a share dialog
    alert("Share functionality would open here!");
  };

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
        <h1 className="text-3xl md:text-4xl font-bold">{property.title}</h1>
        <div className="flex items-center mt-2 text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{property.address}</span>
        </div>
        <div className="flex items-center mt-2 text-sm text-muted-foreground">
          <CalendarClock className="h-4 w-4 mr-1" />
          <span>Listed: {property.lastUpdated}</span>
          <Badge variant="outline" className="ml-4">
            {property.type}
          </Badge>
        </div>
      </div>

      {/* Property images */}
      <div className="relative mb-8 overflow-hidden rounded-lg border shadow-md">
        <div className="aspect-video bg-muted relative">
          <img 
            src={property.images[activeImageIndex]} 
            alt={`${property.title} - Image ${activeImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
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
            {activeImageIndex + 1} / {property.images.length}
          </div>
        </div>
        <div className="flex p-2 overflow-x-auto gap-2 bg-muted/20">
          {property.images.map((img, index) => (
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
      </div>

      {/* Price and key details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-2">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Price</p>
                <p className="text-3xl font-bold text-primary">${property.price}</p>
              </div>
              <div className="flex gap-6 mt-4 md:mt-0">
                <div className="flex flex-col items-center">
                  <div className="flex items-center text-muted-foreground mb-1">
                    <Bed className="h-4 w-4 mr-1" />
                    <span className="text-sm">Bedrooms</span>
                  </div>
                  <p className="font-bold">{property.bedrooms}</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex items-center text-muted-foreground mb-1">
                    <Bath className="h-4 w-4 mr-1" />
                    <span className="text-sm">Bathrooms</span>
                  </div>
                  <p className="font-bold">{property.bathrooms}</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex items-center text-muted-foreground mb-1">
                    <Maximize2 className="h-4 w-4 mr-1" />
                    <span className="text-sm">Area</span>
                  </div>
                  <p className="font-bold">{property.area} sqft</p>
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
        
        <TabsContent value="overview" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">Property Overview</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Property Type</p>
                  <p className="font-medium">{property.type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Year Built</p>
                  <p className="font-medium">{property.yearBuilt}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Area</p>
                  <p className="font-medium">{property.area} sqft</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bedrooms</p>
                  <p className="font-medium">{property.bedrooms}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bathrooms</p>
                  <p className="font-medium">{property.bathrooms}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p className="font-medium">{property.lastUpdated}</p>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <div className="space-y-4 mb-8">
                <p className="leading-relaxed whitespace-pre-line">{property.longDescription}</p>
              </div>
            </div>
            
            <div>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={property.agent.image} alt={property.agent.name} />
                      <AvatarFallback>{property.agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold">{property.agent.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 mr-1" />
                        <span>{property.agent.rating} ({property.agent.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-primary" />
                      <span>{property.agent.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-primary" />
                      <span>{property.agent.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-primary" />
                      <span>{property.agent.listings} active listings</span>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <Button className="w-full">Contact Agent</Button>
                </CardContent>
              </Card>
              
              <h3 className="font-bold mt-8 mb-3">Nearby Places</h3>
              <div className="space-y-2">
                {property.nearbyPlaces.map((place, index) => (
                  <div key={index} className="flex justify-between items-center text-sm p-2 border-b">
                    <span>{place.name}</span>
                    <span className="text-muted-foreground">{place.distance}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="features" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Features & Amenities</h2>
              
              <h3 className="text-xl font-semibold mb-4">Interior Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <h3 className="text-xl font-semibold mb-4">Amenities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      {amenity.icon}
                    </div>
                    <span>{amenity.name}</span>
                  </div>
                ))}
              </div>
              
              <div className="bg-muted rounded-lg p-6 mb-8">
                <div className="flex items-start">
                  <Info className="h-5 w-5 mr-2 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-2">Property Information</h4>
                    <p className="text-sm text-muted-foreground">
                      This property information is based on available data. The provided amenities, features, and related information may vary and should be independently verified.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold mb-4">Similar Properties</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((num) => (
                      <div key={num} className="flex gap-3">
                        <div className="h-16 w-16 bg-muted rounded flex-shrink-0 overflow-hidden">
                          <img src="/api/placeholder/100/100" alt="Property thumbnail" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm line-clamp-1">
                            {num === 1 ? "Modern Villa with Pool" : num === 2 ? "Cozy Apartment Downtown" : "Family Home with Garden"}
                          </h4>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {num === 1 ? "456 Lake View, Riverside" : num === 2 ? "123 Main St, Downtown" : "789 Park Lane, Suburb"}
                          </p>
                          <p className="text-sm font-bold mt-1">${(180000 + num * 70000).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">View All Similar</Button>
                </CardContent>
              </Card>
              
              <h3 className="font-bold mt-8 mb-3">Property Reviews</h3>
              <div className="space-y-4">
                {property.reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{review.name}</h4>
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star 
                            key={index} 
                            className={`h-3 w-3 ${
                              index < review.rating ? "fill-yellow-500 text-yellow-500" : "text-muted"
                            }`} 
                          />
                        ))}
                      </div>
                      <p className="text-sm">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-3 text-sm">View All Reviews</Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="location" className="mt-0">
          <h2 className="text-2xl font-bold mb-6">Location</h2>
          
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-8">
            <div className="text-center">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-primary" />
              <p className="text-lg font-medium">{property.address}</p>
              <p className="text-sm text-muted-foreground mb-4">Interactive map would be displayed here</p>
              <Button size="sm">View on Google Maps</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Nearby Places</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Education</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm p-2 bg-muted/50 rounded">
                      <span>St. Mary's School</span>
                      <span>1.5 miles</span>
                    </div>
                    <div className="flex justify-between items-center text-sm p-2 bg-muted/50 rounded">
                      <span>City College</span>
                      <span>2.3 miles</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Healthcare</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm p-2 bg-muted/50 rounded">
                      <span>Memorial Hospital</span>
                      <span>3.1 miles</span>
                    </div>
                    <div className="flex justify-between items-center text-sm p-2 bg-muted/50 rounded">
                      <span>Community Clinic</span>
                      <span>1.8 miles</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Transportation</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Public Transit</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm p-2 bg-muted/50 rounded">
                      <span>Metro Station</span>
                      <span>0.6 miles</span>
                    </div>
                    <div className="flex justify-between items-center text-sm p-2 bg-muted/50 rounded">
                      <span>Bus Stop</span>
                      <span>0.2 miles</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Shopping & Entertainment</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm p-2 bg-muted/50 rounded">
                      <span>Westfield Mall</span>
                      <span>0.8 miles</span>
                    </div>
                    <div className="flex justify-between items-center text-sm p-2 bg-muted/50 rounded">
                      <span>Central Park</span>
                      <span>1.2 miles</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="contact" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Contact Property Agent</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <input
                      id="name"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Your phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contactMethod" className="text-sm font-medium">
                      Preferred Contact Method
                    </label>
                    <select id="contactMethod" className="w-full px-3 py-2 border rounded-md">
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="both">Both</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="I'm interested in this property and would like to schedule a viewing..."
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="updates" />
                  <label htmlFor="updates" className="text-sm text-muted-foreground">
                    I'd like to receive updates about similar properties
                  </label>
                </div>
                
                <Button className="w-full sm:w-auto">Send Message</Button>
              </form>
            </div>
            
            <div>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <Avatar className="h-20 w-20 mx-auto mb-3">
                      <AvatarImage src={property.agent.image} alt={property.agent.name} />
                      <AvatarFallback>{property.agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-bold text-lg">{property.agent.name}</h3>
                    <div className="flex items-center justify-center text-sm text-muted-foreground">
                      <Star className="h-3 w-3                      fill-yellow-500 text-yellow-500 mr-1" />
                      <span>{property.agent.rating} ({property.agent.reviews} reviews)</span>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-primary" />
                      <span>{property.agent.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-primary" />
                      <span>{property.agent.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-primary" />
                      <span>{property.agent.listings} active listings</span>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <Button className="w-full">Contact Agent</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}