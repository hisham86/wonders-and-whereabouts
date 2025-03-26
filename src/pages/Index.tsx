
import { useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import WorldMap from "@/components/WorldMap";
import Footer from "@/components/Footer";
import { AnimatePresence } from "framer-motion";

const Index = () => {
  // This script import is not needed since framer-motion is already imported
  // and included in the project dependencies
  
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
            <div className="flex-1 relative h-[700px] md:h-[800px]">
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
