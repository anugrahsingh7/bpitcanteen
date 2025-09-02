import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Chatbot from './Chatbot';

const ChatbotWrapper = () => {
  const location = useLocation();

  const shouldShow = useMemo(() => {
    const allowed = new Set([
      '/snacks',
      '/Chinese',
      '/SouthIndian',
      '/IndianItems',
      '/Deserts',
      '/beverages',
      '/OrderHistory',
      '/cart',
      '/bill',
    ]);
    return allowed.has(location.pathname);
  }, [location.pathname]);

  if (!shouldShow) return null;
  return <Chatbot />;
};

export default ChatbotWrapper;


