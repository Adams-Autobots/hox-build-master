import { ReactNode, useEffect, useState } from 'react';

interface HoverTextProps {
  children: string;
  className?: string;
}

export function HoverText({ children, className = '' }: HoverTextProps) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const characters = children.split('');

  // On touch devices, just render the text normally
  if (isTouchDevice) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span className={className}>
      {characters.map((char, index) => (
        <span
          key={index}
          className={char === ' ' ? '' : 'hover-letter'}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}
