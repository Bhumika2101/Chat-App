import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import { app, server } from "./socket/socket.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

// --------------------
// Load environment variables FIRST
dotenv.config();

// Now you can safely access process.env
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

// --------------------
// Middleware
// CORS configuration - allow frontend to make requests
const allowedOrigins = [
  "http://localhost:5173",
  "https://realsync-eight.vercel.app",
  "https://realchat-seven.vercel.app",
  "https://realsync.developerverse.tech",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

// --------------------
// Routes
// Health check endpoint for frontend connection verification
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Backend is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// --------------------
// Serve frontend (only in production if frontend is built)
if (process.env.NODE_ENV === "production") {
  const frontendDistPath = path.join(__dirname, "frontend", "dist");

  // Check if frontend dist folder exists
  import("fs").then((fs) => {
    if (fs.existsSync(frontendDistPath)) {
      app.use(express.static(frontendDistPath));
      app.get("*", (req, res) => {
        res.sendFile(path.join(frontendDistPath, "index.html"));
      });
    }
  });
}

// --------------------
// Start server AND connect to MongoDB
server.listen(PORT, async () => {
  await connectToMongoDB();
  console.log(`Server listening on http://localhost:${PORT}`);
});
