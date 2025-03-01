
import { Link } from "react-router-dom";
import { Calculator, Heart, Search, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BuyerDashboard() {
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Buyer Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome to your buyer portal! Find and manage your property interests effortlessly.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link to="/buyer/search">
              <Search className="mr-2 h-4 w-4" />
              Search Properties
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[{
          title: "Find Properties",
          description: "Search for your dream property",
          icon: <Search className="h-8 w-8 text-primary" />,
          link: "/buyer/search",
          bgClass: "bg-gradient-to-br from-primary/20 to-primary/5"
        }, {
          title: "Saved Properties",
          description: "View your favorite listings",
          icon: <Heart className="h-8 w-8 text-pink-500" />,
          link: "/buyer/favorites",
          bgClass: "bg-gradient-to-br from-pink-100 to-pink-50 dark:from-pink-900/20 dark:to-pink-800/10"
        }, {
          title: "Mortgage Calculator",
          description: "Estimate your monthly payments",
          icon: <Calculator className="h-8 w-8 text-blue-500" />,
          link: "/buyer/calculator",
          bgClass: "bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-800/10"
        }, {
          title: "Reviews & Ratings",
          description: "Share your property experiences",
          icon: <Star className="h-8 w-8 text-amber-500" />,
          link: "/buyer/reviews",
          bgClass: "bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/20 dark:to-amber-800/10"
        }].map((item, i) => (
          <Card key={i} className={`p-4 shadow-md rounded-xl transition-transform transform hover:scale-105 ${item.bgClass}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                {item.icon}
                <Button asChild size="sm" variant="outline">
                  <Link to={item.link}>Explore</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h3 className="text-xl font-semibold mt-8">Featured Properties</h3>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {["Riverside Villa", "Mountain View Cottage", "Downtown Apartment"].map((name, i) => (
          <Card key={i} className="overflow-hidden shadow-lg rounded-xl">
            <div className="aspect-video w-full bg-muted relative">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                Property Image
              </div>
            </div>
            <CardHeader className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="line-clamp-1">{name}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    {i === 0 ? "123 River Road, Riverside" : i === 1 ? "45 Mountain View, Highland" : "789 Main St, Downtown"}
                  </CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-pink-500">
                  <Heart className="h-4 w-4" />
                  <span className="sr-only">Add to favorites</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium">Price</p>
                  <p className="text-xl font-bold">${(200000 + i * 50000).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Area</p>
                  <p className="text-xl font-bold">{1000 + i * 200} sqft</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Type</p>
                  <p className="text-xl font-bold">{i === 0 ? "Residential" : i === 1 ? "Agricultural" : "Commercial"}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button asChild>
                  <Link to={`/buyer/property/${i}`}>View Details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
