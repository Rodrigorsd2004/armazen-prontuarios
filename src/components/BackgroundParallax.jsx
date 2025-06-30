import React, { useEffect, useRef } from 'react';
import './Styles/BackgroundParallax.css';

export default function BackgroundParallax({ imageUrl }) {
  const bgRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const intensity = 40; // Intensidade do efeito parallax
      const x = (e.clientX / innerWidth - 0.5) * intensity; // Multiplica para dar amplitude
      const y = (e.clientY / innerHeight - 0.5) * intensity;

      if (bgRef.current) {
        bgRef.current.style.transform = `translate(${-x}px, ${-y}px) scale(1.05)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={bgRef}
      className="background-parallax"
      style={{ backgroundImage: `url(${imageUrl})` }}
    />
  );
}
