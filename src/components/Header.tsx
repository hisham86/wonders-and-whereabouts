
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header 
      className="relative py-8 px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-gray-800 overflow-hidden"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-2">
          <motion.span
            className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            Interactive Visualization
          </motion.span>

          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Wonders of the World & Their Antipodes
          </motion.h1>

          <motion.p 
            className="text-muted-foreground max-w-2xl text-balance"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Explore the Seven Wonders of the Ancient World and the New Seven Wonders, 
            along with their antipodal points — the exact opposite locations on Earth.
          </motion.p>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
