import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaPhone, FaShoppingCart, FaMoneyBill } from 'react-icons/fa';

function VendorDashboard() {
    const [orders, setOrders] = useState([]);
    const [vendorName, setVendorName] = useState('');

    // Load orders function
    const loadOrders = () => {
        const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        setOrders(storedOrders);
    };

    useEffect(() => {
        // Get vendor name from localStorage
        const storedVendorName = localStorage.getItem('vendorName');
        setVendorName(storedVendorName || '');
        
        // Initial load
        loadOrders();

        // Set up interval for reloading every 5 seconds
        const interval = setInterval(loadOrders, 5000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    const handleReceiveOrder = (orderId) => {
        const updatedOrders = orders.map(order => 
            order.id === orderId 
                ? { ...order, status: 'Received' }
                : order
        );
        setOrders(updatedOrders);
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
    };

    const handlePreparedOrder = (orderId) => {
        const updatedOrders = orders.map(order => 
            order.id === orderId 
                ? { ...order, status: 'prepared' }
                : order
        );
        setOrders(updatedOrders);
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
    };

    const handleDeleteOrder = (orderId) => {
        const updatedOrders = orders.filter(order => order.id !== orderId);
        setOrders(updatedOrders);
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
    };

    const handleClearAllOrders = () => {
        setOrders([]);
        localStorage.setItem('orders', '[]');
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-2 sm:p-4 md:p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen"
        >
            <motion.h1 
                className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-gray-800"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
            >
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                    <div>
                        <span className='text-orange-500'>BPIT CANTEEN</span>  
                        <span className='text-black text-lg sm:text-xl md:text-2xl'> Dashboard</span>
                    </div>
                    {vendorName && (
                        <div className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full shadow-sm">
                            <FaUser className="text-orange-500 text-sm sm:text-base md:text-lg" />
                            <span className="font-semibold">{vendorName}</span>
                        </div>
                    )}
                </div>
                <div className="mt-4 pb-4 border-b flex justify-end">
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleClearAllOrders}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-colors duration-200"
                    >
                        Clear All Orders
                    </motion.button>
                </div>
            </motion.h1>

            {/* Mobile View - Card Layout */}
            <div className="md:hidden space-y-4">
                <AnimatePresence>
                    {orders.map((order) => (
                        <motion.div 
                            key={order.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white rounded-lg shadow-md p-4"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <div className="font-medium text-sm text-gray-500">Order ID</div>
                                    <div className="font-bold break-all">
                                        {order.id}
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium
                                    ${order.status === 'prepared' ? 'bg-green-100 text-green-800' : 
                                      order.status === 'Received' ? 'bg-yellow-100 text-yellow-800' :
                                      'bg-blue-100 text-blue-800'}`}>
                                    {order.status}
                                </span>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <FaUser className="text-gray-400" />
                                    <span className="font-medium">{order.customerName}</span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    <FaPhone className="text-gray-400" />
                                    <a 
                                        href={`tel:${order.phoneNumber}`} 
                                        className="hover:text-blue-600 transition-colors duration-200"
                                    >
                                        {order.phoneNumber}
                                    </a>
                                </div>

                                <div className="border-t pt-2">
                                    <div className="font-medium mb-1">Items:</div>
                                    {order.items.map(item => (
                                        <div key={item.id} className="flex justify-between text-sm py-1">
                                            <span>{item.name}</span>
                                            <span className="text-gray-500">x{item.quantity}</span>
                                        </div>
                                    ))}
                                </div>

                                {order.items.some(item => item.instructions) && (
                                    <div className="border-t pt-2">
                                        <div className="font-medium mb-1">Instructions:</div>
                                        {order.items.map(item => (
                                            item.instructions && (
                                                <div key={item.id} className="text-sm py-1">
                                                    <span className="font-medium">{item.name}:</span>
                                                    <span className="text-gray-600 italic ml-2">
                                                        {item.instructions}
                                                    </span>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                )}

                                <div className="flex justify-between items-center border-t pt-2">
                                    <div>
                                        <div className="text-sm text-gray-500">Total Amount</div>
                                        <div className="font-bold">₹{order.totalAmount}</div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                                        ${order.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {order.paymentStatus}
                                    </span>
                                </div>

                                <div className="flex gap-2 pt-2 border-t">
                                    {order.status === 'pending' && (
                                        <motion.button
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleReceiveOrder(order.id)}
                                            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-md text-sm font-medium shadow-sm"
                                        >
                                            Received
                                        </motion.button>
                                    )}
                                    {order.status === 'Received' && (
                                        <motion.button
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handlePreparedOrder(order.id)}
                                            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-md text-sm font-medium shadow-sm"
                                        >
                                            Prepared
                                        </motion.button>
                                    )}
                                    {order.status === 'prepared' && (
                                        <motion.button
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleDeleteOrder(order.id)}
                                            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-2 rounded-md text-sm font-medium shadow-sm flex items-center justify-center gap-2"
                                        >
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                className="h-4 w-4" 
                                                fill="none" 
                                                viewBox="0 0 24 24" 
                                                stroke="currentColor"
                                            >
                                                <path 
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round" 
                                                    strokeWidth={2} 
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                                                />
                                            </svg>
                                            Delete Order
                                        </motion.button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Desktop View - Table Layout */}
            <div className="hidden md:block rounded-lg shadow-lg overflow-hidden bg-white">
                <table className="w-full table-fixed">
                    <thead>
                        <tr className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                            <th className="px-2 py-4 text-left w-20">Order ID</th>
                            <th className="px-2 py-4 text-left w-24"><FaUser className="inline mr-1" />Customer</th>
                            <th className="px-2 py-4 text-left w-28"><FaPhone className="inline mr-1" />Phone</th>
                            <th className="px-2 py-4 text-left w-32"><FaShoppingCart className="inline mr-1" />Items</th>
                            <th className="px-2 py-4 text-left w-40">Instructions</th>
                            <th className="px-2 py-4 text-left w-24"><FaMoneyBill className="inline mr-1" />Total</th>
                            <th className="px-2 py-4 text-left w-24">Payment</th>
                            <th className="px-2 py-4 text-left w-24">Status</th>
                            <th className="px-2 py-4 text-left w-24">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence>
                            {orders.map((order) => (
                                <motion.tr 
                                    key={order.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="hover:bg-blue-50 transition-colors duration-150"
                                >
                                    <td className="px-2 py-4 border-b group relative">
                                        <span className="cursor-help">
                                            {order.id.substring(0, 5)}...
                                            <div className="invisible group-hover:visible absolute z-10 bg-gray-900 text-white text-sm rounded-md py-1 px-2 -mt-1 
                                                whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                {order.id}
                                            </div>
                                        </span>
                                    </td>
                                    <td className="px-2 py-4 border-b font-medium">{order.customerName}</td>
                                    <td className="px-2 py-4 border-b">
                                        <a 
                                            href={`tel:${order.phoneNumber}`}
                                            className="hover:text-blue-600 transition-colors duration-200 flex items-center gap-1"
                                        >
                                            {order.phoneNumber}
                                        </a>
                                    </td>
                                    <td className="px-2 py-4 border-b">
                                        <div className="space-y-1">
                                            {order.items.map(item => (
                                                <div key={item.id} className="text-sm">
                                                    <span className="font-medium">{item.name}</span>
                                                    <span className="text-gray-500 ml-2">x{item.quantity}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-2 py-4 border-b">
                                        <div className="space-y-1">
                                            {order.items.map(item => (
                                                item.instructions && (
                                                    <div key={item.id} className="text-sm">
                                                        <div className="flex items-start gap-2">
                                                            <span className="font-medium min-w-[100px] truncate">
                                                                {item.name}:
                                                            </span>
                                                            <span className="text-gray-600 italic">
                                                                {item.instructions}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )
                                            ))}
                                            {!order.items.some(item => item.instructions) && (
                                                <span className="text-gray-400 italic text-sm">
                                                    No special instructions
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-2 py-4 border-b font-medium">₹{order.totalAmount}</td>
                                    <td className="px-2 py-4 border-b">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium
                                            ${order.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {order.paymentStatus}
                                        </span>
                                    </td>
                                    <td className="px-2 py-4 border-b">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium
                                            ${order.status === 'prepared' ? 'bg-green-100 text-green-800' : 
                                              order.status === 'Received' ? 'bg-yellow-100 text-yellow-800' :
                                              order.status === 'pending' ? 'bg-blue-100 text-blue-800' : 
                                              'bg-gray-100 text-gray-800'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-2 py-4 border-b">
                                        <div className="flex items-center gap-2">
                                            {order.status === 'pending' && (
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => handleReceiveOrder(order.id)}
                                                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200"
                                                >
                                                    received
                                                </motion.button>
                                            )}
                                            {order.status === 'Received' && (
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => handlePreparedOrder(order.id)}
                                                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200"
                                                >
                                                    Prepared
                                                </motion.button>
                                            )}
                                            {order.status === 'prepared' && (
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => handleDeleteOrder(order.id)}
                                                    className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 rounded-md text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
                                                >
                                                    <svg 
                                                        xmlns="http://www.w3.org/2000/svg" 
                                                        className="h-4 w-4" 
                                                        fill="none" 
                                                        viewBox="0 0 24 24" 
                                                        stroke="currentColor"
                                                    >
                                                        <path 
                                                            strokeLinecap="round" 
                                                            strokeLinejoin="round" 
                                                            strokeWidth={2} 
                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                                                        />
                                                    </svg>
                                                    Delete
                                                </motion.button>
                                            )}
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}

export default VendorDashboard;
