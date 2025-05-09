import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';
import getIcon from './utils/iconUtils';
import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';
import Contacts from './pages/Contacts';
import Tasks from './pages/Tasks';
import Deals from './pages/Deals';
import Reports from './pages/Reports';
import NotFound from './pages/NotFound';

function App() {
  const [darkMode, setDarkMode] = useState(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    toast.info(`${!darkMode ? 'Dark' : 'Light'} mode activated`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: !darkMode ? "dark" : "light",
    });
  };

  const Sun = getIcon('Sun');
  const Moon = getIcon('Moon');

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 transition-colors duration-200">
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="fixed z-50 bottom-6 right-6 p-3 rounded-full bg-surface-200 dark:bg-surface-800 shadow-soft hover:shadow-card transition-all duration-300"
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-primary-dark" />}
      </button>

      <AnimatePresence mode="wait">
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home toggleDarkMode={toggleDarkMode} />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/reports" element={<Reports />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
        className="text-sm md:text-base"
        toastClassName="bg-surface-50 dark:bg-surface-800 shadow-card"
        bodyClassName="text-surface-800 dark:text-surface-100"
      />
    </div>
  );
}

export default App;