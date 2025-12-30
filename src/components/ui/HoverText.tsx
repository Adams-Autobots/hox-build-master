import { useEffect, useState } from 'react';

interface HoverTextProps {
  children: string;
  className?: string;
}

export function HoverText({ children, className = '' }: HoverTextProps) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // On touch devices, just render the text normally
  if (isTouchDevice) {
    return <span className={className}>{children}</span>;
  }

  // Split into words, then characters within each word
  const words = children.split(' ');

  return (
    <span className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((char, charIndex) => (
            <span key={charIndex} className="hover-letter">
              {char}
            </span>
          ))}
          {/* Add space after word (except last word) */}
          {wordIndex < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </span>
  );
}
