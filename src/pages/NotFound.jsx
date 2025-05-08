import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const NotFound = () => {
  // Icons
  const AlertCircle = getIcon('AlertCircle');
  const ArrowLeft = getIcon('ArrowLeft');

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-md w-full mx-auto text-center">
        <div className="mb-6 inline-block p-4 bg-surface-100 dark:bg-surface-800 rounded-full">
          <AlertCircle className="w-12 h-12 text-accent" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-surface-900 dark:text-surface-100">404</h1>
        
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-surface-800 dark:text-surface-200">
          Page Not Found
        </h2>
        
        <p className="text-surface-600 dark:text-surface-400 mb-8 text-lg">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          to="/"
          className="inline-flex items-center gap-2 btn-primary text-base md:text-lg px-6 py-3"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    </motion.div>
  );
};

export default NotFound;