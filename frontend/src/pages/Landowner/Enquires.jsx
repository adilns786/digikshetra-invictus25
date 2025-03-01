
import React, { useState } from "react";
import { Check, MessageSquare, MoreHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function InquiriesAndOffers() {
  const [activeTab, setActiveTab] = useState("All");

  const inquiries = [
    { id: 1, type: "Inquiry", name: "John Smith", daysAgo: 2, property: "Riverside Villa", message: "I'm interested in this property and would like to schedule a viewing. Please let me know when you're available." },
    { id: 2, type: "Offer", name: "Jane Doe", daysAgo: 1, property: "Mountain View Cottage", amount: 220000, message: "I would like to make an offer on this property. I'm ready to proceed with the purchase if you accept." },
    { id: 3, type: "Inquiry", name: "Michael Brown", daysAgo: 3, property: "Downtown Apartment", message: "Can you provide more details about the amenities and location?" },
    { id: 4, type: "Offer", name: "Emily Clark", daysAgo: 5, property: "Seaside Bungalow", amount: 340000, message: "I'm making an offer on this property. Let me know your decision." },
    { id: 5, type: "Inquiry", name: "Daniel Lee", daysAgo: 4, property: "Countryside Farmhouse", message: "I'd like to visit this property. When would be a good time?" }
  ];

  const filteredInquiries = activeTab === "All" ? inquiries : inquiries.filter(inquiry => inquiry.type === activeTab);

  return (
    <div className="lg:pl-50 ">
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen ">
      {/* Header */}
      <div>
        <h2 className="text-4xl font-bold text-gray-800">📩 Inquiries & Offers</h2>
        <p className="text-gray-600">Manage inquiries and offers from potential buyers.</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4">
        {["All", "Inquiries", "Offers"].map(tab => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "outline"}
            className="w-[120px] transition"
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Button>
        ))}
      </div>

      {/* Inquiry Cards */}
      <div className="space-y-4">
        {filteredInquiries.length > 0 ? (
          filteredInquiries.map((inquiry) => (
            <Card key={inquiry.id} className="bg-white shadow-lg rounded-xl overflow-hidden transition transform hover:scale-105">
              <CardHeader className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center text-gray-800">
                      <MessageSquare className="mr-2 h-5 w-5 text-blue-500" />
                      {inquiry.type} for {inquiry.property}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      From: {inquiry.name} • {inquiry.daysAgo} day{inquiry.daysAgo !== 1 ? "s" : ""} ago
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {inquiry.type === "Offer" && (
                      <div className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                        ${inquiry.amount.toLocaleString()}
                      </div>
                    )}
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4 text-gray-500" />
                      <span className="sr-only">More</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="p-4">
                <p className="text-gray-700 text-sm">{inquiry.message}</p>
                <div className="mt-4 flex justify-end gap-2">
                  <Button variant="outline" size="sm">Reply</Button>
                  {inquiry.type === "Offer" && (
                    <>
                      <Button variant="outline" size="sm" className="text-red-600 border-red-500 hover:bg-red-100">
                        <X className="mr-2 h-4 w-4" />
                        Decline
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        <Check className="mr-2 h-4 w-4" />
                        Accept
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500">No {activeTab.toLowerCase()} found.</p>
        )}
      </div>
    </div>
    </div>
  );
}
