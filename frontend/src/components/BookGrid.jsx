import React from 'react';
import { motion } from 'framer-motion';
import BookCard from './BookCard';

const grid = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05 }
  }
};

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1 }
};

const BookGrid = ({ books = [], onBookSelect, loading = false, showRating = false }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="loading-dots">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <p className="ml-4 text-white text-lg">Loading amazing books...</p>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold text-white mb-2">No books found</h3>
        <p className="text-purple-200">Try a different search or recommendation method</p>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      variants={grid}
      initial="hidden"
      animate="show"
    >
      {books.map((book, index) => (
        <motion.div variants={item} key={book.isbn || `book-${index}`}>
          <BookCard
            book={book}
            onClick={() => onBookSelect(book)}
            showRating={showRating}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default BookGrid;
