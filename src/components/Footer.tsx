
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer 
      className="py-6 px-4 border-t border-gray-200 dark:border-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          An interactive visualization of the wonders of the world and their antipodes.
        </p>
        <div className="mt-4 sm:mt-0 flex items-center space-x-4">
          <span className="text-xs text-gray-400">Interactive World Map</span>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
