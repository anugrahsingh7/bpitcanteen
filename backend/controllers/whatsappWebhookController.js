const whatsappService = require('../services/whatsappMetaService');

/**
 * Handle WhatsApp webhook verification
 */
exports.verifyWebhook = (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  console.log('WhatsApp webhook verification request:', { mode, token, challenge });

  const verified = whatsappService.verifyWebhook(mode, token, challenge);
  
  if (verified) {
    console.log('WhatsApp webhook verified successfully');
    res.status(200).send(challenge);
  } else {
    console.log('WhatsApp webhook verification failed');
    res.status(403).json({ error: 'Verification failed' });
  }
};

/**
 * Handle WhatsApp webhook events (messages, status updates, etc.)
 */
exports.handleWebhook = async (req, res) => {
  try {
    const body = req.body;

    console.log('WhatsApp webhook received:', JSON.stringify(body, null, 2));

    // Check if it's a WhatsApp event
    if (body.object === 'whatsapp_business_account') {
      body.entry?.forEach(entry => {
        entry.changes?.forEach(change => {
          if (change.field === 'messages') {
            const messages = change.value.messages;
            const statuses = change.value.statuses;

            // Handle incoming messages
            if (messages) {
              messages.forEach(message => {
                handleIncomingMessage(message);
              });
            }

            // Handle message status updates
            if (statuses) {
              statuses.forEach(status => {
                handleMessageStatus(status);
              });
            }
          }
        });
      });
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('Error handling WhatsApp webhook:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Handle incoming WhatsApp messages
 */
const handleIncomingMessage = async (message) => {
  try {
    console.log('Incoming WhatsApp message:', message);
    
    const { from, type, text, timestamp } = message;
    
    if (type === 'text' && text) {
      const messageText = text.body.toLowerCase();
      
      // Handle common queries
      if (messageText.includes('menu') || messageText.includes('food')) {
        await sendMenuMessage(from);
      } else if (messageText.includes('hours') || messageText.includes('time')) {
        await sendHoursMessage(from);
      } else if (messageText.includes('order') || messageText.includes('status')) {
        await sendOrderStatusMessage(from);
      } else {
        await sendDefaultMessage(from);
      }
    }
  } catch (error) {
    console.error('Error handling incoming message:', error);
  }
};

/**
 * Handle message status updates
 */
const handleMessageStatus = (status) => {
  try {
    console.log('Message status update:', status);
    
    const { id, status: messageStatus, timestamp, recipient_id } = status;
    
    // Log message delivery status
    switch (messageStatus) {
      case 'sent':
        console.log(`Message ${id} sent to ${recipient_id}`);
        break;
      case 'delivered':
        console.log(`Message ${id} delivered to ${recipient_id}`);
        break;
      case 'read':
        console.log(`Message ${id} read by ${recipient_id}`);
        break;
      case 'failed':
        console.log(`Message ${id} failed to deliver to ${recipient_id}`);
        break;
      default:
        console.log(`Message ${id} status: ${messageStatus}`);
    }
  } catch (error) {
    console.error('Error handling message status:', error);
  }
};

/**
 * Send menu information
 */
const sendMenuMessage = async (to) => {
  const message = `🍽️ *BPIT Canteen Menu*

*🥤 Beverages:*
• Tea, Coffee, Cold Coffee
• Milkshakes (Mango, Vanilla, Strawberry, etc.)
• Nimbu Pani

*🍜 Indian Food:*
• Chole Bhature, Chole Rice
• Kadi Rice, Paneer Rice
• Lunch Plate

*🍝 Chinese:*
• Chowmein, Fried Rice
• Momos (Steam/Fried/Tandoori)
• Manchurian, Spring Roll

*🍞 Snacks:*
• Samosa, Aloo Patties
• Sandwiches, Burgers
• Maggi, Pasta, Macroni

*🍛 South Indian:*
• Dosa (Masala, Onion, Paneer)
• Idli, Vada, Uttapam

*🍰 Desserts:*
• Pastry, Brownie, Muffin

*📍 Location:* BPIT Canteen
*⏰ Hours:* 9:00 AM - 5:00 PM

Order online at our website or visit the canteen counter!`;

  await whatsappService.sendMessage(to, message);
};

/**
 * Send canteen hours
 */
const sendHoursMessage = async (to) => {
  const message = `⏰ *BPIT Canteen Hours*

*Monday - Friday:* 9:00 AM - 5:00 PM
*Saturday:* 9:00 AM - 2:00 PM
*Sunday:* Closed

*📍 Location:* BPIT Campus
*📞 Contact:* Visit canteen counter

We're here to serve you delicious food!`;

  await whatsappService.sendMessage(to, message);
};

/**
 * Send order status information
 */
const sendOrderStatusMessage = async (to) => {
  const message = `📋 *Order Status Information*

To check your order status:

1. Visit our website
2. Go to "Order History"
3. Enter your order ID

*Order Status Types:*
• 🟡 Pending - Order received, being prepared
• 🟢 Completed - Order ready for pickup

*Need Help?*
Visit the canteen counter or contact us through our website.

Thank you for choosing BPIT Canteen!`;

  await whatsappService.sendMessage(to, message);
};

/**
 * Send default response
 */
const sendDefaultMessage = async (to) => {
  const message = `👋 *Welcome to BPIT Canteen!*

I'm here to help you with:

• 📋 Menu information
• ⏰ Canteen hours
• 📦 Order status
• 🍽️ Food recommendations

Just type:
• "menu" for food options
• "hours" for timings
• "order" for order status

Or visit our website to place an order online!

*📍 BPIT Canteen Team*`;

  await whatsappService.sendMessage(to, message);
};
