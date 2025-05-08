import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Get saved state outside useEffect to make it accessible throughout the component
  const savedState = localStorage.getItem('sidebarOpen');
  
  useEffect(() => {
    // Initialize sidebar state based on device and saved preference
    const initialState = isMobile ? false : (savedState !== null ? JSON.parse(savedState) : true);
    setSidebarOpen(initialState);
    
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile, savedState]);
  
  // We don't need the second useEffect since we're handling the 
  // saving in toggleSidebar and initialization in first useEffect

  const toggleSidebar = () => {
    const newState = !sidebarOpen;
    setSidebarOpen(newState);
    localStorage.setItem('sidebarOpen', JSON.stringify(newState));
  };

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 transition-colors duration-200">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <motion.main 
        className={`transition-all duration-300 ${!isMobile && sidebarOpen ? 'md:ml-72' : 'ml-0'} pt-16 md:pt-6 px-4 md:px-6 pb-6`}
        animate={{
          marginLeft: !isMobile && sidebarOpen ? '18rem' : '0'
        }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.main>
    </div>
  );
};

export default MainLayout;