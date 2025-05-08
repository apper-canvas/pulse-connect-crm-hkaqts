import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  
  useEffect(() => {
    // Load sidebar state from localStorage if available
    const savedState = localStorage.getItem('sidebarOpen');
    if (savedState !== null) {
      setSidebarOpen(JSON.parse(savedState));
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !sidebarOpen;
    setSidebarOpen(newState);
    localStorage.setItem('sidebarOpen', JSON.stringify(newState));
  };

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 transition-colors duration-200">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <main className={`transition-all duration-300 ${sidebarOpen ? 'md:ml-72' : 'ml-0'} pt-16 md:pt-6 px-4 md:px-6 pb-6`}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;