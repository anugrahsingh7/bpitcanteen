const axios = require('axios');

class WhatsAppService {
  constructor() {
    // Using WhatsApp Business API through Twilio (free tier available)
    this.accountSid = process.env.TWILIO_ACCOUNT_SID;
    this.authToken = process.env.TWILIO_AUTH_TOKEN;
    this.whatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER; // Your Twilio WhatsApp number
    this.baseUrl = `https://api.twilio.com/2010-04-01/Accounts/${this.accountSid}`;
  }

  /**
   * Send WhatsApp message using Twilio WhatsApp Business API
   * @param {string} to - Recipient phone number (with country code, e.g., +91xxxxxxxxxx)
   * @param {string} message - Message content
   * @returns {Promise<boolean>} - Success status
   */
  async sendMessage(to, message) {
    try {
      // Ensure phone number has country code
      const formattedTo = this.formatPhoneNumber(to);
      
      const response = await axios.post(
        `${this.baseUrl}/Messages.json`,
        new URLSearchParams({
          From: `whatsapp:${this.whatsappNumber}`,
          To: `whatsapp:${formattedTo}`,
          Body: message
        }),
        {
          auth: {
            username: this.accountSid,
            password: this.authToken
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      console.log('WhatsApp message sent successfully:', response.data.sid);
      return true;
    } catch (error) {
      console.error('Error sending WhatsApp message:', error.response?.data || error.message);
      return false;
    }
  }

  /**
   * Send order completion message
   * @param {Object} order - Order object
   * @returns {Promise<boolean>} - Success status
   */
  async sendOrderCompletionMessage(order) {
    try {
      const { phoneNumber, items, totalAmount, _id } = order;
      
      if (!phoneNumber) {
        console.log('No phone number provided for order:', _id);
        return false;
      }

      const itemsList = items.map(item => 
        `• ${item.name} x${item.quantity} - ₹${item.price * item.quantity}`
      ).join('\n');

      const message = `🎉 *Order Completed Successfully!*

*Order ID:* ${_id}
*Total Amount:* ₹${totalAmount}

*Your Order:*
${itemsList}

Thank you for choosing BPIT Canteen! Your order is ready for pickup.

📍 *BPIT Canteen*
⏰ *Timing:* 9:00 AM - 5:00 PM

For any queries, contact us at the canteen counter.`;

      return await this.sendMessage(phoneNumber, message);
    } catch (error) {
      console.error('Error sending order completion message:', error);
      return false;
    }
  }

  /**
   * Format phone number to include country code
   * @param {string} phoneNumber - Phone number
   * @returns {string} - Formatted phone number
   */
  formatPhoneNumber(phoneNumber) {
    // Remove any non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // If it's a 10-digit Indian number, add +91
    if (cleaned.length === 10) {
      return `+91${cleaned}`;
    }
    
    // If it already has country code, add + if missing
    if (cleaned.length > 10 && !cleaned.startsWith('+')) {
      return `+${cleaned}`;
    }
    
    return cleaned;
  }

  /**
   * Alternative method using WhatsApp Web API (if Twilio is not preferred)
   * This is a simpler approach but requires more setup
   */
  async sendMessageAlternative(to, message) {
    try {
      // This would require setting up WhatsApp Web API
      // For now, we'll use Twilio as the primary method
      console.log('Alternative WhatsApp method not implemented yet');
      return false;
    } catch (error) {
      console.error('Error in alternative WhatsApp method:', error);
      return false;
    }
  }
}

module.exports = new WhatsAppService();
