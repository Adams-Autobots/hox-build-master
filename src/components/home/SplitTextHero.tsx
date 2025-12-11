import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    rotateX: -90,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
  },
};

export function SplitText({ text, className, delay = 0, staggerDelay = 0.03 }: SplitTextProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const letters = text.split('');

  return (
    <motion.span
      className={className}
      initial="hidden"
      animate={isLoaded ? 'visible' : 'hidden'}
      style={{ display: 'inline-block', perspective: '1000px' }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          transition={{
            duration: 0.5,
            delay: delay + index * staggerDelay,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          style={{
            display: 'inline-block',
            transformOrigin: 'bottom center',
            whiteSpace: letter === ' ' ? 'pre' : 'normal',
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.span>
  );
}

interface WordRevealProps {
  words: string[];
  className?: string;
  delay?: number;
}

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: '100%',
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export function WordReveal({ words, className, delay = 0 }: WordRevealProps) {
  return (
    <span className={className}>
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            transition={{
              duration: 0.8,
              delay: delay + index * 0.15,
              ease: [0.215, 0.61, 0.355, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

interface LineRevealProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}

export function LineReveal({ lines, className, lineClassName, delay = 0 }: LineRevealProps) {
  return (
    <div className={className}>
      {lines.map((line, index) => (
        <div key={index} className="overflow-hidden">
          <motion.div
            className={lineClassName}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: delay + index * 0.2,
              ease: [0.215, 0.61, 0.355, 1],
            }}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
