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
import Banner from "./Banner";

const LandingPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-900 text-white">
    
<Banner/>

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
