import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { prisma } from "./config/db";
import { logger } from "./utils/logger";

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  logger.info(`
====================================
🚀 Business Management System API
⚡ Powered by Shigosag
🌐 Server listening on port ${PORT}
⚙️  Environment: ${process.env.NODE_ENV || "development"}
====================================
  `);
});

const gracefulShutdown = async (signal: string) => {
  logger.info(`Received ${signal}. Initiating graceful shutdown...`);
  server.close(async () => {
    logger.info("HTTP server closed.");
    try {
      await prisma.$disconnect();
      logger.info("Database connection closed.");
      process.exit(0);
    } catch (err) {
      logger.error("Error during database disconnection:", err);
      process.exit(1);
    }
  });
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
