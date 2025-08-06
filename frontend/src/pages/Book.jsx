import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getBook, getSimilar } from '../api/api';
import BookGrid from '../components/BookGrid';
import { FaArrowLeft, FaStar, FaUsers, FaCalendar, FaBuilding } from 'react-icons/fa';

const Book = () => {
  const { isbn } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [similarBooks, setSimilarBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [similarLoading, setSimilarLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isbn) {
      loadBookDetails();
      loadSimilarBooks();
    }
  }, [isbn]);

  const loadBookDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getBook(isbn);
      setBook(response.data);
    } catch (err) {
      setError('Failed to load book details.');
      console.error('Error loading book:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadSimilarBooks = async () => {
    try {
      setSimilarLoading(true);
      const response = await getSimilar(isbn, 12);
      setSimilarBooks(response.data.recommendations || []);
    } catch (err) {
      console.error('Error loading similar books:', err);
    } finally {
      setSimilarLoading(false);
    }
  };

  const handleBookSelect = (selectedBook) => {
    navigate(`/book/${selectedBook.isbn}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-blue-900 
                      flex items-center justify-center">
        <div className="text-center">
          <div className="loading-dots mb-4">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p className="text-white text-xl">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-pink-900 to-purple-900 
                      flex items-center justify-center">
        <motion.div 
          className="text-center glass-card p-12 rounded-3xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="text-6xl mb-6">📚❌</div>
          <h2 className="text-3xl font-bold text-white mb-4">Book Not Found</h2>
          <p className="text-red-200 mb-8">{error || 'The requested book could not be found.'}</p>
          <button 
            onClick={() => navigate('/')} 
            className="btn-primary"
          >
            <FaArrowLeft className="mr-2" />
            Go Back Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-blue-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.button 
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center space-x-2 text-white/80 hover:text-white 
                     bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-200"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft />
          <span>Back</span>
        </motion.button>

        {/* Book Details Card */}
        <motion.div 
          className="glass-card p-8 rounded-3xl mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Book Cover */}
            <motion.div 
              className="lg:col-span-1"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-center">
                <img
                  src={book.image_url_large || book.image_url_medium || book.image_url_small || 
                       'https://via.placeholder.com/400x600/6366f1/ffffff?text=No+Image'}
                  alt={book.title}
                  className="w-full max-w-sm mx-auto rounded-2xl shadow-2xl"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x600/6366f1/ffffff?text=No+Image';
                  }}
                />
              </div>
            </motion.div>

            {/* Book Information */}
            <motion.div 
              className="lg:col-span-2 space-y-6"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                  {book.title}
                </h1>
                <h2 className="text-2xl text-emerald-200 mb-6 font-light">
                  by {book.author}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-white/90">
                    <FaCalendar className="text-emerald-400" />
                    <span><strong>Year:</strong> {book.year}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/90">
                    <FaBuilding className="text-emerald-400" />
                    <span><strong>Publisher:</strong> {book.publisher}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-white/90">
                    <span className="text-emerald-400">📖</span>
                    <span><strong>ISBN:</strong> {book.isbn}</span>
                  </div>
                </div>

                {book.rating_count > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <FaStar className="text-yellow-400 text-xl" />
                      <div>
                        <div className="text-2xl font-bold text-white">
                          {book.average_rating?.toFixed(1)}/10
                        </div>
                        <div className="text-white/70 text-sm">Average Rating</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaUsers className="text-blue-400 text-xl" />
                      <div>
                        <div className="text-2xl font-bold text-white">
                          {book.rating_count?.toLocaleString()}
                        </div>
                        <div className="text-white/70 text-sm">Total Ratings</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Rating Distribution */}
              {book.rating_distribution && Object.keys(book.rating_distribution).length > 0 && (
                <motion.div 
                  className="mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <h3 className="text-xl font-bold text-white mb-4">Rating Distribution</h3>
                  <div className="space-y-2">
                    {Object.entries(book.rating_distribution)
                      .sort(([a], [b]) => parseInt(b) - parseInt(a))
                      .map(([rating, count]) => {
                        const maxCount = Math.max(...Object.values(book.rating_distribution));
                        const percentage = (count / maxCount) * 100;
                        
                        return (
                          <div key={rating} className="flex items-center space-x-4">
                            <div className="text-white w-8 text-right">{rating}⭐</div>
                            <div className="flex-1 bg-white/10 rounded-full h-3 overflow-hidden">
                              <motion.div 
                                className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ delay: 0.8 + parseInt(rating) * 0.1, duration: 0.6 }}
                              />
                            </div>
                            <div className="text-white/70 w-12 text-right text-sm">{count}</div>
                          </div>
                        );
                      })}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Similar Books Section */}
        <AnimatePresence>
          {similarBooks.length > 0 && (
            <motion.div 
              className="glass-card p-8 rounded-3xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">
                  📚 Readers Also Enjoyed
                </h2>
                <p className="text-white/80">
                  Discover books similar to "{book.title}" based on reader preferences
                </p>
              </div>
              
              <BookGrid
                books={similarBooks}
                onBookSelect={handleBookSelect}
                loading={similarLoading}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Book;
