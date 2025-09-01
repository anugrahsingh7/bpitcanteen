# WhatsApp Cloud API Setup Guide for BPIT Canteen

This guide will help you set up WhatsApp Cloud API by Meta to send automated messages for order confirmations and completions.

## Prerequisites

- A Facebook Developer Account
- A WhatsApp Business Account
- A phone number for WhatsApp Business (can be your personal number for testing)

## Step 1: Create a Facebook Developer Account

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "Get Started" and log in with your Facebook account
3. Complete the developer account setup

## Step 2: Create a WhatsApp Business App

1. In the Facebook Developer Console, click "Create App"
2. Select "Business" as the app type
3. Fill in the required information:
   - App Name: "BPIT Canteen WhatsApp"
   - App Contact Email: Your email
   - Business Account: Create new or select existing

## Step 3: Add WhatsApp Product

1. In your app dashboard, click "Add Product"
2. Find "WhatsApp" and click "Set up"
3. You'll see the WhatsApp Business API setup page

## Step 4: Configure WhatsApp Business Account

1. **Add Phone Number:**
   - Click "Add phone number"
   - Enter your phone number (this will be your WhatsApp Business number)
   - Verify the number via SMS/call

2. **Get Access Token:**
   - In the WhatsApp section, find "Access tokens"
   - Click "Generate token"
   - Copy the access token (you'll need this for `WHATSAPP_ACCESS_TOKEN`)

3. **Get Phone Number ID:**
   - In the WhatsApp section, find "Phone number ID"
   - Copy this ID (you'll need this for `WHATSAPP_PHONE_NUMBER_ID`)

## Step 5: Set Up Webhook (Optional but Recommended)

1. **Create Webhook URL:**
   - Your webhook URL will be: `https://yourdomain.com/api/whatsapp/webhook`
   - For local testing, use ngrok: `https://your-ngrok-url.ngrok.io/api/whatsapp/webhook`

2. **Configure Webhook:**
   - In WhatsApp settings, find "Webhook"
   - Enter your webhook URL
   - Set verify token (create a random string for `WHATSAPP_VERIFY_TOKEN`)
   - Subscribe to `messages` events

3. **Test Webhook:**
   - Click "Verify and save"
   - If successful, you'll see a green checkmark

## Step 6: Configure Environment Variables

Update your `backend/config.env` file with the following values:

```env
# WhatsApp Cloud API by Meta Configuration
WHATSAPP_ACCESS_TOKEN=your_access_token_from_step_4
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id_from_step_4
WHATSAPP_VERIFY_TOKEN=your_random_verify_token
```

## Step 7: Test the Integration

### Method 1: Using the Test Endpoint

Send a POST request to test the WhatsApp service:

```bash
curl -X POST http://localhost:3000/api/order/test-whatsapp \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "919999999999",
    "message": "Test message from BPIT Canteen"
  }'
```

### Method 2: Place a Test Order

1. Go to your canteen app
2. Add items to cart
3. Enter a valid phone number
4. Complete the order
5. Check if you receive WhatsApp messages

## Step 8: Message Templates (For Production)

For production use, you need to create message templates:

1. **Go to WhatsApp Manager:**
   - Visit [WhatsApp Manager](https://business.whatsapp.com/)
   - Select your business account

2. **Create Message Templates:**
   - Go to "Message templates"
   - Click "Create template"
   - Create templates for:
     - Order confirmation
     - Order completion
     - Order status updates

3. **Approve Templates:**
   - Submit templates for Meta approval
   - Wait for approval (usually 24-48 hours)

## Step 9: Production Deployment

### For Vercel/Netlify:

1. **Set Environment Variables:**
   - Add the WhatsApp credentials to your hosting platform's environment variables
   - Make sure to use production values

2. **Update Webhook URL:**
   - Update webhook URL to your production domain
   - Test webhook verification

### For VPS/Server:

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Set Environment Variables:**
   ```bash
   export WHATSAPP_ACCESS_TOKEN=your_token
   export WHATSAPP_PHONE_NUMBER_ID=your_id
   export WHATSAPP_VERIFY_TOKEN=your_token
   ```

3. **Start Server:**
   ```bash
   npm start
   ```

## Troubleshooting

### Common Issues:

1. **"Invalid access token" error:**
   - Regenerate access token in Facebook Developer Console
   - Make sure token has WhatsApp permissions

2. **"Phone number not found" error:**
   - Verify phone number is added to WhatsApp Business Account
   - Check phone number format (should include country code)

3. **Webhook verification fails:**
   - Check if webhook URL is accessible
   - Verify the verify token matches in both places
   - Make sure server is running

4. **Messages not sending:**
   - Check if phone number is verified
   - Ensure you're not sending to unverified numbers (for new accounts)
   - Check rate limits

### Rate Limits:

- **Free Tier:** 1,000 messages per month
- **Paid Tier:** Higher limits available
- **Rate:** 80 messages per second

## Message Flow

1. **Order Placed:** Customer places order → WhatsApp confirmation sent
2. **Order Completed:** Vendor marks order complete → WhatsApp completion message sent
3. **Customer Queries:** Customer can message your WhatsApp number for support

## Security Notes

- Keep your access token secure
- Use environment variables for all credentials
- Regularly rotate access tokens
- Monitor webhook logs for suspicious activity

## Support

- [WhatsApp Business API Documentation](https://developers.facebook.com/docs/whatsapp)
- [Meta Business Help Center](https://www.facebook.com/business/help)
- [WhatsApp Business API Status](https://status.fb.com/)

## Cost Information

- **Free Tier:** 1,000 messages per month
- **Paid Plans:** Start from $0.005 per message
- **No setup fees** for WhatsApp Cloud API

---

**Note:** This setup uses the official WhatsApp Cloud API by Meta, which is the most reliable and cost-effective solution for sending WhatsApp messages programmatically.
