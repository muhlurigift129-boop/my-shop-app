import express from "express";
import crypto from "crypto";
import axios from "axios";

const router = express.Router();

// ⚙️ PayFast credentials
const merchantId = process.env.PAYFAST_MERCHANT_ID;
const merchantKey = process.env.PAYFAST_MERCHANT_KEY;
const passphrase = process.env.PAYFAST_PASSPHRASE;

// ✅ Handle PayFast Notify (ITN)
router.post("/notify", async (req, res) => {
  try {
    const data = req.body;

    console.log("🔔 PayFast Notification Received:");
    console.log(data);

    // 1️⃣ Build signature string
    const paramString = Object.keys(data)
      .filter(key => key !== "signature")
      .sort()
      .map(key => `${key}=${encodeURIComponent(data[key]).replace(/%20/g, "+")}`)
      .join("&");

    const checkString = passphrase ? `${paramString}&passphrase=${encodeURIComponent(passphrase).replace(/%20/g, "+")}` : paramString;

    // 2️⃣ Compute signature
    const signature = crypto.createHash("md5").update(checkString).digest("hex");

    if (signature !== data.signature) {
      console.log("❌ Invalid signature");
      return res.status(400).send("Invalid signature");
    }

    // 3️⃣ Verify with PayFast server (optional but recommended)
    const validateUrl = `https://www.payfast.co.za/eng/query/validate`;
    const params = new URLSearchParams(data);
    const response = await axios.post(validateUrl, params.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    console.log("✅ PayFast Validation Response:", response.data);

    // 4️⃣ If payment was successful
    if (data.payment_status === "COMPLETE") {
      console.log("💰 Payment Complete!");
      // You can save to DB, send receipt email, etc.
    }

    return res.status(200).send("OK");
  } catch (err) {
    console.error("⚠️ Error handling PayFast notification:", err.message);
    res.status(500).send("Server Error");
  }
});

export default router;

