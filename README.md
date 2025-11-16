🌐💻 Haramaya University PC Registration System <br />
🔐 QR & Barcode Scanning • 🎓 Student Device Registry • ⚡ Built with React + Tailwind<br /><br />

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

📁 Project Structure (Based on Your Screenshot) <br /><br />

HU-PC-Registration/<br />
│── node_modules/<br />
│── public/<br />
│── src/<br />
│   ├── assets/<br />
│   │   └── hu-logo.png<br />
│   ├── components/<br />
│   ├── hooks/<br />
│   ├── lib/<br />
│   ├── pages/<br />
│   │   ├── Admin.tsx<br />
│   │   ├── Home.tsx<br />
│   │   ├── NotFound.tsx<br />
│   │   ├── Records.tsx<br />
│   │   ├── Register.tsx<br />
│   │   ├── Scanner.tsx<br />
│   ├── App.css<br />
│   ├── App.tsx<br />
│   ├── index.css<br />
│   ├── main.tsx<br />
│   └── vite-env.d.ts<br />
│── .env<br />
│── .gitignore<br />
│── bun.lockb<br />
│── components.json<br />
│── eslint.config.js<br />
│── index.html<br />
│── package-lock.json<br />
│── package.json<br />
│── postcss.config.js<br />
│── README.md<br />
│── tailwind.config.ts<br />

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