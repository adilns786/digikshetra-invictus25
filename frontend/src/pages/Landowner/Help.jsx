import React from "react";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const HelpAndSupport = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Help & Support</h2>
        <p className="text-muted-foreground">Find answers to your questions or contact our support team</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Common questions about using the platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  question: "How do I add a new property?",
                  answer:
                    "To add a new property, navigate to the 'Property Listings' page and click on the 'Add New Property' button. Fill in all the required details and upload the necessary documents.",
                },
                {
                  question: "How do I respond to inquiries?",
                  answer:
                    "You can view and respond to inquiries in the 'Inquiries & Offers' section. Click on the 'Reply' button to send a message to the potential buyer.",
                },
                {
                  question: "What documents are required to list a property?",
                  answer:
                    "Required documents include Title Deed, Encumbrance Certificate, Property Tax Receipts, and Identification Proofs. These can be uploaded during the property listing process.",
                },
                {
                  question: "How does the GIS mapping work?",
                  answer:
                    "The GIS mapping feature allows you to define your property boundaries on a map. You can either draw the boundaries directly on the map or enter the GPS coordinates.",
                },
                {
                  question: "How do I accept or decline an offer?",
                  answer:
                    "When you receive an offer, you can view it in the 'Inquiries & Offers' section. Each offer will have 'Accept' and 'Decline' buttons to take the appropriate action.",
                },
              ].map((faq, i) => (
                <div key={i} className="space-y-2">
                  <h3 className="font-medium">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  {i < 4 && <Separator className="my-2" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Get in touch with our customer support team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 grid-cols-1">
                {[
                  {
                    icon: <Phone className="h-5 w-5 text-primary" />,
                    title: "Phone Support",
                    details: "+1 (555) 123-4567",
                    extra: "Mon-Fri, 9am-5pm",
                  },
                  {
                    icon: <Mail className="h-5 w-5 text-primary" />,
                    title: "Email Support",
                    details: "support@landownerportal.com",
                    extra: "24/7 support",
                  },
                  {
                    icon: <MessageSquare className="h-5 w-5 text-primary" />,
                    title: "Live Chat",
                    details: "Available on website",
                    extra: "Mon-Fri, 9am-5pm",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 rounded-lg border p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.details}</p>
                      <p className="text-xs text-muted-foreground">{item.extra}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>Send us a message and we'll get back to you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input id="subject" placeholder="What is your message about?" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Describe your issue or question"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                ></textarea>
              </div>
              <Button className="w-full">Send Message</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HelpAndSupport;
