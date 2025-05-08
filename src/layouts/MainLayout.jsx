import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    // Initialize sidebar state based on device and saved preference
    const savedState = localStorage.getItem('sidebarOpen');
    const initialState = isMobile ? false : (savedState !== null ? JSON.parse(savedState) : true);
    setSidebarOpen(initialState);
    
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    // Save sidebar state to localStorage when it changes
    if (savedState !== null) {
      setSidebarOpen(JSON.parse(savedState));
    }
  }, [sidebarOpen]);

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