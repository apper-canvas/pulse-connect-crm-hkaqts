import { motion } from 'framer-motion';
import MainFeature from '../components/MainFeature';

const Deals = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-surface-800 dark:text-surface-100 mb-2">
          Deals Management
        </h1>
        <p className="text-surface-600 dark:text-surface-400">
          Track and manage your sales pipeline, move deals through stages, and close more sales.
        </p>
      </div>
      
      <MainFeature />
    </motion.div>
  );
};

export default Deals;