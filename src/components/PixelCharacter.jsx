import { useState, useEffect } from 'react';
import './PixelCharacter.scss';

const PixelCharacter = () => {
  const [position, setPosition] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [direction, setDirection] = useState('right');

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;

    const handleScroll = () => {
      console.log('asd');
      const currentScrollY = window.scrollY;
      const scrollDiff = currentScrollY - lastScrollY;

      // Calculate horizontal position based on scroll percentage
      const scrollProgress = currentScrollY / maxScroll;
      const screenWidth = window.innerWidth - 32; // Subtract character width
      const newPosition = Math.max(
        0,
        Math.min(screenWidth, scrollProgress * screenWidth)
      );

      setPosition(newPosition);
      setIsMoving(scrollDiff !== 0);
      setDirection(scrollDiff > 0 ? 'right' : 'left');

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div className={`pixel-character`}></div>;
};

export default PixelCharacter;
