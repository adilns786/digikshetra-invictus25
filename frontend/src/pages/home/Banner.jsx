import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button"; // Importing button from shadcn/ui
import { ArrowRight } from "lucide-react";
import video from "../../assets/Untitled video - Made with Clipchamp.mp4";

function Banner() {
  return (
    <div className="relative h-[90vh] w-full overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        style={{ opacity: 0.75 }}
      >
        <source src={video} type="video/mp4" />
      </video>

      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Animated Content */}
      <AnimatePresence>
        <motion.div
          className="absolute inset-0 flex flex-col justify-center items-center text-center px-6"
          initial={{ opacity: 0, y: -40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.9 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
            Secure Land Records with <br />
            <span className="text-blue-400">Blockchain & AI</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-[600px] mt-4">
            Digitizing and securing land records using blockchain and AI
            to prevent disputes and ensure transparent property ownership.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-blue-400 text-blue-400 hover:bg-blue-500 hover:text-white"
            >
              Learn More
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Banner;
