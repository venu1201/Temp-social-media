import React, { useState } from 'react';
import { motion } from 'framer-motion';

const LikeButton = () => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <motion.button
      onClick={handleLike}
      style={{
        padding: '',
        backgroundColor: 'transparent',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
      }}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="35"
        viewBox="0 0 24 24"
        fill="white"
        stroke="white" // Initial border color
        strokeWidth={liked?"0":"2"}
        strokeLinecap="round"
        strokeLinejoin="round"
       
        className="feather feather-heart"
        animate={{ stroke: liked? 'red':'white', fill: liked ? 'red' : '' }} // Animate border color and fill on click
      >
        <motion.path
          d="M21.15 4.21a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.37-1.46a5.5 5.5 0 0 0-7.78 7.78l1.46 1.37L12 21.23l7.13-7.18 1.42-1.42a5.5 5.5 0 0 0 0-7.77z"
          fill={liked ? 'red' : 'transparent'} // Fill color on "like" state
          initial={{ pathLength: 1 }}
          animate={{ pathLength: liked ? 0 : 1 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }} // Duration and easing of the border drawing animation
        />
      </motion.svg>
    </motion.button>
  );
};

export default LikeButton;
