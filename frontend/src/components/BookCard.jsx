import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaUsers } from 'react-icons/fa';

const BookCard = ({ book, onClick, showRating = false }) => {
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/128x200/6366f1/ffffff?text=No+Image';
  };

  const truncateText = (text, maxLength = 40) => {
    if (!text) return 'Unknown';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <motion.div 
      className="group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden cursor-pointer
                 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
      onClick={onClick}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        rotateX: 5,
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative overflow-hidden">
        <img
          src={book.image_url || book.image_url_medium || 'https://via.placeholder.com/200x300/6366f1/ffffff?text=No+Image'}
          alt={book.title}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          onError={handleImageError}
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 
                        group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Rating badge */}
        {showRating && book.rating && (
          <div className="absolute top-3 right-3 bg-yellow-500/90 backdrop-blur text-white 
                          px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <FaStar className="text-xs" />
            {book.rating}
          </div>
        )}

        {/* Average rating badge for genre recommendations */}
        {book.average_rating && (
          <div className="absolute top-3 right-3 bg-yellow-500/90 backdrop-blur text-white 
                          px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <FaStar className="text-xs" />
            {book.average_rating.toFixed(1)}
          </div>
        )}

        {/* Popularity indicator */}
        {book.rating_count && (
          <div className="absolute top-3 left-3 bg-blue-500/90 backdrop-blur text-white 
                          px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <FaUsers className="text-xs" />
            {book.rating_count}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h4 className="font-bold text-gray-800 mb-2 leading-tight">
          {truncateText(book.title, 50)}
        </h4>
        <p className="text-gray-600 text-sm mb-2">
          by {truncateText(book.author, 35)}
        </p>
        <p className="text-gray-500 text-xs">
          {book.year} • {truncateText(book.publisher, 30)}
        </p>
        
        {/* Additional info for different recommendation types */}
        <div className="mt-3 flex flex-wrap gap-1">
          {book.similarity_score && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {(book.similarity_score * 100).toFixed(0)}% match
            </span>
          )}
          {book.recommendation_score && (
            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
              Score: {book.recommendation_score.toFixed(1)}
            </span>
          )}
          {book.predicted_rating && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              Predicted: {book.predicted_rating.toFixed(1)}/10
            </span>
          )}
          {book.popularity_score && (
            <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
              Popular
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;
