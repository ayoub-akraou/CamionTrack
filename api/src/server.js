import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import vehiclesRoutes from "./routes/vehicles.routes.js";
import tripsRoutes from "./routes/trips.routes.js";
import configRoutes from "./routes/configuration.routes.js";

dotenv.config();

const app = express();

// connect to db
connectDB();

app.use(express.json());
app.use(cors());
app.use(helmet());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehiclesRoutes);
app.use("/api/trips", tripsRoutes);
app.use("/api/config", configRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
