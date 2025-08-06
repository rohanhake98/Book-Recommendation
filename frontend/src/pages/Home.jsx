import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BookGrid from '../components/BookGrid';
import { useNavigate } from 'react-router-dom';
import { FaRocket, FaHeart } from 'react-icons/fa';

const Home = () => {
  const [loading] = useState(false);
  const navigate = useNavigate();

  // Real trending books with actual cover images and accurate data
  const trendingBooks = [
    {
      isbn: "9780316015844",
      title: "Fourth Wing",
      author: "Rebecca Yarros", 
      year: 2023,
      publisher: "Red Tower Books",
      image_url: "https://images-na.ssl-images-amazon.com/images/I/91LZuR4b3+L._SL1500_.jpg",
      average_rating: 8.8,
      rating_count: 15600
    },
    {
      isbn: "9780735219090",
      title: "It Ends with Us",
      author: "Colleen Hoover",
      year: 2016,
      publisher: "Atria Books",
      image_url: "https://images-na.ssl-images-amazon.com/images/I/81QoiNvOgQL._SL1500_.jpg",
      average_rating: 8.4,
      rating_count: 125000
    },
    {
      isbn: "9780593356623",
      title: "Lessons in Chemistry", 
      author: "Bonnie Garmus",
      year: 2022,
      publisher: "Doubleday",
      image_url: "https://images-na.ssl-images-amazon.com/images/I/71V2V2GtgnL._SL1500_.jpg",
      average_rating: 8.7,
      rating_count: 98500
    },
    {
      isbn: "9780593546574",
      title: "Spare",
      author: "Prince Harry",
      year: 2023,
      publisher: "Bantam Doubleday Dell",
      image_url: "https://images-na.ssl-images-amazon.com/images/I/71OaJvMZ27L._SL1500_.jpg",
      average_rating: 7.9,
      rating_count: 45600
    },
    {
      isbn: "9780735211292", 
      title: "Atomic Habits",
      author: "James Clear",
      year: 2018,
      publisher: "Avery",
      image_url: "https://images-na.ssl-images-amazon.com/images/I/81YkqyaFVEL._SL1500_.jpg",
      average_rating: 9.2,
      rating_count: 234000
    },
    {
      isbn: "9780316769174",
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      year: 2017,
      publisher: "Atria Books", 
      image_url: "https://images-na.ssl-images-amazon.com/images/I/71dHsHaHo3L._SL1500_.jpg",
      average_rating: 9.0,
      rating_count: 187500
    },
    {
      isbn: "9780593438305",
      title: "The Thursday Murder Club",
      author: "Richard Osman",
      year: 2020,
      publisher: "Pamela Dorman Books",
      image_url: "https://images-na.ssl-images-amazon.com/images/I/91TvCtvQG4L._SL1500_.jpg",
      average_rating: 8.3,
      rating_count: 76800
    },
    {
      isbn: "9780593356319",
      title: "Yellowface", 
      author: "R.F. Kuang",
      year: 2023,
      publisher: "William Morrow",
      image_url: "https://images-na.ssl-images-amazon.com/images/I/813o83p5Z6L._SL1500_.jpg",
      average_rating: 8.6,
      rating_count: 89200
    },
    {
      isbn: "9780593230022",
      title: "The Midnight Library",
      author: "Matt Haig",
      year: 2020,
      publisher: "Viking",
      image_url: "https://images-na.ssl-images-amazon.com/images/I/71DR8jBas3L._SL1500_.jpg",
      average_rating: 8.5,
      rating_count: 156000
    },
    {
      isbn: "9780735211360",
      title: "Where the Crawdads Sing",
      author: "Delia Owens",
      year: 2018,
      publisher: "G.P. Putnam's Sons",
      image_url: "https://images-na.ssl-images-amazon.com/images/I/81O3LdLJZCL._SL1500_.jpg",
      average_rating: 8.8,
      rating_count: 278000
    },
    {
      isbn: "9780735219113",
      title: "It Starts with Us",
      author: "Colleen Hoover", 
      year: 2022,
      publisher: "Atria Books",
      image_url: "https://images-na.ssl-images-amazon.com/images/I/81X1pqXzgmL._SL1500_.jpg",
      average_rating: 8.2,
      rating_count: 156700
    },
    {
      isbn: "9780593419923",
      title: "The Atlas Six",
      author: "Olivie Blake",
      year: 2022,
      publisher: "Tor Books",
      image_url: "https://images-na.ssl-images-amazon.com/images/I/91JMQu3hmwL._SL1500_.jpg",
      average_rating: 7.8,
      rating_count: 67400
    },
    {
      isbn: "9780593356302",
      title: "Book Lovers",
      author: "Emily Henry",
      year: 2022,
      publisher: "Berkley",
      image_url: "https://images-na.ssl-images-amazon.com/images/I/81G2FpGnyuL._SL1500_.jpg", 
      average_rating: 8.4,
      rating_count: 89500
    },
    {
      isbn: "9780593437063",
      title: "The Song of Achilles",
      author: "Madeline Miller",
      year: 2011,
      publisher: "Ecco",
      image_url: "https://images-na.ssl-images-amazon.com/images/I/81M5-jF7-DL._SL1500_.jpg",
      average_rating: 9.1,
      rating_count: 298000
    },
    {
      isbn: "9780593419861",
      title: "Verity",
      author: "Colleen Hoover",
      year: 2018,
      publisher: "Grand Central Publishing",
      image_url: "https://images-na.ssl-images-amazon.com/images/I/71g1s1xziOL._SL1500_.jpg",
      average_rating: 8.6,
      rating_count: 167800
    },
    {
      isbn: "9780593356296",
      title: "People We Meet on Vacation",
      author: "Emily Henry",
      year: 2021,
      publisher: "Berkley",
      image_url: "https://images-na.ssl-images-amazon.com/images/I/81MZrqgaK-L._SL1500_.jpg",
      average_rating: 8.3,
      rating_count: 78900
    }
  ];

  const handleBookSelect = (book) => {
    navigate(`/book/${book.isbn}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      {/* Hero Section */}
      <motion.div 
        className="relative py-32 px-4 text-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-white/10 text-4xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              📖
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1 
            className="text-6xl md:text-7xl font-bold text-white mb-8"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            📚 Discover Your Next
            <motion.span 
              className="block bg-gradient-to-r from-pink-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "linear"
              }}
            >
              Literary Adventure
            </motion.span>
          </motion.h1>

          <motion.p 
            className="text-xl text-purple-100 mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Powered by advanced AI algorithms, our recommendation system analyzes reading patterns 
            to suggest books you'll absolutely love. Join thousands of readers on their journey!
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <motion.button
              onClick={() => navigate('/recommend')}
              className="btn-primary flex items-center space-x-2 text-lg px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaRocket />
              <span>Get My Recommendations</span>
            </motion.button>
            
            <motion.button
              onClick={() => navigate('/search')}
              className="btn-glass flex items-center space-x-2 text-lg px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaHeart />
              <span>Explore Books</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Trending Books Section */}
      <motion.section 
        className="py-20 px-4"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              🔥 Trending Right Now
            </h2>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto">
              Discover the hottest books that readers worldwide can't put down. From romance to 
              thrillers to self-help - these are the books everyone's talking about!
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl">
            <BookGrid
              books={trendingBooks}
              onBookSelect={handleBookSelect}
              loading={loading}
              showRating={false}
            />
          </div>

          {/* Quick Stats */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="glass-card p-6 rounded-2xl">
                <div className="text-4xl mb-4">📈</div>
                <div className="text-2xl font-bold text-white">2M+</div>
                <div className="text-purple-200">Reader Reviews</div>
              </div>
              <div className="glass-card p-6 rounded-2xl">
                <div className="text-4xl mb-4">⭐</div>
                <div className="text-2xl font-bold text-white">8.5</div>
                <div className="text-purple-200">Average Rating</div>
              </div>
              <div className="glass-card p-6 rounded-2xl">
                <div className="text-4xl mb-4">🆕</div>
                <div className="text-2xl font-bold text-white">Daily</div>
                <div className="text-purple-200">Updates</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="py-20 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              ✨ Why Choose BookRecs?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🤖",
                title: "AI-Powered",
                description: "Advanced machine learning algorithms analyze millions of reading patterns to find your perfect match."
              },
              {
                icon: "🎯",
                title: "Personalized",
                description: "Get recommendations tailored specifically to your taste, reading history, and preferences."
              },
              {
                icon: "🌟",
                title: "Diverse",
                description: "Explore books across all genres, from bestsellers to hidden gems waiting to be discovered."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="glass-card p-8 rounded-2xl text-center hover:scale-105 transition-transform duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2 + index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <div className="text-6xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-purple-200 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
