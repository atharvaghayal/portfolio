import React, { useState, useEffect } from 'react';
import './Typewriter.css';

const Typewriter = ({ words, typingSpeed = 150, deletingSpeed = 100, pauseTime = 2000 }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // This hook manages the typing animation intervals
    const currentWord = words[wordIndex];
    let timeoutId;

    if (isDeleting) {
      // --- Deleting state ---
      if (text.length > 0) {
        // We are still deleting the word
        timeoutId = setTimeout(() => {
          setText(currentWord.substring(0, text.length - 1));
        }, deletingSpeed);
      } else {
        // Finished deleting, move to the next word
        setIsDeleting(false);
        setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      }
    } else {
      // --- Typing state ---
      if (text.length < currentWord.length) {
        // We are still typing the word
        timeoutId = setTimeout(() => {
          setText(currentWord.substring(0, text.length + 1));
        }, typingSpeed);
      } else {
        // Finished typing, pause for a bit, then start deleting
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
      }
    }

    // Clear the timeout on component unmount or when dependencies change
    return () => clearTimeout(timeoutId);
    
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]); // All dependencies are now correctly included

  return (
    <span className="typewriter">
      {text}
      {/* This empty span is what the CSS will use to create the cursor */}
      <span className="cursor-element"></span>
    </span>
  );
};
export default Typewriter;