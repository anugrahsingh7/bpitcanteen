import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext';
import { useLive } from '../context/LiveContext';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState('main');
  const navigate = useNavigate();
  const { user } = useUser();
  const { vendorInfo } = useLive();

  const userName = user?.name?.split(' ')[0] || 'there';

  const goTo = (path) => {
    navigate(path);
    setIsOpen(false);
    setCurrentMenu('main');
  };

  const surpriseMe = () => {
    const routes = ['/snacks', '/Chinese', '/SouthIndian', '/IndianItems', '/Deserts', '/beverages'];
    const pick = routes[Math.floor(Math.random() * routes.length)];
    goTo(pick);
  };

  const hoverAnimations = { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } };

  // First-time onboarding animation control
  const [playIntro, setPlayIntro] = useState(false);
  useEffect(() => {
    if (isOpen) {
      const hasShown = localStorage.getItem('bitebot_intro_done');
      if (!hasShown) {
        setPlayIntro(true);
        localStorage.setItem('bitebot_intro_done', '1');
      } else {
        setPlayIntro(false);
      }
    }
  }, [isOpen]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-16 right-0 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col"
          >
            {/* Chat Header */}
            <div className="bg-[#ff6b0e] text-white p-2 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <img 
                  src="/logo/bitebot.png" 
                  alt="BiteBot Logo" 
                  className="w-10 h-10 bg-[#f8f1e7] rounded-full p-1"
                />
                <span className="font-semibold">BiteBot</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            {/* Guided Options Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-[#fbf7f3]">
              <div className="space-y-4">
                {currentMenu === 'main' && (
                  <motion.div
                    variants={containerVariants}
                    initial={playIntro ? 'hidden' : 'visible'}
                    animate={'visible'}
                    className="space-y-2"
                  >
                    <motion.div variants={itemVariants} className="bg-white border border-gray-200 rounded-lg p-3 text-[#ff6b0e]">
                      <p className="text-sm">Hi {userName}! I&apos;m <span className="font-semibold">BiteBot</span>. How can I help you today?</p>
                    </motion.div>
                    <div className="grid grid-cols-1 gap-2">
                      <motion.button variants={itemVariants} {...hoverAnimations} onClick={() => setCurrentMenu('order')} className="w-full text-left px-3 py-2 rounded-md bg-white border border-[#ff6b0e] text-[#ff6b0e] hover:bg-[#fff4ec]">1. 🍽️ Order your favorites</motion.button>
                      <motion.button variants={itemVariants} {...hoverAnimations} onClick={() => setCurrentMenu('confused')} className="w-full text-left px-3 py-2 rounded-md bg-white border border-[#ff6b0e] text-[#ff6b0e] hover:bg-[#fff4ec]">2. 🤔 Not sure what to eat?</motion.button>
                      <motion.button variants={itemVariants} {...hoverAnimations} onClick={() => setCurrentMenu('location')} className="w-full text-left px-3 py-2 rounded-md bg-white border border-[#ff6b0e] text-[#ff6b0e] hover:bg-[#fff4ec]">3. 📍 Find the canteen</motion.button>
                      <motion.button variants={itemVariants} {...hoverAnimations} onClick={() => setCurrentMenu('contact')} className="w-full text-left px-3 py-2 rounded-md bg-white border border-[#ff6b0e] text-[#ff6b0e] hover:bg-[#fff4ec]">4. 📞 Contact us</motion.button>
                      <motion.button variants={itemVariants} {...hoverAnimations} onClick={() => goTo('/OrderHistory')} className="w-full text-left px-3 py-2 rounded-md bg-white border border-[#ff6b0e] text-[#ff6b0e] hover:bg-[#fff4ec]">5. 🧾 View order history</motion.button>
                      <motion.button variants={itemVariants} {...hoverAnimations} onClick={() => setCurrentMenu('timings')} className="w-full text-left px-3 py-2 rounded-md bg-white border border-[#ff6b0e] text-[#ff6b0e] hover:bg-[#fff4ec]">6. 🕒 Today’s timings</motion.button>
                      <motion.button variants={itemVariants} {...hoverAnimations} onClick={() => setCurrentMenu('faqs')} className="w-full text-left px-3 py-2 rounded-md bg-white border border-[#ff6b0e] text-[#ff6b0e] hover:bg-[#fff4ec]">7. ❓ Quick FAQs</motion.button>
                    </div>
                  </motion.div>
                )}

                {currentMenu === 'order' && (
                  <motion.div key={`menu-order-${isOpen}`} variants={containerVariants} initial={'hidden'} animate={'visible'} className="space-y-2">
                    <motion.div variants={itemVariants} className="flex items-center justify-between">
                      <p className="text-[#ff6b0e] font-semibold">🍽️ Order your favorites</p>
                      <button onClick={() => setCurrentMenu('main')} className="text-sm text-[#ff6b0e] underline">Back</button>
                    </motion.div>
                    <div className="grid grid-cols-2 gap-2">
                      <motion.button variants={itemVariants} {...hoverAnimations} onClick={() => goTo('/snacks')} className="px-3 py-2 rounded-md bg-white border border-[#ff6b0e] text-[#ff6b0e] hover:bg-[#fff4ec]">Snacks</motion.button>
                      <motion.button variants={itemVariants} {...hoverAnimations} onClick={() => goTo('/Chinese')} className="px-3 py-2 rounded-md bg-white border border-[#ff6b0e] text-[#ff6b0e] hover:bg-[#fff4ec]">Chinese</motion.button>
                      <motion.button variants={itemVariants} {...hoverAnimations} onClick={() => goTo('/SouthIndian')} className="px-3 py-2 rounded-md bg-white border border-[#ff6b0e] text-[#ff6b0e] hover:bg-[#fff4ec]">South Indian</motion.button>
                      <motion.button variants={itemVariants} {...hoverAnimations} onClick={() => goTo('/IndianItems')} className="px-3 py-2 rounded-md bg-white border border-[#ff6b0e] text-[#ff6b0e] hover:bg-[#fff4ec]">Indian</motion.button>
                      <motion.button variants={itemVariants} {...hoverAnimations} onClick={() => goTo('/Deserts')} className="px-3 py-2 rounded-md bg-white border border-[#ff6b0e] text-[#ff6b0e] hover:bg-[#fff4ec]">Desserts</motion.button>
                      <motion.button variants={itemVariants} {...hoverAnimations} onClick={() => goTo('/beverages')} className="px-3 py-2 rounded-md bg-white border border-[#ff6b0e] text-[#ff6b0e] hover:bg-[#fff4ec]">Beverages</motion.button>
                      <motion.button variants={itemVariants} {...hoverAnimations} onClick={() => goTo('/cart')} className="col-span-2 px-3 py-2 rounded-md bg-[#ff6b0e] text-white hover:opacity-90">Go to Cart</motion.button>
                    </div>
                  </motion.div>
                )}

                {currentMenu === 'confused' && (
                  <motion.div key={`menu-confused-${isOpen}`} variants={containerVariants} initial={'hidden'} animate={'visible'} className="space-y-2">
                    <motion.div variants={itemVariants} className="flex items-center justify-between">
                      <p className="text-[#ff6b0e] font-semibold">🤔 Not sure? Try these</p>
                      <button onClick={() => setCurrentMenu('main')} className="text-sm text-[#ff6b0e] underline">Back</button>
                    </motion.div>
                    <motion.div variants={itemVariants} className="bg-white border border-gray-200 rounded-lg p-3 text-[#ff6b0e]">
                      <p className="text-sm">Try one of these popular picks:</p>
                    </motion.div>
                    <div className="grid grid-cols-2 gap-2">
                      <motion.button variants={itemVariants} {...hoverAnimations} onClick={() => goTo('/snacks')} className="px-3 py-2 rounded-md bg-white border border-[#ff6b0e] text-[#ff6b0e] hover:bg-[#fff4ec]">Snacks</motion.button>
                      <motion.button variants={itemVariants} {...hoverAnimations} onClick={() => goTo('/Chinese')} className="px-3 py-2 rounded-md bg-white border border-[#ff6b0e] text-[#ff6b0e] hover:bg-[#fff4ec]">Chinese</motion.button>
                      <motion.button variants={itemVariants} {...hoverAnimations} onClick={() => goTo('/SouthIndian')} className="px-3 py-2 rounded-md bg-white border border-[#ff6b0e] text-[#ff6b0e] hover:bg-[#fff4ec]">South Indian</motion.button>
                      <motion.button variants={itemVariants} {...hoverAnimations} onClick={() => goTo('/beverages')} className="px-3 py-2 rounded-md bg-white border border-[#ff6b0e] text-[#ff6b0e] hover:bg-[#fff4ec]">Beverages</motion.button>
                      <motion.button variants={itemVariants} {...hoverAnimations} onClick={surpriseMe} className="col-span-2 px-3 py-2 rounded-md bg-[#ff6b0e] text-white hover:opacity-90">Surprise Me</motion.button>
                    </div>
                  </motion.div>
                )}

                {currentMenu === 'location' && (
                  <motion.div key={`menu-location-${isOpen}`} variants={containerVariants} initial={'hidden'} animate={'visible'} className="space-y-2">
                    <motion.div variants={itemVariants} className="flex items-center justify-between">
                      <p className="text-[#ff6b0e] font-semibold">📍 Canteen location</p>
                      <button onClick={() => setCurrentMenu('main')} className="text-sm text-[#ff6b0e] underline">Back</button>
                    </motion.div>
                    <motion.div variants={itemVariants} className="space-y-2">
                      <motion.div variants={itemVariants} className="bg-white border border-gray-200 rounded-lg p-3 text-[#ff6b0e]">
                        <p className="text-sm">BPIT Canteen, Rohini, Delhi</p>
                        <p className="text-xs opacity-80">Inside Bhagwan Parshuram Institute of Technology</p>
                      </motion.div>
                      <motion.a variants={itemVariants} href="https://maps.google.com/?q=BPIT Canteen" target="_blank" rel="noreferrer" className="inline-block px-3 py-2 rounded-md bg-[#ff6b0e] text-white hover:opacity-90 text-center">Open in Google Maps</motion.a>
                    </motion.div>
                  </motion.div>
                )}

                {currentMenu === 'timings' && (
                  <motion.div key={`menu-timings-${isOpen}`} variants={containerVariants} initial={'hidden'} animate={'visible'} className="space-y-2">
                    <motion.div variants={itemVariants} className="flex items-center justify-between">
                      <p className="text-[#ff6b0e] font-semibold">🕒 Vendor timings</p>
                      <button onClick={() => setCurrentMenu('main')} className="text-sm text-[#ff6b0e] underline">Back</button>
                    </motion.div>
                    <motion.div variants={itemVariants} className="space-y-2">
                      <div className="bg-white border border-gray-200 rounded-lg p-3 text-[#ff6b0e]">
                        <p className="text-sm">Status: <span className={`font-semibold ${vendorInfo?.status ? 'text-green-600' : 'text-red-600'}`}>{vendorInfo?.status ? 'Open' : 'Closed'}</span></p>
                        <p className="text-xs opacity-80 mt-1">Monday - Friday: 8:00 AM - 6:00 PM</p>
                        <p className="text-xs opacity-80">Saturday: 9:00 AM - 4:00 PM</p>
                        <p className="text-xs opacity-80">Sunday: Closed</p>
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {currentMenu === 'faqs' && (
                  <motion.div key={`menu-faqs-${isOpen}`} variants={containerVariants} initial={'hidden'} animate={'visible'} className="space-y-2">
                    <motion.div variants={itemVariants} className="flex items-center justify-between">
                      <p className="text-[#ff6b0e] font-semibold">❓ Quick FAQs</p>
                      <button onClick={() => setCurrentMenu('main')} className="text-sm text-[#ff6b0e] underline">Back</button>
                    </motion.div>
                    <motion.div variants={itemVariants} className="space-y-2">
                      <details className="bg-white border border-gray-200 rounded-lg p-3 text-[#ff6b0e]">
                        <summary className="cursor-pointer font-medium">Do you accept online payments?</summary>
                        <p className="text-sm mt-2">Yes, we accept both cash and digital payments during checkout.</p>
                      </details>
                      <details className="bg-white border border-gray-200 rounded-lg p-3 text-[#ff6b0e]">
                        <summary className="cursor-pointer font-medium">Is delivery available?</summary>
                        <p className="text-sm mt-2">Orders are for pickup only from the canteen counter.</p>
                      </details>
                      <details className="bg-white border border-gray-200 rounded-lg p-3 text-[#ff6b0e]">
                        <summary className="cursor-pointer font-medium">How can I see my past orders?</summary>
                        <p className="text-sm mt-2">Click Order History from the main menu or visit the Orders page.</p>
                      </details>
                      <details className="bg-white border border-gray-200 rounded-lg p-3 text-[#ff6b0e]">
                        <summary className="cursor-pointer font-medium">What are popular items?</summary>
                        <p className="text-sm mt-2">Snacks, Chinese bowls, and Beverages are most loved by students!</p>
                      </details>
                    </motion.div>
                  </motion.div>
                )}
                {currentMenu === 'contact' && (
                  <motion.div key={`menu-contact-${isOpen}`} variants={containerVariants} initial={'hidden'} animate={'visible'} className="space-y-2">
                    <motion.div variants={itemVariants} className="flex items-center justify-between">
                      <p className="text-[#ff6b0e] font-semibold">📞 Contact us</p>
                      <button onClick={() => setCurrentMenu('main')} className="text-sm text-[#ff6b0e] underline">Back</button>
                    </motion.div>
                    <motion.div variants={itemVariants} className="grid grid-cols-1 gap-2">
                      <a href="tel:+911234567890" className="px-3 py-2 rounded-md bg-[#ff6b0e] text-white hover:opacity-90 text-center">Call Canteen</a>
                      <a href="mailto:canteen@bpit.edu" className="px-3 py-2 rounded-md bg-white border border-[#ff6b0e] text-[#ff6b0e] hover:bg-[#fff4ec] text-center">Email Us</a>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#ff6b0e] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center relative group shadow-md  "
        title="Talk to BiteBot"
      >
        <img 
          src="/logo/bitebot.png" 
          alt="BiteBot" 
          className="w-8 h-8 rounded-full bg-[#f8f1e7] p-1"
        />
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-[#ff6b0e] text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap ">
          Talk to BiteBot
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#ff6b0e]"></div>
        </div>
      </motion.button>
    </div>
  );
};

export default Chatbot;
