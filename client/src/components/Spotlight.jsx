import { useEffect, useRef } from 'react';

export default function Spotlight() {
  const ref = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      if (!ref.current) return;
      ref.current.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(59, 130, 246, 0.10), transparent 80%)`;
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 hidden md:block"
    />
  );
}
