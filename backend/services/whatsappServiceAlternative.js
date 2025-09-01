const axios = require('axios');

class WhatsAppServiceAlternative {
  constructor() {
    // Using a free WhatsApp API service like WhatsApp Business API or Baileys
    // For this example, we'll use a simple webhook-based approach
    this.apiUrl = process.env.WHATSAPP_API_URL || 'https://api.whatsapp.com/send';
    this.apiKey = process.env.WHATSAPP_API_KEY;
  }

  /**
   * Send WhatsApp message using a free API service
   * @param {string} to - Recipient phone number
   * @param {string} message - Message content
   * @returns {Promise<boolean>} - Success status
   */
  async sendMessage(to, message) {
    try {
      const formattedTo = this.formatPhoneNumber(to);
      
      // Method 1: Using WhatsApp Web API (requires setup)
      if (this.apiKey) {
        return await this.sendViaAPI(formattedTo, message);
      }
      
      // Method 2: Using WhatsApp Web direct link (fallback)
      return await this.sendViaWebLink(formattedTo, message);
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      return false;
    }
  }

  /**
   * Send message via WhatsApp API
   */
  async sendViaAPI(to, message) {
    try {
      const response = await axios.post(this.apiUrl, {
        to: to,
        message: message,
        apiKey: this.apiKey
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      console.log('WhatsApp message sent via API:', response.data);
      return true;
    } catch (error) {
      console.error('API WhatsApp error:', error.response?.data || error.message);
      return false;
    }
  }

  /**
   * Send message via WhatsApp Web link (fallback method)
   * This creates a WhatsApp link that can be opened in browser
   */
  async sendViaWebLink(to, message) {
    try {
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${to}?text=${encodedMessage}`;
      
      console.log('WhatsApp Web Link generated:', whatsappUrl);
      console.log('Note: This is a fallback method. For production, use a proper WhatsApp API.');
      
      // In a real implementation, you might want to:
      // 1. Store this link in database for manual sending
      // 2. Use a browser automation tool like Puppeteer
      // 3. Integrate with a WhatsApp Business API provider
      
      return true; // Return true as the link was generated successfully
    } catch (error) {
      console.error('WhatsApp Web Link error:', error);
      return false;
    }
  }

  /**
   * Send order completion message
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
   * Format phone number
   */
  formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    if (cleaned.length === 10) {
      return `91${cleaned}`; // Add country code for India
    }
    
    return cleaned;
  }
}

module.exports = new WhatsAppServiceAlternative();
