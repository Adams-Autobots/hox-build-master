import { MessageCircle } from 'lucide-react';

export const WhatsAppButton = () => {
  const whatsappNumber = '+971501234567'; // Replace with actual number
  const message = 'Hello! I would like to inquire about your services.';
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-11 h-11 md:w-14 md:h-14 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
    </a>
  );
};
