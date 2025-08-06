import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  getUserRecs, 
  getRandomUser, 
  getSVDRecs, 
  getUserRatings,
  getGenreRecommendations,
  getPopularGenres 
} from '../api/api';
import BookGrid from '../components/BookGrid';
import { useNavigate } from 'react-router-dom';
import { 
  FaUser, 
  FaRobot, 
  FaStar, 
  FaDice, 
  FaBookmark, 
  FaSearch,
  FaSpinner,
  FaHeart
} from 'react-icons/fa';

const Recommend = () => {
  const [activeSection, setActiveSection] = useState('user'); // 'user' or 'genre'
  const [userId, setUserId] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const [userRecommendations, setUserRecommendations] = useState([]);
  const [svdRecommendations, setSvdRecommendations] = useState([]);
  const [userRatings, setUserRatings] = useState([]);
  const [genreRecommendations, setGenreRecommendations] = useState([]);

  const [loading, setLoading] = useState({
    user: false,
    svd: false,
    ratings: false,
    randomUser: false,
    genre: false,
    genres: false
  });

  const [activeTab, setActiveTab] = useState('user');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    handleRandomUser();
    loadGenres();
  }, []);

  const loadGenres = async () => {
    try {
      setLoading(prev => ({ ...prev, genres: true }));
      const response = await getPopularGenres();
      setGenres(response.data.genres || []);
    } catch (err) {
      console.error('Error loading genres:', err);
    } finally {
      setLoading(prev => ({ ...prev, genres: false }));
    }
  };

  const handleRandomUser = async () => {
    try {
      setLoading(prev => ({ ...prev, randomUser: true }));
      setError(null);

      const response = await getRandomUser();
      const randomUserId = response.data.user_id.toString();
      setUserId(randomUserId);

      await Promise.all([
        fetchUserRecs(randomUserId),
        fetchUserRatings(randomUserId)
      ]);
      
    } catch (err) {
      console.error('Random user error:', err);
      setError('Failed to fetch a random user');
    } finally {
      setLoading(prev => ({ ...prev, randomUser: false }));
    }
  };

  const fetchUserRecs = async (targetUserId = userId) => {
    if (!targetUserId) return;
    
    try {
      setLoading(prev => ({ ...prev, user: true }));
      setError(null);
      const response = await getUserRecs(parseInt(targetUserId), 12);
      setUserRecommendations(response.data.recommendations || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load user recommendations');
    } finally {
      setLoading(prev => ({ ...prev, user: false }));
    }
  };

  const fetchSVDRecs = async (targetUserId = userId) => {
    if (!targetUserId) return;
    
    try {
      setLoading(prev => ({ ...prev, svd: true }));
      const response = await getSVDRecs(parseInt(targetUserId), 12);
      setSvdRecommendations(response.data.recommendations || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load SVD recommendations');
    } finally {
      setLoading(prev => ({ ...prev, svd: false }));
    }
  };

  const fetchUserRatings = async (targetUserId = userId) => {
    if (!targetUserId) return;
    
    try {
      setLoading(prev => ({ ...prev, ratings: true }));
      const response = await getUserRatings(parseInt(targetUserId));
      setUserRatings(response.data.ratings || []);
    } catch (err) {
      console.error('User ratings error:', err);
    } finally {
      setLoading(prev => ({ ...prev, ratings: false }));
    }
  };

  const fetchGenreRecs = async (genre = selectedGenre) => {
    if (!genre) return;
    
    try {
      setLoading(prev => ({ ...prev, genre: true }));
      setError(null);
      const response = await getGenreRecommendations(genre);
      setGenreRecommendations(response.data.recommendations || []);
    } catch (err) {
      setError('Failed to load genre recommendations');
    } finally {
      setLoading(prev => ({ ...prev, genre: false }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeSection === 'user' && userId.trim()) {
      fetchUserRecs();
      fetchUserRatings();
    } else if (activeSection === 'genre' && selectedGenre) {
      fetchGenreRecs();
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'svd' && svdRecommendations.length === 0 && userId) {
      fetchSVDRecs();
    }
  };

  const handleBookSelect = (book) => {
    navigate(`/book/${book.isbn}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      {/* Hero Section */}
      <motion.div 
        className="relative py-20 px-4 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            ✨ Discover Your Next
            <span className="block bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
              Favorite Book
            </span>
          </motion.h1>
          <motion.p 
            className="text-xl text-purple-100 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Get personalized recommendations powered by AI or explore books by genre
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        {/* Section Toggle */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="glass-card p-2 flex rounded-2xl">
            {[
              { id: 'user', label: 'User-Based', icon: FaUser },
              { id: 'genre', label: 'Genre-Based', icon: FaBookmark }
            ].map(({ id, label, icon: Icon }) => (
              <motion.button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`flex items-center space-x-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeSection === id
                    ? 'bg-white text-purple-600 shadow-lg'
                    : 'text-white hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon />
                <span>{label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* User-Based Recommendations */}
        <AnimatePresence mode="wait">
          {activeSection === 'user' && (
            <motion.div
              key="user-section"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              {/* User Input Card */}
              <div className="glass-card p-8 rounded-3xl mb-8">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    👤 Personalized Recommendations
                  </h2>
                  <p className="text-purple-200">
                    Enter a user ID or get a random user to see personalized book recommendations
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <input
                        type="number"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="Enter User ID (e.g., 12345)"
                        className="w-full px-6 py-4 bg-white/10 backdrop-blur border border-white/20 
                                 rounded-xl text-white placeholder-white/60 focus:outline-none 
                                 focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={loading.user || !userId.trim()}
                      className="btn-primary flex items-center space-x-2 px-8 py-4"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {loading.user ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          <span>Loading...</span>
                        </>
                      ) : (
                        <>
                          <FaSearch />
                          <span>Get Recommendations</span>
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={handleRandomUser}
                      disabled={loading.randomUser}
                      className="btn-secondary flex items-center space-x-2 px-8 py-4"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {loading.randomUser ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          <span>Loading...</span>
                        </>
                      ) : (
                        <>
                          <FaDice />
                          <span>Random User</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>

              {/* User Stats */}
              {userId && userRatings.length > 0 && (
                <motion.div 
                  className="glass-card p-8 rounded-3xl mb-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">
                    📊 User #{userId} Statistics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { label: 'Total Ratings', value: userRatings.length, icon: '📚' },
                      { 
                        label: 'Average Rating', 
                        value: (userRatings.reduce((sum, r) => sum + r.rating, 0) / userRatings.length).toFixed(1),
                        icon: '⭐'
                      },
                      { 
                        label: 'High Ratings (8+)', 
                        value: userRatings.filter(r => r.rating >= 8).length,
                        icon: '🔥'
                      }
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        className="text-center bg-white/5 rounded-2xl p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <div className="text-4xl mb-2">{stat.icon}</div>
                        <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-purple-200 text-sm">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* User Recommendations Tabs */}
              {(userRecommendations.length > 0 || svdRecommendations.length > 0 || userRatings.length > 0) && (
                <motion.div 
                  className="glass-card rounded-3xl overflow-hidden"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex flex-wrap border-b border-white/10">
                    {[
                      { id: 'user', label: 'Collaborative Filtering', icon: FaUser, count: userRecommendations.length },
                      { id: 'svd', label: 'AI Predictions', icon: FaRobot, count: svdRecommendations.length },
                      { id: 'ratings', label: "User's Ratings", icon: FaStar, count: userRatings.length }
                    ].map(({ id, label, icon: Icon, count }) => (
                      <motion.button
                        key={id}
                        onClick={() => handleTabChange(id)}
                        className={`flex items-center space-x-2 px-6 py-4 font-semibold transition-all ${
                          activeTab === id
                            ? 'bg-white/10 text-white border-b-2 border-pink-400'
                            : 'text-purple-200 hover:text-white hover:bg-white/5'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon />
                        <span className="hidden sm:inline">{label}</span>
                        <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                          {count}
                        </span>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-8">
                    <AnimatePresence mode="wait">
                      {activeTab === 'user' && (
                        <motion.div
                          key="user-tab"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                        >
                          <h3 className="text-2xl font-bold text-white mb-4">
                            🤝 Based on Similar Users
                          </h3>
                          <p className="text-purple-200 mb-6">
                            These recommendations are based on books liked by users with similar reading patterns.
                          </p>
                          <BookGrid
                            books={userRecommendations}
                            onBookSelect={handleBookSelect}
                            loading={loading.user}
                          />
                        </motion.div>
                      )}

                      {activeTab === 'svd' && (
                        <motion.div
                          key="svd-tab"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                        >
                          <h3 className="text-2xl font-bold text-white mb-4">
                            🧠 AI-Powered Predictions
                          </h3>
                          <p className="text-purple-200 mb-6">
                            Advanced matrix factorization to predict your ratings for unread books.
                          </p>
                          <BookGrid
                            books={svdRecommendations}
                            onBookSelect={handleBookSelect}
                            loading={loading.svd}
                          />
                        </motion.div>
                      )}

                      {activeTab === 'ratings' && (
                        <motion.div
                          key="ratings-tab"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                        >
                          <h3 className="text-2xl font-bold text-white mb-4">
                            ⭐ User's Reading History
                          </h3>
                          <p className="text-purple-200 mb-6">
                            Books this user has rated, sorted by rating (highest first).
                          </p>
                          <BookGrid
                            books={userRatings}
                            onBookSelect={handleBookSelect}
                            loading={loading.ratings}
                            showRating={true}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Genre-Based Recommendations */}
          {activeSection === 'genre' && (
            <motion.div
              key="genre-section"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              {/* Genre Selection Card */}
              <div className="glass-card p-8 rounded-3xl mb-8">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    📖 Explore by Genre
                  </h2>
                  <p className="text-purple-200">
                    Select a genre to discover highly-rated books in that category
                  </p>
                </div>

                {/* Genre Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
                  {genres.map((genre) => (
                    <motion.button
                      key={genre}
                      onClick={() => {
                        setSelectedGenre(genre);
                        fetchGenreRecs(genre);
                      }}
                      className={`p-4 rounded-xl font-semibold transition-all ${
                        selectedGenre === genre
                          ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {genre}
                    </motion.button>
                  ))}
                </div>

                {/* Custom Genre Input */}
                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                  <div className="flex flex-col md:flex-row gap-4">
                    <input
                      type="text"
                      value={selectedGenre}
                      onChange={(e) => setSelectedGenre(e.target.value)}
                      placeholder="Or type a custom genre (e.g., 'Mystery', 'Romance', 'Sci-Fi')"
                      className="flex-1 px-6 py-4 bg-white/10 backdrop-blur border border-white/20 
                               rounded-xl text-white placeholder-white/60 focus:outline-none 
                               focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                    />
                    <motion.button
                      type="submit"
                      disabled={loading.genre || !selectedGenre.trim()}
                      className="btn-primary flex items-center space-x-2 px-8 py-4"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {loading.genre ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          <span>Searching...</span>
                        </>
                      ) : (
                        <>
                          <FaHeart />
                          <span>Find Books</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>

              {/* Genre Recommendations */}
              {genreRecommendations.length > 0 && (
                <motion.div 
                  className="glass-card p-8 rounded-3xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-4">
                    📚 Best Books in "{selectedGenre}"
                  </h3>
                  <p className="text-purple-200 mb-6">
                    Highly-rated books sorted by popularity and user ratings
                  </p>
                  <BookGrid
                    books={genreRecommendations}
                    onBookSelect={handleBookSelect}
                    loading={loading.genre}
                  />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="fixed bottom-6 right-6 bg-red-500/90 backdrop-blur text-white px-6 py-4 
                         rounded-xl shadow-xl max-w-md z-50"
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
            >
              <div className="flex items-center justify-between">
                <span>{error}</span>
                <button
                  onClick={() => setError(null)}
                  className="ml-4 text-white hover:text-red-200"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Recommend;
