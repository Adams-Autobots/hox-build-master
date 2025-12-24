import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/971588950056"
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6',
        'flex items-center justify-center',
        'w-11 h-11 sm:w-14 sm:h-14 rounded-full',
        'bg-[#25D366] text-white',
        'shadow-lg shadow-[#25D366]/30',
        'hover:shadow-xl hover:shadow-[#25D366]/40',
        'transition-shadow duration-300'
      )}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Contact us on WhatsApp"
    >
      {/* Pulse Ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
      
      <MessageCircle className="w-6 h-6 relative z-10" />
    </motion.a>
  );
}
