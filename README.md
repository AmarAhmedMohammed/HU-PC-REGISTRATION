🌐💻 Haramaya University PC Registration System
🔐 QR & Barcode Scanning • 🎓 Student Device Registry • ⚡ Built with React + Tailwind + Node.js + MySQL
<p align="center"> <img src="https://img.shields.io/badge/React-18.0-61DAFB?style=for-the-badge&logo=react" /> <img src="https://img.shields.io/badge/Vite-Bundler-purple?style=for-the-badge&logo=vite" /> <img src="https://img.shields.io/badge/Node.js-Backend-brightgreen?style=for-the-badge&logo=node.js" /> <img src="https://img.shields.io/badge/Express.js-API-blue?style=for-the-badge&logo=express" /> <img src="https://img.shields.io/badge/MySQL2-Database-orange?style=for-the-badge&logo=mysql" /> <img src="https://img.shields.io/badge/QR--Scanner-html5--qrcode-red?style=for-the-badge&logo=QRcode" /> </p>
🎯 Project Overview

A full-stack system designed for Haramaya University to securely register and track student computers using QR Code and Barcode scanning (from the official student ID card).
The platform ensures fast verification, accurate data storage, and an admin-friendly interface.

✨ Made for speed, security, and simplicity.

⚡ Features
📌 Frontend

Built using Vite + React + TypeScript

Fully Responsive (mobile → desktop)

Smooth page navigation (Home, Scanner, Register, Records, Admin)

Clean UI themed with HU colors + TailwindCSS

Barcode + QR scanning using:

<script src="https://unpkg.com/html5-qrcode"></script>


Live database lookup after scanning student ID barcode

Modern components and reusable hooks

📁 Project Structure (Based on Your Screenshot)
HU-PC-Registration/
│── node_modules/
│── public/
│── src/
│   ├── assets/
│   │   └── hu-logo.png
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   │   ├── Admin.tsx
│   │   ├── Home.tsx
│   │   ├── NotFound.tsx
│   │   ├── Records.tsx
│   │   ├── Register.tsx
│   │   ├── Scanner.tsx
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
│── .env
│── .gitignore
│── bun.lockb
│── components.json
│── eslint.config.js
│── index.html
│── package-lock.json
│── package.json
│── postcss.config.js
│── README.md
│── tailwind.config.ts

📸 QR / Barcode Scanner Preview

The scanner reads:

📌 QR Code from HU Student ID

📌 QR Code generated digitally

Instantly fetches student info from MySQL

🧪 Technologies Used
🎨 Frontend
Tech	Usage
React + TypeScript	SPA UI
Tailwind CSS	Styling
Vite	Fast bundling
html5-qrcode	Scanner

📞 Contact

👨‍💻 Developer: Amar Ahmed
📧 Email: amarselmansudeys@email.com

📱 Telegram: @AmuKocha
🖥️ Portfolio: amar33.vercel.app

⭐ Support The Project

If this project helps you, please ⭐ star the repository — it motivates further development!

🚀 Future Plans

Admin Dashboard Analytics

Export to PDF/Excel

User Roles (Security, Admin, IT Staff)

Mobile App Version (React Native)