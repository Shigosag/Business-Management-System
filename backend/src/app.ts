import express from "express";
import path from "path";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import customerRoutes from "./routes/customer.routes";
import authRoutes from "./routes/auth.routes";
import analyticsRoutes from "./routes/analytics.routes";
import { errorHandler } from "./middleware/errorHandler";
import { logger } from "./utils/logger";

const app = express();

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// Allowed domains: Vercel, Faable, and local development
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
  : [
      "https://business-management-system-theta.vercel.app",
      "https://business-management-system-9x3fk.faable.link",
      "http://localhost:5173",
      "http://localhost:5000",
    ];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server requests, mobile/curl, or matching domains
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Blocked by CORS policy"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

const morganStream = {
  write: (message: string) => {
    logger.http(message.trim());
  },
};
app.use(morgan("combined", { stream: morganStream }));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", apiLimiter);

// API Health Check
app.get("/api/health", (_, res) => {
  res.json({
    app: "Business Management System",
    author: "Shigosag",
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/analytics", analyticsRoutes);

// --- SERVE FRONTEND (React SPA) ---
const frontendDistPath = path.join(__dirname, "../../frontend/dist");

app.use(express.static(frontendDistPath));

// Express 5 catch-all syntax: '{*splat}' instead of '*'
app.get("/{*splat}", (req, res, next) => {
  if (req.path.startsWith("/api")) {
    res.status(404).json({
      status: "fail",
      message: `API endpoint ${req.method} ${req.originalUrl} not found.`,
    });
    return;
  }
  res.sendFile(path.join(frontendDistPath, "index.html"), (err) => {
    if (err) next(err);
  });
});

app.use(errorHandler);

export default app;
