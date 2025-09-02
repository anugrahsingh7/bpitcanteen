import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Chatbot from './Chatbot';

const ChatbotWrapper = () => {
  const location = useLocation();

  const shouldShow = useMemo(() => {
    const allowed = new Set([
      '/snacks',
      '/chinese',
      '/southindian',
      '/indianitems',
      '/deserts',
      '/beverages',
      '/orderhistory',
      '/cart',
      '/bill',
    ]);
    const normalizedPath = (location.pathname || '/')
      .replace(/\/$/, '')
      .toLowerCase();
    return allowed.has(normalizedPath);
  }, [location.pathname]);

  if (!shouldShow) return null;
  return <Chatbot />;
};

export default ChatbotWrapper;


