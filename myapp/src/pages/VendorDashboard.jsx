import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaPhone, FaShoppingCart, FaMoneyBill } from 'react-icons/fa';
import notificationSound from '../assets/notification.mp3'; // Import the sound file
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Helper function to get formatted time
const getFormattedTime = (orderTime) => {
    const date = orderTime ? new Date(orderTime) : new Date();
    return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    });
};

// Add this CSS at the top of your file or in your styles
const pulseAnimation = {
    animate: {
        scale: [1, 1.2, 1],
        opacity: [1, 0.8, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

function VendorDashboard() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [vendorName, setVendorName] = useState('');
    const audioRef = useRef(new Audio(notificationSound));
    const previousOrdersRef = useRef(new Set());

    // Modified loadOrders function without delay
    const loadOrders = () => {
        setLoading(true);
        
        const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        
        // Check for new orders by comparing IDs
        const currentOrderIds = new Set(storedOrders.map(order => order.id));
        const newOrders = storedOrders.filter(order => !previousOrdersRef.current.has(order.id));
        
        // If there are new orders, play sound and show notification
        if (newOrders.length > 0) {
            // Play notification sound
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(err => console.log('Audio play failed:', err));
            
            // Show notification for each new order
            newOrders.forEach(order => {
                showNotification(order);
            });
        }
        
        // Update previous orders reference
        previousOrdersRef.current = currentOrderIds;
        
        // Sort orders with newest first
        const sortedOrders = storedOrders.sort((a, b) => {
            if (a.timestamp && b.timestamp) {
                return new Date(b.timestamp) - new Date(a.timestamp);
            }
            return b.id.localeCompare(a.id);
        });
        
        setOrders(sortedOrders);
        setLoading(false);
    };

    // Enhanced notification function
    const showNotification = (order) => {
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notifications");
            return;
        }

        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                const notification = new Notification("New Order Received! 🔔", {
                    body: `Order ID: ${order.id}\nCustomer: ${order.customerName}\nTotal: ₹${order.totalAmount}`,
                    icon: "/your-logo.png", // Add your logo path
                    badge: "/your-badge.png", // Add your badge path
                    silent: true, // Important: prevents default notification sound
                    tag: order.id, // Prevents duplicate notifications
                    requireInteraction: true // Notification persists until user interacts
                });

                // Handle notification click
                notification.onclick = function() {
                    window.focus();
                    notification.close();
                };
            }
        });
    };

    useEffect(() => {
        // Get vendor name from localStorage
        const storedVendorName = localStorage.getItem('vendorName');
        if (storedVendorName) {
            setVendorName(storedVendorName);
        }

        // Request notification permission on component mount
        if ("Notification" in window) {
            Notification.requestPermission();
        }

        // Initial load
        loadOrders();

        // Poll for new orders every second
        const interval = setInterval(loadOrders, 1000);
        
        // Cleanup
        return () => {
            clearInterval(interval);
            previousOrdersRef.current.clear();
        };
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

    const downloadPDF = () => {
        const doc = new jsPDF();
        
        // Header
        doc.setFontSize(22);
        doc.setTextColor(241, 90, 35); // Orange color
        doc.text('BPIT CANTEEN', 15, 20);
        
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        doc.text('Orders Report', 15, 30);

        // Report Info
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 15, 40);
        doc.text(`Total Orders: ${orders.length}`, 15, 45);
        doc.text(`Vendor Name: ${vendorName}`, 15, 50);

        let yPos = 70; // Starting y position for orders

        // For each order
        orders.forEach((order, index) => {
            // Check if we need a new page
            if (yPos > 250) {
                doc.addPage();
                yPos = 20;
            }

            // Order Header
            doc.setFillColor(241, 90, 35);
            doc.setDrawColor(241, 90, 35);
            doc.rect(15, yPos, 180, 8, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(12);
            doc.text(`Order #${index + 1}`, 20, yPos + 6);
            yPos += 15;

            // Order Details
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(10);
            
            const details = [
                [`Order ID: ${order.id}`, `Time: ${order.orderTime || getFormattedTime(order.timestamp)}`],
                [`Transaction ID: ${order.transactionId || 'N/A'}`, `Status: ${order.status}`],
                [`Customer: ${order.customerName}`, `Phone: ${order.phoneNumber}`],
                [`Payment Status: ${order.paymentStatus}`, `Total Amount: Rs. ${order.totalAmount}`]
            ];

            details.forEach(([left, right]) => {
                doc.text(left, 20, yPos);
                doc.text(right, 120, yPos);
                yPos += 6;
            });

            yPos += 5;

            // Items Table
            doc.autoTable({
                startY: yPos,
                head: [['Item', 'Quantity', 'Price (Rs.)', 'Instructions']],
                body: order.items.map(item => [
                    item.name,
                    item.quantity,
                    `${item.price || 0}`,
                    item.instructions || 'No special instructions'
                ]),
                styles: { fontSize: 9, cellPadding: 2 },
                headStyles: {
                    fillColor: [241, 90, 35],
                    textColor: [255, 255, 255],
                    fontStyle: 'bold'
                },
                columnStyles: {
                    0: { cellWidth: 50 },
                    1: { cellWidth: 20 },
                    2: { cellWidth: 30 },
                    3: { cellWidth: 80 }
                },
                margin: { left: 20 },
                theme: 'grid'
            });

            yPos = doc.lastAutoTable.finalY + 20; // Update yPos after table
        });

        // Save the PDF
        doc.save(`BPIT_Canteen_Orders_${new Date().toLocaleDateString()}.pdf`);
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-2 sm:p-4 md:p-6 lg:p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen"
        >
            <motion.h1 
                className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6 lg:mb-8 text-gray-800"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
            >
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div>
                        <span className='text-orange-500'>BPIT CANTEEN</span>  
                        <span className='text-black text-lg sm:text-xl md:text-2xl'> Dashboard</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mt-2 sm:mt-0 w-full sm:w-auto">
                        {vendorName && (
                            <div className="text-base text-gray-700 flex items-center gap-2 mb-2 sm:mb-0">
                                <FaUser className="text-orange-500" />
                                <span className="font-medium">{vendorName}</span>
                                <div className="flex items-center gap-1.5 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                                    <motion.div 
                                        variants={pulseAnimation}
                                        animate="animate"
                                        className="w-2 h-2 rounded-full bg-green-500"
                                    />
                                    <span className="text-green-700 text-xs font-medium">LIVE</span>
                                </div>
                            </div>
                        )}
                        <div className="flex gap-2 w-full sm:w-auto">
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={downloadPDF}
                                className="flex-1 sm:flex-none bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium shadow-sm transition-colors duration-200 flex items-center justify-center gap-1 sm:gap-2"
                            >
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="h-3 w-3 sm:h-4 sm:w-4" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                                    />
                                </svg>
                                <span className="whitespace-nowrap">Download Report</span>
                            </motion.button>
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={handleClearAllOrders}
                                className="flex-1 sm:flex-none bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium shadow-sm transition-colors duration-200"
                            >
                                Clear All Orders
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.h1>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
                </div>
            ) : (
                <>
                    {orders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                            <FaShoppingCart className="text-6xl mb-4 text-gray-300" />
                            <p className="text-xl font-medium">No Orders Yet</p>
                            <p className="text-sm mt-2">New orders will appear here</p>
                        </div>
                    ) : (
                        <>
                            {/* Mobile View - Card Layout */}
                            <div className="lg:hidden space-y-4">
                                <AnimatePresence>
                                    {orders.map((order) => (
                                        <motion.div 
                                            key={order.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="bg-white rounded-lg shadow-md p-4 sm:p-6"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <div className="font-medium text-sm text-gray-500">Order ID</div>
                                                    <div className="font-bold break-all">
                                                        {order.id}
                                                    </div>
                                                    {order.transactionId && (
                                                        <div className="mt-1">
                                                            <div className="font-medium text-sm text-gray-500">Transaction ID</div>
                                                            <div className="text-sm text-gray-700 break-all">
                                                                {order.transactionId}
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="mt-1">
                                                        <div className="font-medium text-sm text-gray-500">Order Time</div>
                                                        <div className="text-sm text-gray-700 group relative cursor-help">
                                                            {order.orderTime || getFormattedTime(order.timestamp)}
                                                            <div className="invisible group-hover:visible absolute z-10 bg-gray-900 text-white text-sm rounded-md py-1 px-2 -mt-1 
                                                                whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                                {order.orderTime || new Date(order.timestamp).toLocaleString()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium
                                                    ${order.status === 'prepared' ? 'bg-green-100 text-green-800' : 
                                                      order.status === 'Received' ? 'bg-yellow-100 text-yellow-800' :
                                                      'bg-blue-100 text-blue-800'}`}>
                                                    {order.status}
                                                </span>
                                            </div>

                                            <div className="space-y-4 sm:space-y-5">
                                                <div className="flex items-center gap-2">
                                                    <FaUser className="text-gray-400" />
                                                    <span className="font-medium">{order.customerName}</span>
                                                </div>
                                                
                                                <div className="flex items-center gap-2">
                                                    <FaPhone className="text-gray-400" />
                                                    <span className="group relative cursor-help">
                                                        {order.phoneNumber.slice(0, 5)}***
                                                        <div className="invisible group-hover:visible absolute z-10 bg-gray-900 text-white text-sm rounded-md py-1 px-2 -mt-1 
                                                            whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                            {order.phoneNumber}
                                                        </div>
                                                    </span>
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
                                                            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-md text-xs sm:text-sm font-medium shadow-sm"
                                                        >
                                                            Received
                                                        </motion.button>
                                                    )}
                                                    {order.status === 'Received' && (
                                                        <motion.button
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => handlePreparedOrder(order.id)}
                                                            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-md text-xs sm:text-sm font-medium shadow-sm"
                                                        >
                                                            Prepared
                                                        </motion.button>
                                                    )}
                                                    {order.status === 'prepared' && (
                                                        <motion.button
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => handleDeleteOrder(order.id)}
                                                            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-2 rounded-md text-xs sm:text-sm font-medium shadow-sm flex items-center justify-center gap-1 sm:gap-2"
                                                        >
                                                            <svg 
                                                                xmlns="http://www.w3.org/2000/svg" 
                                                                className="h-3 w-3 sm:h-4 sm:w-4" 
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
                            <div className="hidden lg:block rounded-lg shadow-lg overflow-hidden bg-white">
                                <div className="overflow-x-auto">
                                    <table className="w-full table-fixed min-w-[900px]">
                                        <thead>
                                            <tr className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                                                <th className="px-2 py-4 text-left w-20">Order ID</th>
                                                <th className="px-2 py-4 text-left w-24">Transaction ID</th>
                                                <th className="px-2 py-4 text-left w-20">Time</th>
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
                                                        <td className="px-2 py-4 border-b group relative">
                                                            {order.transactionId ? (
                                                                <span className="cursor-help">
                                                                    {order.transactionId.substring(0, 5)}...
                                                                    <div className="invisible group-hover:visible absolute z-10 bg-gray-900 text-white text-sm rounded-md py-1 px-2 -mt-1 
                                                                        whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                                        {order.transactionId}
                                                                    </div>
                                                                </span>
                                                            ) : (
                                                                <span className="text-gray-400 italic">N/A</span>
                                                            )}
                                                        </td>
                                                        <td className="px-2 py-4 border-b">
                                                            <span className="text-gray-700 group relative cursor-help">
                                                                {order.orderTime || getFormattedTime(order.timestamp)}
                                                                <div className="invisible group-hover:visible absolute z-10 bg-gray-900 text-white text-sm rounded-md py-1 px-2 -mt-1 
                                                                    whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 left-0">
                                                                    {order.orderTime || new Date(order.timestamp).toLocaleString()}
                                                                </div>
                                                            </span>
                                                        </td>
                                                        <td className="px-2 py-4 border-b font-medium">{order.customerName}</td>
                                                        <td className="px-2 py-4 border-b">
                                                            <span className="group relative cursor-help">
                                                                {order.phoneNumber.slice(0, 5)}***
                                                                <div className="invisible group-hover:visible absolute z-10 bg-gray-900 text-white text-sm rounded-md py-1 px-2 -mt-1 
                                                                    whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                                    {order.phoneNumber}
                                                                </div>
                                                            </span>
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
                            </div>
                        </>
                    )}
                </>
            )}
        </motion.div>
    );
}

export default VendorDashboard;
