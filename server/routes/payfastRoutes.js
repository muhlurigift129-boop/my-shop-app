import express from "express";
import crypto from "crypto";
import axios from "axios";

const router = express.Router();

// ⚙️ PayFast credentials (from .env or hardcoded for testing)
const PAYFAST_MERCHANT_ID = process.env.PAYFAST_MERCHANT_ID || "10043359";
const PAYFAST_MERCHANT_KEY = process.env.PAYFAST_MERCHANT_KEY || "6gu0dx1r5742n";
const PAYFAST_PASS_PHRASE = process.env.PAYFAST_PASS_PHRASE || "MGS. Traders2025";

// ✅ Handle PayFast Notify (ITN)
router.post("/notify", async (req, res) => {
  try {
    const data = req.body;

    console.log("🔔 PayFast Notification Received:", data);

    // 1️⃣ Build signature string
    const paramString = Object.keys(data)
      .filter((key) => key !== "signature")
      .sort()
      .map(
        (key) =>
          `${key}=${encodeURIComponent(data[key])
            .replace(/%20/g, "+")
            .replace(/%2F/g, "/")}`
      )
      .join("&");

    const checkString = PAYFAST_PASS_PHRASE
      ? `${paramString}&passphrase=${PAYFAST_PASS_PHRASE}`
      : paramString;

    // 2️⃣ Compute signature
    const signature = crypto
      .createHash("md5")
      .update(checkString)
      .digest("hex");

    if (signature !== data.signature) {
      console.log("❌ Invalid signature");
      return res.status(400).send("Invalid signature");
    }

    // 3️⃣ Verify with PayFast server (optional)
    const validateUrl = `https://www.payfast.co.za/eng/query/validate`;
    const params = new URLSearchParams(data);
    const response = await axios.post(validateUrl, params.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    console.log("✅ PayFast Validation Response:", response.data);

    // 4️⃣ If payment was successful
    if (data.payment_status === "COMPLETE") {
      console.log("💰 Payment Complete!");
      // TODO: save to database, send confirmation, etc.
    }

    return res.status(200).send("OK");
  } catch (err) {
    console.error("⚠️ Error handling PayFast notification:", err.message);
    return res.status(500).send("Server Error");
  }
});

export default router;
