import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import customerRoutes from "./routes/customer.routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.get("/", (_, res) => {
  res.json({
    app: "Business Management System",
    author: "Shigosag",
    poweredBy: "Shigosag",
    status: "running",
  });
});

app.use("/api/customers", customerRoutes);

export default app;