import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import getIcon from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

const Home = () => {
      animate={{ opacity: 1, transition: { delay: 0.1 } }}
  const [stats, setStats] = useState({
    contacts: 0,
    deals: 0,
    activities: 0,
    conversion: 0
  });

  // Icons
  const Users = getIcon('Users');
  const DollarSign = getIcon('DollarSign');
  const Calendar = getIcon('Calendar');
  const TrendingUp = getIcon('TrendingUp');

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        contacts: 127,
        deals: 24,
        activities: 43,
        conversion: 68
      });
      setIsLoading(false);
      toast.success("Dashboard data loaded successfully!", {
        position: "bottom-right",
        autoClose: 3000
      });
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <header className="mb-8 md:mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-surface-900 dark:text-surface-100 mb-2">
              PulseConnect <span className="text-primary">CRM</span>
            </h1>
            <p className="text-surface-600 dark:text-surface-400 max-w-2xl">
              Streamline your customer relationships and boost sales efficiency.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Link 
              to="/contacts"
              className="btn-primary flex items-center gap-2 group"
            >
              <span className="inline-block group-hover:scale-110 transition-transform">+</span>
              <span>New Contact</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-8 md:mb-12"
      >
        <h2 className="text-xl md:text-2xl font-semibold text-surface-800 dark:text-surface-200 mb-4">
          Dashboard Overview
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Contacts Stats */}
          <motion.div variants={itemVariants} className="card neu-light dark:neu-dark border-l-4 border-primary overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-surface-500 dark:text-surface-400 text-sm md:text-base">Total Contacts</p>
                <h3 className="text-2xl md:text-3xl font-bold mt-1">
                  {isLoading ? (
                    <div className="h-8 w-20 bg-surface-200 dark:bg-surface-700 animate-pulse rounded"></div>
                  ) : stats.contacts}
                </h3>
              </div>
              <div className="bg-primary-light dark:bg-primary-dark bg-opacity-20 dark:bg-opacity-30 p-2 rounded-lg">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
          </motion.div>

          {/* Deals Stats */}
          <motion.div variants={itemVariants} className="card neu-light dark:neu-dark border-l-4 border-secondary overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-surface-500 dark:text-surface-400 text-sm md:text-base">Active Deals</p>
                <h3 className="text-2xl md:text-3xl font-bold mt-1">
                  {isLoading ? (
                    <div className="h-8 w-16 bg-surface-200 dark:bg-surface-700 animate-pulse rounded"></div>
                  ) : stats.deals}
                </h3>
              </div>
              <div className="bg-secondary-light dark:bg-secondary-dark bg-opacity-20 dark:bg-opacity-30 p-2 rounded-lg">
                <DollarSign className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </motion.div>

          {/* Activities Stats */}
          <motion.div variants={itemVariants} className="card neu-light dark:neu-dark border-l-4 border-accent overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-surface-500 dark:text-surface-400 text-sm md:text-base">Pending Activities</p>
                <h3 className="text-2xl md:text-3xl font-bold mt-1">
                  {isLoading ? (
                    <div className="h-8 w-16 bg-surface-200 dark:bg-surface-700 animate-pulse rounded"></div>
                  ) : stats.activities}
                </h3>
              </div>
              <div className="bg-accent bg-opacity-20 dark:bg-opacity-30 p-2 rounded-lg">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
            </div>
          </motion.div>

          {/* Conversion Stats */}
          <motion.div variants={itemVariants} className="card neu-light dark:neu-dark border-l-4 border-green-500 overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-surface-500 dark:text-surface-400 text-sm md:text-base">Conversion Rate</p>
                <h3 className="text-2xl md:text-3xl font-bold mt-1">
                  {isLoading ? (
                    <div className="h-8 w-24 bg-surface-200 dark:bg-surface-700 animate-pulse rounded"></div>
                  ) : `${stats.conversion}%`}
                </h3>
              </div>
              <div className="bg-green-500 bg-opacity-20 dark:bg-opacity-30 p-2 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Sales Pipeline Feature */}
      <MainFeature />
    </div>
  );
};

export default Home;