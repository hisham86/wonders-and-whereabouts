
import { useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import WorldMap from "@/components/WorldMap";
import Footer from "@/components/Footer";
import { AnimatePresence } from "framer-motion";

const Index = () => {
  // Add framer-motion library
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/framer-motion@10.12.4/dist/framer-motion.js";
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex-1 flex flex-col"
        >
          <Header />
          
          <main className="flex-1 flex flex-col">
            <div className="flex-1 relative h-[calc(100vh-200px)] min-h-[500px]">
              <WorldMap />
            </div>
          </main>
          
          <Footer />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Index;
