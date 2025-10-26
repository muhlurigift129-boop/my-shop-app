import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import payfastRoutes from "./routes/payfastRoutes.js";
import authRoutes from "./routes/auth.js";
import checkoutRoutes from "./routes/checkout.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payfast", payfastRoutes);
app.use("/api/checkout", checkoutRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

