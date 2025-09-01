const express = require('express');
const router = express.Router();
const whatsappWebhookController = require('../controllers/whatsappWebhookController');

// WhatsApp webhook routes
router.get('/webhook', whatsappWebhookController.verifyWebhook);
router.post('/webhook', whatsappWebhookController.handleWebhook);

module.exports = router;
