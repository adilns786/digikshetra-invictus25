
import { useState } from "react";
import {Link} from 'react-router-dom'; ;
import {
  BookOpen,
  CheckCircle,
  FileText,
  Highlighter,
  Home,
  MessageSquare,
  PenTool,
  Search,
  Settings,
  User,
  Users,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function LawyerDashboard() {
  const [activeDocument, setActiveDocument] = useState(null);
  const [annotations, setAnnotations] = useState({
    "sale-agreement": ["Clause 3.2 needs revision", "Payment terms unclear in section 5"],
    "title-deed": ["Boundary description matches survey report", "Historical ownership verified"],
  });

  
  const documents = [
    { id: "sale-agreement", name: "Sale Agreement", status: "pending", date: "2023-05-15" },
    { id: "title-deed", name: "Title Deed", status: "approved", date: "2023-05-10" },
    { id: "survey-report", name: "Survey Report", status: "pending", date: "2023-05-12" },
    { id: "tax-clearance", name: "Tax Clearance", status: "rejected", date: "2023-05-08" },
  ]

  const conversations = [
    { id: "conv1", with: "John Buyer", lastMessage: "When will the documents be ready?", time: "10:30 AM" },
    { id: "conv2", with: "Sarah Seller", lastMessage: "I've uploaded the revised agreement", time: "Yesterday" },
    { id: "conv3", with: "First National Bank", lastMessage: "Loan approval confirmation", time: "May 12" },
  ]

  const templates = [
    { id: "temp1", name: "Residential Sale Agreement", category: "Real Estate" },
    { id: "temp2", name: "Commercial Lease", category: "Real Estate" },
    { id: "temp3", name: "Property Transfer Deed", category: "Real Estate" },
    { id: "temp4", name: "Mortgage Agreement", category: "Finance" },
  ]
  const handleAddAnnotation = (documentId, annotation) => {
    setAnnotations((prev) => ({
      ...prev,
      [documentId]: [...(prev[documentId] || []), annotation],
    }));
  };
  
  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pending
          </Badge>
        );
    }
  };
  

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      {/* Sidebar */}
      <div className="hidden w-64 flex-col bg-white border-r border-gray-200 md:flex">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="#" className="flex items-center gap-2 font-semibold">
            <BookOpen className="h-6 w-6 text-indigo-600" />
            <span className="text-lg">LegalAssist</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <FileText className="h-4 w-4" />
              Documents
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <MessageSquare className="h-4 w-4" />
              Messages
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                3
              </Badge>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <PenTool className="h-4 w-4" />
              Agreements
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <Users className="h-4 w-4" />
              Clients
            </Link>
            <Separator className="my-2" />
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </div>
        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
              <User className="h-5 w-5" />
            </div>
            <div>
              <div className="font-medium"> Darshan Khapekar</div>
              <div className="text-xs text-gray-500">Senior Legal Counsel</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col w-full">
        {/* Header */}
        <header className="flex h-14 items-center gap-4 border-b bg-white px-6">
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search documents, clients..."
                  className="w-full bg-white pl-8 md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <span className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full">
                  <div className="h-full w-full rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <User className="h-5 w-5" />
                  </div>
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto ">
          <div className="container mx-auto p-4 md:p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight">Lawyer Dashboard</h1>
              <p className="text-gray-500">Manage legal documents and client communications</p>
            </div>

            <Tabs defaultValue="documents">
              <TabsList className="mb-4">
                <TabsTrigger value="documents">Document Review</TabsTrigger>
                <TabsTrigger value="communication">Communication</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
              </TabsList>

              {/* Document Review Tab */}
              <TabsContent value="documents" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="md:col-span-1">
                    <Card>
                      <CardHeader>
                        <CardTitle>Documents</CardTitle>
                        <CardDescription>Review and manage legal documents</CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="space-y-2 p-4">
                          {documents.map((doc) => (
                            <div
                              key={doc.id}
                              className={`flex items-center justify-between rounded-lg border p-3 cursor-pointer ${
                                activeDocument === doc.id ? "border-indigo-500 bg-indigo-50" : ""
                              }`}
                              onClick={() => setActiveDocument(doc.id)}
                            >
                              <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-gray-500" />
                                <div>
                                  <div className="font-medium">{doc.name}</div>
                                  <div className="text-xs text-gray-500">Uploaded: {doc.date}</div>
                                </div>
                              </div>
                              <div>{getStatusBadge(doc.status)}</div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="md:col-span-2">
                    {activeDocument ? (
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                          <div>
                            <CardTitle>{documents.find((d) => d.id === activeDocument)?.name}</CardTitle>
                            <CardDescription>Review and annotate this document</CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="outline" size="icon">
                                    <Highlighter className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Highlight text</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="outline" size="icon">
                                    <PenTool className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Add annotation</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="rounded-lg border bg-white p-4 h-[400px] overflow-auto">
                            {/* Document content would go here - using placeholder */}
                            <div className="space-y-4">
                              <p className="text-sm">
                                This SALE AGREEMENT is made on this day of [Date], by and between:
                              </p>
                              <p className="text-sm">
                                <strong>SELLER:</strong> [Seller Name], of [Address]
                              </p>
                              <p className="text-sm">
                                <strong>BUYER:</strong> [Buyer Name], of [Address]
                              </p>
                              <p className="text-sm">
                                WHEREAS, the Seller is the owner of certain real property located at [Property Address]
                                (the "Property"); and
                              </p>
                              <p className="text-sm">
                                WHEREAS, the Seller desires to sell the Property to the Buyer, and the Buyer desires to
                                purchase the Property from the Seller;
                              </p>
                              <p className="text-sm">
                                NOW, THEREFORE, in consideration of the mutual covenants and promises contained herein,
                                the parties agree as follows:
                              </p>
                              <p className="text-sm">
                                <strong>1. SALE OF PROPERTY</strong>
                              </p>
                              <p className="text-sm">
                                The Seller agrees to sell and convey to the Buyer, and the Buyer agrees to purchase from
                                the Seller, the Property.
                              </p>
                              <p className="text-sm">
                                <strong>2. PURCHASE PRICE</strong>
                              </p>
                              <p className="text-sm">
                                The purchase price for the Property is [Amount] (the "Purchase Price").
                              </p>
                              <p className="text-sm">
                                <strong>3. PAYMENT</strong>
                              </p>
                              <p className="text-sm">
                                3.1 The Buyer shall pay a deposit of [Deposit Amount] upon the execution of this
                                Agreement.
                              </p>
                              <p className="text-sm">3.2 The balance of the Purchase Price shall be paid at closing.</p>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex flex-col items-start gap-4">
                          <div className="w-full">
                            <h4 className="font-medium mb-2">Annotations</h4>
                            <div className="space-y-2">
                              {annotations[activeDocument]?.map((note, i) => (
                                <div key={i} className="rounded-lg bg-yellow-50 p-2 text-sm">
                                  {note}
                                </div>
                              ))}
                            </div>
                            <div className="mt-4 flex gap-2">
                              <Input
                                placeholder="Add annotation..."
                                className="flex-1"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    handleAddAnnotation(activeDocument, e.currentTarget.value)
                                    e.currentTarget.value = ""
                                  }
                                }}
                              />
                              <Button variant="outline">Add</Button>
                            </div>
                          </div>
                          <div className="flex w-full justify-end gap-2">
                            <Button variant="outline" className="gap-1">
                              <XCircle className="h-4 w-4" /> Reject
                            </Button>
                            <Button className="gap-1">
                              <CheckCircle className="h-4 w-4" /> Approve
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ) : (
                      <Card>
                        <CardContent className="flex h-[600px] items-center justify-center">
                          <div className="text-center">
                            <FileText className="mx-auto h-12 w-12 text-gray-300" />
                            <h3 className="mt-2 text-lg font-medium">No document selected</h3>
                            <p className="text-sm text-gray-500">Select a document from the list to review</p>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* Communication Tab */}
              <TabsContent value="communication" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="md:col-span-1">
                    <Card>
                      <CardHeader>
                        <CardTitle>Conversations</CardTitle>
                        <CardDescription>Communicate with clients and stakeholders</CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="space-y-2 p-4">
                          {conversations.map((conv) => (
                            <div
                              key={conv.id}
                              className="flex items-center justify-between rounded-lg border p-3 cursor-pointer hover:bg-gray-50"
                            >
                              <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                  <User className="h-5 w-5" />
                                </div>
                                <div>
                                  <div className="font-medium">{conv.with}</div>
                                  <div className="text-xs text-gray-500">{conv.lastMessage}</div>
                                </div>
                              </div>
                              <div className="text-xs text-gray-500">{conv.time}</div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="md:col-span-2">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <CardTitle>John Buyer</CardTitle>
                          <CardDescription>Last active: 10 minutes ago</CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="rounded-lg border bg-white p-4 h-[400px] overflow-auto">
                          <div className="space-y-4">
                            <div className="flex gap-3">
                              <div className="h-9 w-9 rounded-full bg-indigo-100 flex-shrink-0 flex items-center justify-center text-indigo-600">
                                <User className="h-5 w-5" />
                              </div>
                              <div className="rounded-lg bg-gray-100 p-3 text-sm">
                                <p>
                                  Hello Ms. Smith, I was wondering when the sale agreement will be ready for review?
                                </p>
                                <div className="mt-1 text-xs text-gray-500">10:15 AM</div>
                              </div>
                            </div>
                            <div className="flex gap-3 justify-end">
                              <div className="rounded-lg bg-indigo-100 p-3 text-sm">
                                <p>
                                  Hi John, I'm currently reviewing the document and should have it ready by tomorrow.
                                  There are a few clauses that need clarification.
                                </p>
                                <div className="mt-1 text-xs text-gray-500">10:20 AM</div>
                              </div>
                              <div className="h-9 w-9 rounded-full bg-indigo-600 flex-shrink-0 flex items-center justify-center text-white">
                                <User className="h-5 w-5" />
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <div className="h-9 w-9 rounded-full bg-indigo-100 flex-shrink-0 flex items-center justify-center text-indigo-600">
                                <User className="h-5 w-5" />
                              </div>
                              <div className="rounded-lg bg-gray-100 p-3 text-sm">
                                <p>That sounds good. Is there anything you need from me to help with the process?</p>
                                <div className="mt-1 text-xs text-gray-500">10:30 AM</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="flex w-full gap-2">
                          <Textarea placeholder="Type your message..." className="flex-1" />
                          <Button>Send</Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Templates Tab */}
              <TabsContent value="templates" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Document Templates</CardTitle>
                        <CardDescription>Standardized legal templates for quick document creation</CardDescription>
                      </div>
                      <Button>New Template</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {templates.map((template) => (
                        <Card key={template.id} className="overflow-hidden">
                          <CardHeader className="p-4">
                            <CardTitle className="text-base">{template.name}</CardTitle>
                            <CardDescription>{template.category}</CardDescription>
                          </CardHeader>
                          <CardFooter className="flex justify-between p-4 pt-0">
                            <Button variant="outline" size="sm">
                              Preview
                            </Button>
                            <Button size="sm">Use Template</Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

