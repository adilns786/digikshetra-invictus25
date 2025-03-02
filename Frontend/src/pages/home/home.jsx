import { Link } from "react-router-dom";
import {
  ArrowRight,
  Database,
  Shield,
  FileCheck,
  Map,
  Brain,
  BarChart3,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-900 text-white">
      {/* Header */}
      {/* <header className="sticky top-0 z-50 w-full border-b border-gray-700 bg-gray-800/90 backdrop-blur supports-[backdrop-filter]:bg-gray-800/60">
        <div className="container flex h-16 items-center justify-between mx-auto px-4">
          <div className="flex items-center gap-2">
            <Database className="h-6 w-6 text-blue-400" />
            <span className="text-xl font-bold">DigiKshetra </span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="#features"
              className="text-sm font-medium hover:text-primary"
            >
              Features
            </Link>
            <Link
              to="#how-it-works"
              className="text-sm font-medium hover:text-primary"
            >
              How It Works
            </Link>
            <Link
              to="#technology"
              className="text-sm font-medium hover:text-primary"
            >
              Technology
            </Link>
            <Link
              to="#contact"
              className="text-sm font-medium hover:text-primary"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button
                variant="outline"
                size="sm"
                className="text-blue-400 border-blue-400"
              >
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm">Register</Button>
            </Link>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20  md:py-28 bg-gradient-to-b from-gray-800 to-gray-900">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Secure Land Records with{" "}
                <span className="text-blue-400">Blockchain & AI</span>
              </h1>
              <p className="text-lg text-gray-400 max-w-[600px]">
                A revolutionary system that digitizes and secures land records
                using blockchain technology and artificial intelligence to
                prevent disputes and ensure transparent property ownership.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="gap-2 bg-blue-500 hover:bg-blue-600"
                >
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-blue-400 text-blue-400"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="flex-1 relative">
              <img
                src="https://plus.unsplash.com/premium_photo-1681487746049-c39357159f69?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Digital Land Records System"
                className="rounded-lg shadow-2xl border-gray-700 border h-[400px] w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center border border-blue-400 p-4 rounded-lg">
                <div className="text-4xl font-bold text-blue-400 mb-2">5M+</div>
                <div className="text-gray-400">Land Records Digitized</div>
              </div>
              <div className="flex flex-col items-center text-center border border-blue-400 p-4 rounded-lg">
                <div className="text-4xl font-bold text-blue-400 mb-2">
                  99.9%
                </div>
                <div className="text-gray-400">Data Accuracy</div>
              </div>
              <div className="flex flex-col items-center text-center border border-blue-400 p-4 rounded-lg">
                <div className="text-4xl font-bold text-blue-400 mb-2">80%</div>
                <div className="text-gray-400">Dispute Reduction</div>
              </div>
              <div className="flex flex-col items-center text-center border border-blue-400 p-4 rounded-lg">
                <div className="text-4xl font-bold text-blue-400 mb-2">50+</div>
                <div className="text-gray-400">Government Partnerships</div>
              </div>
            </div>
          </div>
        </section>
        {/* Features Section */}
        <section
          id="features"
          className="py-20 bg-muted bg-gradient-to-b from-gray-800 to-gray-900"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Key Features
              </h2>
              <p className="text-muted-foreground max-w-[700px] mx-auto">
                Our platform combines cutting-edge technology with user-friendly
                interfaces to revolutionize land record management.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-background p-6 rounded-lg shadow-md border">
                <Shield className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Tamper-Proof Records</h3>
                <p className="text-muted-foreground">
                  Blockchain technology ensures all records are immutable and
                  secure from unauthorized changes.
                </p>
              </div>

              <div className="bg-background p-6 rounded-lg shadow-md border">
                <FileCheck className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">
                  Automated Verification
                </h3>
                <p className="text-muted-foreground">
                  AI-powered verification processes authenticate documents and
                  detect inconsistencies automatically.
                </p>
              </div>

              <div className="bg-background p-6 rounded-lg shadow-md border">
                <Map className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">
                  Geospatial Integration
                </h3>
                <p className="text-muted-foreground">
                  Seamless integration with mapping systems for accurate
                  property boundary identification.
                </p>
              </div>

              <div className="bg-background p-6 rounded-lg shadow-md border">
                <Brain className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Smart Contracts</h3>
                <p className="text-muted-foreground">
                  Automated execution of property transfers and agreements
                  through blockchain smart contracts.
                </p>
              </div>

              <div className="bg-background p-6 rounded-lg shadow-md border">
                <BarChart3 className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Analytics Dashboard</h3>
                <p className="text-muted-foreground">
                  Comprehensive data visualization and insights for better
                  decision-making.
                </p>
              </div>

              <div className="bg-background p-6 rounded-lg shadow-md border">
                <Users className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">
                  Multi-Authority Access
                </h3>
                <p className="text-muted-foreground">
                  Role-based access control for different government agencies
                  and stakeholders.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-400">
                How It Works
              </h2>
              <p className="text-gray-400 max-w-[700px] mx-auto">
                A simple and transparent process that ensures data integrity
                throughout the land record management lifecycle.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center border border-blue-400 p-4 rounded-lg">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-blue-400">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-blue-400">
                  Data Collection
                </h3>
                <p className="text-gray-400">
                  Legacy records are digitized and new transactions are entered
                  through secure portals.
                </p>
              </div>

              <div className="flex flex-col items-center text-center border border-blue-400 p-4 rounded-lg">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-blue-400">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-blue-400">
                  Verification & Processing
                </h3>
                <p className="text-gray-400">
                  AI algorithms cross-validate information and blockchain
                  technology creates an immutable record.
                </p>
              </div>

              <div className="flex flex-col items-center text-center border border-blue-400 p-4 rounded-lg">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-blue-400">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-blue-400">
                  Secure Access
                </h3>
                <p className="text-gray-400">
                  Authorized stakeholders can access and verify records through
                  our secure platform.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section
          id="technology"
          className="py-20 bg-muted bg-gradient-to-b from-gray-800 to-gray-900"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Technology
              </h2>
              <p className="text-muted-foreground max-w-[700px] mx-auto">
                Built on a foundation of cutting-edge technologies to ensure
                security, scalability, and ease of use.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4 border-2 pl-8 p-4 border-gray-700">
                <h3 className="text-2xl font-bold">Blockchain Technology</h3>
                <p className="text-muted-foreground">
                  Our platform uses a permissioned blockchain network to create
                  an immutable ledger of all land transactions and ownership
                  changes. This ensures that records cannot be tampered with and
                  provides a complete audit trail of all changes.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Immutable record-keeping</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Distributed consensus mechanism</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Smart contract automation</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4 border-2 pl-8 p-4 border-gray-700">
                <h3 className="text-2xl font-bold">Artificial Intelligence</h3>
                <p className="text-muted-foreground">
                  Advanced AI models power our verification systems, enabling
                  automatic document processing, anomaly detection, and
                  predictive analytics to identify potential issues before they
                  become disputes.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Automated document verification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Anomaly detection algorithms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Predictive dispute resolution</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-400">
              Ready to Transform Land Record Management?
            </h2>
            <p className="text-lg text-gray-400 max-w-[700px] mx-auto mb-8">
              Join government agencies and property professionals already
              benefiting from our secure, transparent platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="gap-2 bg-blue-500 hover:bg-blue-600 text-white border border-blue-500"
              >
                Request a Demo <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-blue-400 text-blue-400"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="py-20 bg-background bg-gradient-to-b from-gray-800 to-gray-900"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Get in Touch
              </h2>
              <p className="text-muted-foreground max-w-[700px] mx-auto">
                Have questions or ready to get started? Our team is here to help
                you implement a secure land record system.
              </p>
            </div>

            <div className="max-w-[600px] mx-auto">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <input
                      id="name"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Your email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="organization" className="text-sm font-medium">
                    Organization
                  </label>
                  <input
                    id="organization"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Your organization"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Your message"
                  />
                </div>

                <Button className="w-full">Submit</Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 bg-muted bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Database className="h-5 w-5 text-primary" />
            <span className="font-bold">DigiKshetra Records</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DigiKshetra Records. All rights
            reserved.
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link
              to="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Privacy Policy
            </Link>
            <Link
              to="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
