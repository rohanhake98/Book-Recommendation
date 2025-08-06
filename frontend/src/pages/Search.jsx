import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { searchBooks } from '../api/api';
import BookGrid from '../components/BookGrid';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaMagic, FaFilter } from 'react-icons/fa';

const Search = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const popularSearches = [
    'Harry Potter', 'Stephen King', 'Romance', 'Mystery', 
    'Science Fiction', 'Fantasy', 'Biography', 'Thriller'
  ];

  const handleSearch = async (e, searchQuery = null) => {
    if (e) e.preventDefault();
    const searchTerm = searchQuery || query;
    if (!searchTerm.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const response = await searchBooks(searchTerm.trim());
      setBooks(response.data.results || []);
      setSearched(true);
      if (searchQuery) setQuery(searchQuery);
    } catch (err) {
      setError('Failed to search books. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookSelect = (book) => {
    navigate(`/book/${book.isbn}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-800">
      {/* Hero Section */}
      <motion.div 
        className="relative py-20 px-4 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            🔍 Find Your Next
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Great Read
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-blue-100 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Search through thousands of books by title, author, or genre
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        {/* Search Card */}
        <motion.div 
          className="glass-card p-8 rounded-3xl mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for books, authors, genres, or ISBN..."
                className="w-full px-6 py-6 bg-white/10 backdrop-blur border-2 border-white/20 
                         rounded-2xl text-white text-lg placeholder-white/60 focus:outline-none 
                         focus:ring-2 focus:ring-cyan-400 focus:border-transparent 
                         transition-all duration-300"
              />
              <motion.button
                type="submit"
                disabled={loading || !query.trim()}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 
                         bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600
                         disabled:from-gray-500 disabled:to-gray-600
                         text-white p-3 rounded-xl shadow-lg transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <FaMagic className="text-xl" />
                  </motion.div>
                ) : (
                  <FaSearch className="text-xl" />
                )}
              </motion.button>
            </div>
          </form>

          {/* Popular Searches */}
          <div className="mt-8 text-center">
            <p className="text-white/80 mb-4 text-sm">Popular searches:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {popularSearches.map((term, index) => (
                <motion.button
                  key={term}
                  onClick={() => handleSearch(null, term)}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full 
                           text-sm border border-white/20 transition-all duration-200"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {term}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="bg-red-500/90 backdrop-blur text-white p-6 rounded-2xl text-center mb-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Results */}
        <AnimatePresence>
          {searched && (
            <motion.div 
              className="glass-card p-8 rounded-3xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              {!loading && (
                <motion.div 
                  className="text-center mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <FaFilter className="text-white/60" />
                    <h3 className="text-2xl font-bold text-white">
                      {books.length > 0 
                        ? `Found ${books.length} books for "${query}"` 
                        : `No books found for "${query}"`
                      }
                    </h3>
                  </div>
                  {books.length > 0 && (
                    <p className="text-white/80">
                      Click on any book to see more details and similar recommendations
                    </p>
                  )}
                </motion.div>
              )}

              <BookGrid
                books={books}
                onBookSelect={handleBookSelect}
                loading={loading}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Search;
