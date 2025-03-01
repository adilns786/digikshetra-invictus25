import React from "react";
import { Check, MessageSquare, MoreHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function InquiriesAndOffers() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Inquiries & Offers</h2>
        <p className="text-muted-foreground">Manage inquiries and offers from potential buyers</p>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline" className="w-[120px]">All</Button>
        <Button variant="outline" className="w-[120px]">Inquiries</Button>
        <Button variant="outline" className="w-[120px]">Offers</Button>
      </div>

      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                    {i % 2 === 0 ? "Inquiry" : "Offer"} for {i % 3 === 0 ? "Riverside Villa" : i % 3 === 1 ? "Mountain View Cottage" : "Downtown Apartment"}
                  </CardTitle>
                  <CardDescription>
                    From: John {i % 2 === 0 ? "Smith" : "Doe"} • {i + 1} day{i !== 0 ? "s" : ""} ago
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {i % 2 === 1 && (
                    <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      ${(180000 + i * 20000).toLocaleString()}
                    </div>
                  )}
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="p-4">
              <p className="text-sm">
                {i % 2 === 0
                  ? "I'm interested in this property and would like to schedule a viewing. Please let me know when you're available."
                  : "I would like to make an offer on this property. I'm ready to proceed with the purchase if you accept."}
              </p>
              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline" size="sm">Reply</Button>
                {i % 2 === 1 && (
                  <>
                    <Button variant="outline" size="sm" className="text-destructive">
                      <X className="mr-2 h-4 w-4" />
                      Decline
                    </Button>
                    <Button size="sm">
                      <Check className="mr-2 h-4 w-4" />
                      Accept
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
