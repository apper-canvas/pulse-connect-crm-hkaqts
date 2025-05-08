import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Icons
  const Home = getIcon('Home');
  const Users = getIcon('Users');
  const DollarSign = getIcon('DollarSign');
  const Calendar = getIcon('Calendar');
  const BarChart = getIcon('BarChart');
  const Settings = getIcon('Settings');
  const Menu = getIcon('Menu');
  const X = getIcon('X');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        // Ensure sidebar is open on desktop
        if (!isOpen) toggleSidebar();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, toggleSidebar]);

  const navItems = [
    { path: '/', name: 'Dashboard', icon: Home },
    { path: '/contacts', name: 'Contacts', icon: Users },
    { path: '/deals', name: 'Deals', icon: DollarSign },
    { path: '/tasks', name: 'Tasks', icon: Calendar },
    { path: '/reports', name: 'Reports', icon: BarChart },
    { path: '/settings', name: 'Settings', icon: Settings },
  ];

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: '-100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <>
      {/* Mobile menu toggle button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-surface-200 dark:bg-surface-800 shadow-soft hover:shadow-card transition-all duration-300"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      )}

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {(isOpen || !isMobile) && (
          <motion.aside
            initial={isMobile ? "closed" : "open"}
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className={`fixed top-0 left-0 h-full z-40 bg-white dark:bg-surface-800 shadow-card transition-all duration-300 w-64 ${isMobile ? 'z-50' : ''}`}
          >
            <div className="flex flex-col h-full">
              {/* Logo/App Name */}
              <div className="flex items-center justify-center py-6 border-b border-surface-200 dark:border-surface-700">
                <h1 className="text-xl font-bold text-primary dark:text-primary-light">PulseConnect</h1>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto py-4 px-3">
                <ul className="space-y-1">
                  {navItems.map((item) => (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                            isActive
                            ? 'bg-primary bg-opacity-10 dark:bg-opacity-20 text-primary dark:text-primary-light font-medium'
                            : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                          }`
                        }
                        onClick={isMobile ? toggleSidebar : undefined}
                      >
                        <item.icon className="w-5 h-5 mr-3" />
                        <span>{item.name}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* User Profile or Additional Info */}
              <div className="p-4 border-t border-surface-200 dark:border-surface-700">
                <div className="text-sm text-surface-500 dark:text-surface-400">Version 0.1.0</div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;