import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaSearch, FaStar, FaGithub } from 'react-icons/fa';
import Home from './pages/Home';
import Search from './pages/Search';
import Book from './pages/Book';
import Recommend from './pages/Recommend';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: FaHome, label: 'Home' },
    { path: '/search', icon: FaSearch, label: 'Search' },
    { path: '/recommend', icon: FaStar, label: 'Recommendations' },
  ];

  return (
    <motion.nav 
      className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-3xl">📚</div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              BookRecs
            </span>
          </motion.div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link key={path} to={path}>
                <motion.div
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    location.pathname === path
                      ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                      : 'text-gray-600 hover:text-primary hover:bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="text-lg" />
                  <span className="font-medium hidden sm:block">{label}</span>
                </motion.div>
              </Link>
            ))}
            
            {/* GitHub Link */}
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGithub className="text-xl" />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

// Page transition variants
const pageVariants = {
  initial: { opacity: 0, x: 200 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -200 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Home />
            </motion.div>
          } />
          <Route path="/search" element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Search />
            </motion.div>
          } />
          <Route path="/book/:isbn" element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Book />
            </motion.div>
          } />
          <Route path="/recommend" element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Recommend />
            </motion.div>
          } />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
