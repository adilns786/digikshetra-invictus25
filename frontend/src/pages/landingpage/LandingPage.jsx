import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import GamifiedNavbar from "./Navbar";

const LandingPage = () => {
  return (
    
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-800 text-white flex flex-col items-center">
      {/* Header Section */}
      

      {/* Hero Section */}
      <section className="text-center mt-16">
        <motion.h1 className="text-5xl font-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          Welcome to Digikshetra
        </motion.h1>
        <p className="text-lg mt-4 max-w-2xl mx-auto">
          The next-generation blockchain & AI-powered land record management system ensuring transparency and security.
        </p>
        <Button className="mt-6 px-6 py-3 text-lg">Get Started</Button>
      </section>

      {/* Features Section */}
      <section id="features" className="mt-20 w-3/4">
        <h2 className="text-3xl font-semibold text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <Card className="bg-white text-black shadow-lg hover:scale-105 transition-transform">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold">Blockchain Security</h3>
              <p className="mt-2">Tamper-proof record-keeping with blockchain integration.</p>
            </CardContent>
          </Card>
          <Card className="bg-white text-black shadow-lg hover:scale-105 transition-transform">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold">AI Fraud Detection</h3>
              <p className="mt-2">Smart analytics to detect fraudulent activities in land transactions.</p>
            </CardContent>
          </Card>
          <Card className="bg-white text-black shadow-lg hover:scale-105 transition-transform">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold">GIS Mapping</h3>
              <p className="mt-2">Visual boundary detection for better land management.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="mt-20 w-3/4 text-center">
        <h2 className="text-3xl font-semibold">About Digikshetra</h2>
        <p className="mt-4 text-lg max-w-3xl mx-auto">
          Digikshetra is an innovative platform designed to modernize land records through blockchain and AI. Our goal is to reduce disputes and enhance property ownership transparency.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="mt-20 w-3/4 text-center">
        <h2 className="text-3xl font-semibold">Get in Touch</h2>
        <p className="mt-4 text-lg">Have questions? Reach out to us at <a href="mailto:support@digikshetra.com" className="underline">support@digikshetra.com</a></p>
      </section>

      {/* Footer */}
      <footer className="mt-20 p-6 w-full text-center border-t border-white/20">
        <p>&copy; {new Date().getFullYear()} Digikshetra. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
