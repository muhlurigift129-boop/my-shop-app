const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Replace with your actual PayFast merchant details
const PAYFAST_MERCHANT_ID = 'YOUR_MERCHANT_ID';
const PAYFAST_MERCHANT_KEY = 'YOUR_MERCHANT_KEY';

// URLs
const RETURN_URL = 'http://localhost:3000/success';
const CANCEL_URL = 'http://localhost:3000/cancel';
const NOTIFY_URL = 'http://localhost:5000/notify';

// Store payments in memory
let paymentsLog = [];

// Endpoint to create PayFast payment URL
app.post('/pay', (req, res) => {
  const { amount, item_name } = req.body;
  if (!amount || !item_name) {
    return res.status(400).json({ error: 'Amount and item_name are required' });
  }

  const data = {
    merchant_id: PAYFAST_MERCHANT_ID,
    merchant_key: PAYFAST_MERCHANT_KEY,
    return_url: RETURN_URL,
    cancel_url: CANCEL_URL,
    notify_url: NOTIFY_URL,
    amount,
    item_name
  };

  const queryString = new URLSearchParams(data).toString();
  res.json({ url: `https://sandbox.payfast.co.za/eng/process?${queryString}` });
});

// PayFast IPN (Instant Payment Notification)
app.post('/notify', (req, res) => {
  const payment = req.body;
  paymentsLog.push(payment);
  console.log('✅ New payment received:', payment);

  res.send('OK');
});

// Optional: endpoint to view logged payments
app.get('/payments', (req, res) => res.json(paymentsLog));

// Serve React frontend
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

