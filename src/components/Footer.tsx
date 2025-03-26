
import { motion } from "framer-motion";
import { Twitter, Github, Linkedin, Coffee } from "lucide-react";

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
        <div className="mt-4 sm:mt-0 flex flex-col items-center sm:items-end">
          <div className="text-xs text-gray-500 mb-2">
            Built by Hisham using <a href="https://twitter.com/lovable_dev" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Lovable</a>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="https://twitter.com/hisham" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-400 transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={16} />
            </a>
            <a 
              href="https://github.com/hisham" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a 
              href="https://linkedin.com/in/hisham" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-600 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a 
              href="https://buymeacoffee.com/HishamCato" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-amber-500 transition-colors"
              aria-label="Buy Me a Coffee"
            >
              <Coffee size={16} />
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
