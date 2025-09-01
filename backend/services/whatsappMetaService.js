const axios = require('axios');

class WhatsAppMetaService {
  constructor() {
    // WhatsApp Cloud API by Meta configuration
    this.accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
    this.phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    this.verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;
    this.baseUrl = `https://graph.facebook.com/v18.0/${this.phoneNumberId}/messages`;
  }

  /**
   * Send WhatsApp message using Meta's WhatsApp Cloud API
   * @param {string} to - Recipient phone number (with country code, e.g., 91xxxxxxxxxx)
   * @param {string} message - Message content
   * @returns {Promise<boolean>} - Success status
   */
  async sendMessage(to, message) {
    try {
      if (!this.accessToken || !this.phoneNumberId) {
        console.error('WhatsApp Meta API credentials not configured');
        return false;
      }

      const formattedTo = this.formatPhoneNumber(to);
      
      const payload = {
        messaging_product: "whatsapp",
        to: formattedTo,
        type: "text",
        text: {
          body: message
        }
      };

      const response = await axios.post(this.baseUrl, payload, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        console.log('WhatsApp message sent successfully via Meta API:', response.data);
        return true;
      } else {
        console.error('Failed to send WhatsApp message:', response.data);
        return false;
      }
    } catch (error) {
      console.error('Error sending WhatsApp message via Meta API:', error.response?.data || error.message);
      return false;
    }
  }

  /**
   * Send order completion message with rich formatting
   * @param {Object} order - Order object
   * @returns {Promise<boolean>} - Success status
   */
  async sendOrderCompletionMessage(order) {
    try {
      const { phoneNumber, items, totalAmount, _id, user } = order;
      
      if (!phoneNumber) {
        console.log('No phone number provided for order:', _id);
        return false;
      }

      const itemsList = items.map(item => 
        `• ${item.name} x${item.quantity} - ₹${item.price * item.quantity}`
      ).join('\n');

      const customerName = user?.name || 'Valued Customer';

      const message = `🎉 *Order Completed Successfully!*

Hello ${customerName},

Your order has been completed and is ready for pickup!

*📋 Order Details:*
*Order ID:* ${_id}
*Total Amount:* ₹${totalAmount}

*🍽️ Your Order:*
${itemsList}

*📍 Pickup Location:* BPIT Canteen
*⏰ Canteen Hours:* 9:00 AM - 5:00 PM

Thank you for choosing BPIT Canteen! We hope you enjoy your meal.

For any queries, please contact us at the canteen counter.

---
*BPIT Canteen Team*`;

      return await this.sendMessage(phoneNumber, message);
    } catch (error) {
      console.error('Error sending order completion message:', error);
      return false;
    }
  }

  /**
   * Send order confirmation message (when order is placed)
   * @param {Object} order - Order object
   * @returns {Promise<boolean>} - Success status
   */
  async sendOrderConfirmationMessage(order) {
    try {
      const { phoneNumber, items, totalAmount, _id, user } = order;
      
      if (!phoneNumber) {
        console.log('No phone number provided for order:', _id);
        return false;
      }

      const customerName = user?.name || 'Valued Customer';
      const itemsList = items.map(item => 
        `• ${item.name} x${item.quantity} - ₹${item.price * item.quantity}`
      ).join('\n');

      const message = `✅ *Order Confirmed!*

Hello ${customerName},

Your order has been received and is being prepared.

*📋 Order Details:*
*Order ID:* ${_id}
*Total Amount:* ₹${totalAmount}

*🍽️ Your Order:*
${itemsList}

*⏱️ Estimated Preparation Time:* 15-20 minutes

We'll notify you once your order is ready for pickup.

Thank you for choosing BPIT Canteen!

---
*BPIT Canteen Team*`;

      return await this.sendMessage(phoneNumber, message);
    } catch (error) {
      console.error('Error sending order confirmation message:', error);
      return false;
    }
  }

  /**
   * Format phone number for WhatsApp API
   * @param {string} phoneNumber - Phone number
   * @returns {string} - Formatted phone number
   */
  formatPhoneNumber(phoneNumber) {
    // Remove any non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // If it's a 10-digit Indian number, add 91
    if (cleaned.length === 10) {
      return `91${cleaned}`;
    }
    
    // If it already has country code, return as is
    if (cleaned.length > 10) {
      return cleaned;
    }
    
    return cleaned;
  }

  /**
   * Verify webhook for WhatsApp Cloud API
   * @param {string} mode - Verification mode
   * @param {string} token - Verification token
   * @param {string} challenge - Challenge string
   * @returns {string|null} - Challenge if verified, null otherwise
   */
  verifyWebhook(mode, token, challenge) {
    if (mode === 'subscribe' && token === this.verifyToken) {
      console.log('WhatsApp webhook verified successfully');
      return challenge;
    }
    return null;
  }

  /**
   * Test WhatsApp service
   * @param {string} testPhoneNumber - Test phone number
   * @returns {Promise<boolean>} - Success status
   */
  async testService(testPhoneNumber = '9999999999') {
    try {
      const testMessage = `🧪 *WhatsApp Service Test*

Hello! This is a test message from BPIT Canteen WhatsApp service.

If you receive this message, the WhatsApp integration is working correctly.

*Test Details:*
• Service: WhatsApp Cloud API by Meta
• Timestamp: ${new Date().toLocaleString()}
• Status: ✅ Active

Thank you for testing our service!

---
*BPIT Canteen Team*`;

      console.log('Testing WhatsApp Meta API service...');
      const result = await this.sendMessage(testPhoneNumber, testMessage);
      
      if (result) {
        console.log('✅ WhatsApp Meta API service test successful');
      } else {
        console.log('❌ WhatsApp Meta API service test failed');
      }
      
      return result;
    } catch (error) {
      console.error('WhatsApp Meta API service test error:', error);
      return false;
    }
  }

  /**
   * Get message status
   * @param {string} messageId - Message ID
   * @returns {Promise<Object|null>} - Message status
   */
  async getMessageStatus(messageId) {
    try {
      const response = await axios.get(
        `https://graph.facebook.com/v18.0/${messageId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error getting message status:', error);
      return null;
    }
  }
}

module.exports = new WhatsAppMetaService();
