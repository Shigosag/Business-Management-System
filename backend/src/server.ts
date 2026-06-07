import dotenv from "dotenv";
dotenv.config();

import app from "./app";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
====================================
🚀 Business Management System API
⚡ Powered by Shigosag
🌐 Running on port ${PORT}
====================================
  `);
});