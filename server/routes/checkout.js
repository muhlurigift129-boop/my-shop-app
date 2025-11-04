import express from "express";
import axios from "axios";
import jwt from "jsonwebtoken";

const router = express.Router();

// PayFast sandbox URL (for testing)
const PAYFAST_URL = "https://sandbox.payfast.co.za/eng/process";
const MERCHANT_ID = "10043359"; // replace with your real one
const MERCHANT_KEY = "6gu0dx1r5742n";
const RETURN_URL = "https://mgs-traders-client.onrender.com/success";
const CANCEL_URL = "https://mgs-traders-client.onrender.com/cancel";
const NOTIFY_URL = "https://mgs-traders-h8np.onrender.com/api/payfast/notify";

// Middleware to check if user is logged in
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    req.user = jwt.verify(token, "mgs-secret-key");
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Checkout route
router.post("/", verifyToken, async (req, res) => {
  const { items, total, deliveryOption, address } = req.body;

  // Calculate delivery fee
  let deliveryFee = 0;
  if (deliveryOption === "Delivery" && total < 600) deliveryFee = 50;

  const finalTotal = total + deliveryFee;

  const payfastForm = {
    merchant_id: MERCHANT_ID,
    merchant_key: MERCHANT_KEY,
    return_url: RETURN_URL,
    cancel_url: CANCEL_URL,
    notify_url: NOTIFY_URL,
    name_first: req.user.email,
    email_address: req.user.email,
    m_payment_id: "MGS-" + Date.now(),
    amount: finalTotal.toFixed(2),
    item_name: "Order from MGS Store",
  };

  res.json({ payfastForm, PAYFAST_URL });
});

export default router;
