import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.mjs";
import adminRoutes from "./routes/adminRoutes.mjs";
import exhibitorRoutes from "./routes/exhibitorRoutes.mjs";
import attendeeRoutes from "./routes/attendeeRoutes.mjs";
import expoRoutes from "./routes/expoRoutes.mjs";
import authRoutes from "./routes/authRoutes.mjs";


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/exhibitors", exhibitorRoutes);
app.use("/api/attendees", attendeeRoutes);
app.use("/api/expos", expoRoutes);
app.use("/api", authRoutes); 


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));