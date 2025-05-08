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
  const ChevronLeft = getIcon('ChevronLeft');
  const ChevronRight = getIcon('ChevronRight');
  const Zap = getIcon('Zap');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
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

  // Animation variants for the sidebar
  const desktopSidebarVariants = {
    open: {
      width: "18rem",
      transition: { 
        type: 'tween',
        duration: 0.25,
        ease: 'easeOut'
      }
    },
    closed: {
      width: 0,
      transition: {
        type: 'tween',
        duration: 0.25,
        ease: 'easeIn'
      }
    }
  };
  
  const mobileSidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: 'tween',
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    closed: {
      x: '-100%',
      transition: {
        type: 'tween',
        duration: 0.3,
        ease: 'easeIn' 
      }
    }
  };

  return (
    <>
      {/* Mobile toggle button - visible only on mobile */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-3 rounded-full bg-white dark:bg-surface-800 shadow-card hover:shadow-lg transition-all duration-300"
          aria-label="Toggle menu"
        >
          {isOpen ? 
            <X className="w-5 h-5 text-primary dark:text-primary-light" /> : 
            <Menu className="w-5 h-5 text-primary dark:text-primary-light" />
          }
        </button>
      )}

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm transition-all duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={isMobile ? "closed" : "closed"}
            animate="open"
            exit="closed"
            variants={isMobile ? mobileSidebarVariants : desktopSidebarVariants}
            className={`fixed top-0 left-0 h-full bg-white dark:bg-surface-800 shadow-lg 
                      ${isMobile ? 'z-50 w-72' : 'z-30'} overflow-hidden`}
          >
            <div className="flex flex-col h-full">
              {/* Logo/App Name */}
              <div className="flex items-center justify-between px-6 py-6 border-b border-surface-200 dark:border-surface-700">
                <div className="flex items-center">
                  <Zap className="w-6 h-6 text-primary dark:text-primary-light mr-2" />
                  <h1 className="text-xl font-bold text-primary dark:text-primary-light">PulseConnect</h1>
                </div>
                {!isMobile && (
                  <button 
                    onClick={toggleSidebar}
                    className="p-1.5 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors duration-200"
                  >
                    <ChevronLeft className="w-5 h-5 text-surface-600 dark:text-surface-400" />
                  </button>
                )}
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto py-6 px-4">
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                            isActive
                            ? 'bg-primary bg-opacity-10 dark:bg-opacity-20 text-primary dark:text-primary-light font-medium shadow-sm'
                            : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 hover:shadow-sm'
                          }`
                        }
                        onClick={isMobile ? toggleSidebar : undefined}
                      >
                        <item.icon className={`w-5 h-5 mr-3 ${
                          location.pathname === item.path 
                            ? 'text-primary dark:text-primary-light' 
                            : 'text-surface-600 dark:text-surface-400'
                        }`} />
                        <span>{item.name}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* User Profile or Additional Info */}
              <div className="p-5 border-t border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-surface-500 dark:text-surface-400">Version 0.1.0</div>
                  <div className="text-xs px-2 py-1 bg-primary bg-opacity-10 dark:bg-opacity-20 text-primary dark:text-primary-light rounded-md">Beta</div>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
      
      {/* Desktop toggle button - visible when sidebar is closed on desktop */}
      {!isMobile && !isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-30 p-3 rounded-full bg-white dark:bg-surface-800 shadow-card hover:shadow-lg transition-all duration-300"
          aria-label="Open sidebar"
        >
          <ChevronRight className="w-5 h-5 text-primary dark:text-primary-light" />
        </button>
      )}
    </>
  );
};

export default Sidebar;