import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import payfastRoutes from "./routes/payfastRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ PayFast route
app.use("/api/payfast", payfastRoutes);

// ✅ Serve React frontend in production
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const buildPath = path.join(__dirname, "../client/build");

app.use(express.static(buildPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// ✅ Start server
const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

