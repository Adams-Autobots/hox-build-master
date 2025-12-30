import { ReactNode } from 'react';

interface HoverTextProps {
  children: string;
  className?: string;
}

export function HoverText({ children, className = '' }: HoverTextProps) {
  const characters = children.split('');

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
