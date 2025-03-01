
import { ArrowLeft, Bath, Bed, Calendar, Heart, MapPin, MessageSquare, Share2, Square, Star } from "lucide-react"
import { useParams,Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function PropertyDetails()  {
    const { id } = useParams();
    

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/buyer/search">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div className="flex-1">
          <h2 className="text-3xl font-bold tracking-tight">
            {id % 3 === 0 ? "Riverside Villa" : id % 3 === 1 ? "Mountain View Cottage" : "Downtown Apartment"}
          </h2>
          <p className="text-muted-foreground flex items-center">
            <MapPin className="mr-1 h-4 w-4" />
            {id % 3 === 0
              ? "123 River Road, Riverside"
              : id % 3 === 1
                ? "45 Mountain View, Highland"
                : "789 Main St, Downtown"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Heart className="h-4 w-4" />
            <span className="sr-only">Add to favorites</span>
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
            <span className="sr-only">Share</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <div className="aspect-video w-full bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
            Main Property Image
          </div>
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="aspect-video bg-muted rounded-lg flex items-center justify-center text-xs text-muted-foreground"
              >
                Image {i + 1}
              </div>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">${(200000 + id * 50000).toLocaleString()}</CardTitle>
            <CardDescription>Listed on {new Date().toLocaleDateString()}</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Bed className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Bedrooms</p>
                  <p className="text-lg">{id + 2}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Bathrooms</p>
                  <p className="text-lg">{id + 1}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Square className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Area</p>
                  <p className="text-lg">{1000 + id * 200} sqft</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Year Built</p>
                  <p className="text-lg">{2010 + id}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="font-medium">Contact Seller</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <textarea
                  placeholder="Your Message"
                  rows={3}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                ></textarea>
                <Button className="w-full">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Inquiry
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Property Description</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm leading-relaxed">
                {id % 3 === 0 ? (
                  <>
                    This stunning riverside villa offers luxurious living with breathtaking views of the water. The
                    property features spacious rooms, high ceilings, and large windows that flood the interior with
                    natural light. The open floor plan creates a seamless flow between the living, dining, and kitchen
                    areas, making it perfect for entertaining.
                    <br />
                    <br />
                    Outside, you'll find a beautifully landscaped garden with a private patio, swimming pool, and direct
                    access to the river. The property also includes a private dock for boating enthusiasts.
                  </>
                ) : id % 3 === 1 ? (
                  <>
                    Nestled in the serene highlands, this charming mountain view cottage offers a peaceful retreat from
                    city life. The property boasts panoramic views of the surrounding mountains and valleys, creating a
                    truly magical setting.
                    <br />
                    <br />
                    The cottage features rustic yet modern interiors with wooden beams, a stone fireplace, and cozy
                    nooks. The kitchen is fully equipped with modern appliances, and the bedrooms offer comfortable
                    spaces with stunning views.
                  </>
                ) : (
                  <>
                    Located in the heart of downtown, this modern apartment offers the perfect blend of convenience and
                    luxury. The sleek, contemporary design features high-end finishes, floor-to-ceiling windows, and an
                    open concept layout.
                    <br />
                    <br />
                    The kitchen is equipped with top-of-the-line appliances and custom cabinetry. The living area opens
                    to a private balcony with city views. The building offers amenities including a fitness center,
                    rooftop terrace, and 24-hour concierge service.
                  </>
                )}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Features & Amenities</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "Central Air Conditioning",
                  "Hardwood Floors",
                  "Walk-in Closets",
                  "Stainless Steel Appliances",
                  "Granite Countertops",
                  "Fireplace",
                  "Garden",
                  "Parking",
                  "Security System",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-primary"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Location & Nearby</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="aspect-video w-full bg-muted rounded-lg flex items-center justify-center text-muted-foreground mb-4">
                Map View
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Schools</h4>
                  <ul className="space-y-1 text-sm">
                    <li>Riverside Elementary (0.5 miles)</li>
                    <li>Highland Middle School (1.2 miles)</li>
                    <li>Central High School (2.0 miles)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Shopping</h4>
                  <ul className="space-y-1 text-sm">
                    <li>Riverside Mall (1.0 mile)</li>
                    <li>Downtown Market (0.8 miles)</li>
                    <li>Highland Shopping Center (1.5 miles)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Transportation</h4>
                  <ul className="space-y-1 text-sm">
                    <li>Bus Station (0.3 miles)</li>
                    <li>Train Station (1.0 mile)</li>
                    <li>Highway Access (0.5 miles)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="mr-2 h-5 w-5 text-amber-500" />
                Reviews & Ratings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="text-3xl font-bold">4.8</div>
                <div className="flex-1">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < 5 ? "text-amber-500" : "text-muted"}`}
                        fill={i < 5 ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Based on 12 reviews</p>
                </div>
              </div>

              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">John {i === 0 ? "Smith" : i === 1 ? "Doe" : "Johnson"}</div>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star
                            key={j}
                            className={`h-3 w-3 ${j < 5 - (i % 2) ? "text-amber-500" : "text-muted"}`}
                            fill={j < 5 - (i % 2) ? "currentColor" : "none"}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {new Date(2023, 5 + i, 10).toLocaleDateString()}
                    </p>
                    <p className="text-sm">
                      {i === 0
                        ? "Beautiful property with amazing views. The location is perfect and the amenities are top-notch."
                        : i === 1
                          ? "Great experience overall. The property is well-maintained and the owner was very responsive."
                          : "Highly recommend this property. It exceeded our expectations in every way."}
                    </p>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4">
                View All Reviews
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mortgage Calculator</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Home Price</label>
                  <input
                    type="text"
                    value={`$${(200000 + id * 50000).toLocaleString()}`}
                    readOnly
                    className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Down Payment (20%)</label>
                  <input
                    type="text"
                    value={`$${((200000 + id * 50000) * 0.2).toLocaleString()}`}
                    readOnly
                    className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Loan Amount</label>
                  <input
                    type="text"
                    value={`$${((200000 + id * 50000) * 0.8).toLocaleString()}`}
                    readOnly
                    className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Estimated Monthly Payment</label>
                  <input
                    type="text"
                    value={`$${Math.round((200000 + id * 50000) * 0.8 * 0.005).toLocaleString()}/month`}
                    readOnly
                    className="flex h-10 w-full rounded-md border border-input bg-primary/10 px-3 py-2 text-sm font-medium ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>

              <Button asChild className="w-full mt-4">
                <Link href="/buyer/calculator">Detailed Calculator</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Similar Properties</h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-video w-full bg-muted relative">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  Property Image
                </div>
              </div>
              <CardHeader className="p-4">
                <div>
                  <CardTitle className="line-clamp-1">
                    {i === 0 ? "Lakeside Cottage" : i === 1 ? "Forest Retreat" : "City Loft"}
                  </CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="mr-1 h-3 w-3" />
                    {i === 0
                      ? "456 Lake Ave, Lakeside"
                      : i === 1
                        ? "789 Forest Rd, Woodland"
                        : "123 Urban St, Downtown"}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm font-medium">Price</p>
                    <p className="text-xl font-bold">${(180000 + i * 40000).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Area</p>
                    <p className="text-xl font-bold">{900 + i * 150} sqft</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button asChild>
                    <Link href={`/buyer/property/${i + 3}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

