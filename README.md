# 🏢 Business Management System

[![TypeScript](https://img.shields.io/badge/typescript-5.x-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)  
[![Neon](https://img.shields.io/badge/Neon-Serverless%20Postgres-00E599)](https://neon.tech/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A modern, professional, scalable, and production-inspired Business Management System built with React, TypeScript, Vite, Express, Prisma, and PostgreSQL.

**🚀 Powered by Shigosag**

![BMS Dashboard](Screenshots/dashboard_light.png)
![BMS Dashboard](Screenshots/dashboard_light2.png)

### 🎥 System Walkthrough & Demo

<div align="center">
  <video src="https://github.com/user-attachments/assets/4f2b9343-20fd-4a60-b78f-5a94bee6185a" width="100%" controls></video>
</div>

**Timestamps:**
- **0:00** - Executable Launch & Authentication
- **0:17** - Nexus Command Center (Analytics)
- **0:42** - Sales & Inventory Modules
- **0:53** - HR & CRM Modules
- **1:03** - Finance & Settings
- **1:15** - GitHub Repository Overview
  
---

## ✨ Features

- 🖥️ Modern dashboard UI
- 👥 Customer management
- 🔗 REST API backend
- 🗄️ PostgreSQL database
- ⚡ Prisma ORM
- 📱 Responsive design
- 🌙 Dark mode support
- 📊 Dashboard analytics cards
- ✏️ Customer CRUD foundation
- 🔒 Secure API architecture
- 📝 TypeScript throughout
- 🗂️ Modular folder structure
- 🏭 Production-ready code organization
- 🎨 Portfolio/demo friendly

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ React 19
- 📝 TypeScript
- ⚡ Vite
- 🌐 React Router DOM
- 📡 Axios
- 🧩 Zustand
- 🎨 Tailwind CSS CDN

### Backend
- 🟢 Node.js
- 🚀 Express 5
- 📝 TypeScript
- ⚡ Prisma ORM
- 🗄️ PostgreSQL
- 🔐 Zod Validation
- 🛡️ Helmet
- 🌐 CORS
- 📋 Morgan
- ⏱️ Express Rate Limit
- 📜 Winston Logging
- 🔑 JWT Support

---

## 🗄️ Database (Neon PostgreSQL)

This project uses **Neon Serverless PostgreSQL**.

👉 Neon Docs: https://neon.tech

Add your connection string in `backend/.env`:

```text
DATABASE_URL="your_neon_postgres_connection_string"
```

---

## 🗂️ Project Structure

```txt
Business-Management-System/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── index.html
│
├── backend/
│   ├── prisma/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── app.ts
│   │   └── server.ts
│   └── package.json
│
└── README.md
```

----

## 🖼️ Dashboard Preview

| Light Mode Top Section | Dark Mode Top Section |
| :---: | :---: |
| ![Light Mode Dashboard](Screenshots/dashboard_light.png) | ![Dark Mode Dashboard](Screenshots/dashboard_dark.png) |

| Light Mode Bottom Section | Dark Mode Bottom Section |
| :---: | :---: |
| ![Light Mode Dashboard](Screenshots/dashboard_light2.png) | ![Dark Mode Dashboard](Screenshots/dashboard_dark2.png) |

---

## 🚀 Installation

## Prerequisites
- Node.js (v18+)

### Clone Repository

```bash
git clone https://github.com/Shigosag/Business-Management-System.git

cd Business-Management-System
```

---

## Backend Setup

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

Open: http://localhost:5000

## Frontend Setup

```bash
cd frontend
npm install
npm install chart.js react-chartjs-2
npm run dev
```

Open: http://localhost:5173

---

## 🔗 API Example

### Get Customers

```http
GET /api/customers
```

### Create Customer

```http
POST /api/customers
```

---

## 🖼️ Dashboard Mobile Preview

| Light Mode Top Section | Dark Mode Top Section |
| :---: | :---: |
| ![Light Mode Dashboard](Screenshots/dashboard_light_mobile.png) | ![Dark Mode Dashboard](Screenshots/dashboard_dark_mobile.png) |

---

## 🌟 Future Enhancements
- 🔐 Authentication & Authorization
- 🧑‍🤝‍🧑 Role-Based Access Control
- 📦 Products Management
- 📦 Inventory Management
- 🧾 Invoice Management
- 📊 Reports & Analytics
- 📈 Live Dashboard Charts
- 🔔 Notification System
- 📜 Audit Logs
- 📂 File Uploads
- 🏢 Multi-Tenant Architecture
- 🐳 Docker Deployment
- ⚙️ CI/CD Pipelines

---

## 👤 Author & Credits

- **Shigosag**
- Portions of code generated with AI support
---

## 📄 License

MIT License

© 2026 Shigosag

---

**🚀 Powered by Shigosag**
