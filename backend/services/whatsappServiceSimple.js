const axios = require('axios');

class WhatsAppServiceSimple {
  constructor() {
    // Using a simple approach with WhatsApp Web API
    // This service will use a free WhatsApp API provider
    this.webhookUrl = process.env.WHATSAPP_WEBHOOK_URL;
    this.apiKey = process.env.WHATSAPP_SIMPLE_API_KEY;
  }

  /**
   * Send WhatsApp message using a simple free API
   * @param {string} to - Recipient phone number
   * @param {string} message - Message content
   * @returns {Promise<boolean>} - Success status
   */
  async sendMessage(to, message) {
    try {
      const formattedTo = this.formatPhoneNumber(to);
      
      // Try multiple free WhatsApp API services
      const services = [
        () => this.sendViaService1(formattedTo, message),
        () => this.sendViaService2(formattedTo, message),
        () => this.sendViaWebhook(formattedTo, message)
      ];

      for (const service of services) {
        try {
          const result = await service();
          if (result) {
            console.log('WhatsApp message sent successfully');
            return true;
          }
        } catch (error) {
          console.log('Service failed, trying next...');
          continue;
        }
      }

      // If all services fail, log the message for manual sending
      console.log('All WhatsApp services failed. Manual sending required:');
      console.log(`To: ${formattedTo}`);
      console.log(`Message: ${message}`);
      return false;
    } catch (error) {
      console.error('Error in WhatsApp service:', error);
      return false;
    }
  }

  /**
   * Send via free WhatsApp API service 1 (example)
   */
  async sendViaService1(to, message) {
    try {
      // Example: Using a free WhatsApp API service
      const response = await axios.post('https://api.whatsapp.com/send', {
        phone: to,
        text: message
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });

      return response.status === 200;
    } catch (error) {
      throw new Error('Service 1 failed');
    }
  }

  /**
   * Send via free WhatsApp API service 2 (example)
   */
  async sendViaService2(to, message) {
    try {
      // Example: Using another free service
      const response = await axios.get(`https://wa.me/${to}?text=${encodeURIComponent(message)}`);
      return response.status === 200;
    } catch (error) {
      throw new Error('Service 2 failed');
    }
  }

  /**
   * Send via webhook (if configured)
   */
  async sendViaWebhook(to, message) {
    if (!this.webhookUrl) {
      throw new Error('Webhook not configured');
    }

    try {
      const response = await axios.post(this.webhookUrl, {
        to: to,
        message: message,
        apiKey: this.apiKey
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });

      return response.status === 200;
    } catch (error) {
      throw new Error('Webhook failed');
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

  /**
   * Test WhatsApp service
   */
  async testService() {
    try {
      const testMessage = "Test message from BPIT Canteen WhatsApp service";
      const testNumber = "9999999999"; // Replace with a test number
      
      console.log('Testing WhatsApp service...');
      const result = await this.sendMessage(testNumber, testMessage);
      
      if (result) {
        console.log('✅ WhatsApp service test successful');
      } else {
        console.log('❌ WhatsApp service test failed');
      }
      
      return result;
    } catch (error) {
      console.error('WhatsApp service test error:', error);
      return false;
    }
  }
}

module.exports = new WhatsAppServiceSimple();
