<div align="center">

<!-- Header Banner -->
<img src="https://img.shields.io/badge/🎓_Haramaya_University-PC_Registration_System-006B3F?style=for-the-badge&labelColor=006B3F" alt="HU PC Registration" width="600"/>

<br/>
<br/>

# 🖥️ HU PC Registration System

<p align="center">
  <em>A modern, secure web platform for registering and managing student computer devices at Haramaya University</em>
</p>

<br/>

<!-- Badges -->
<p align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Vite-5.4.19-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/TailwindCSS-3.4.17-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind"/>
  <img src="https://img.shields.io/badge/shadcn/ui-Components-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="shadcn/ui"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/QR_Code-Generator-success?style=for-the-badge&logo=qrcode&logoColor=white" alt="QR Code"/>
  <img src="https://img.shields.io/badge/EmailJS-Notifications-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="EmailJS"/>
  <img src="https://img.shields.io/badge/html5--qrcode-Scanner-FF6F00?style=for-the-badge&logo=camera&logoColor=white" alt="Scanner"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square" alt="Status"/>
  <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License"/>
  <img src="https://img.shields.io/badge/University-Haramaya-006B3F?style=flat-square" alt="Haramaya"/>
  <img src="https://img.shields.io/badge/PRs-Welcome-orange?style=flat-square" alt="PRs Welcome"/>
</p>

<br/>

<!-- Separator -->
<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%"/>

</div>

<br/>

## 📋 Table of Contents

<details open>
<summary><b>Click to expand / collapse</b></summary>

<br/>

| #   | Section                                          |
| --- | ------------------------------------------------ |
| 🎯  | [Overview](#-overview)                           |
| ✨  | [Features](#-features)                           |
| 🏗️  | [Architecture](#️-architecture)                   |
| 🛠️  | [Tech Stack](#️-tech-stack)                       |
| 📁  | [Folder Structure](#-folder-structure)           |
| 🧩  | [Pages & Components](#-pages--components)        |
| 🗺️  | [Routes](#️-routes)                               |
| 🚀  | [Getting Started](#-getting-started)             |
| ⚙️  | [Environment Variables](#️-environment-variables) |
| 🔐  | [Admin Panel](#-admin-panel)                     |
| 💾  | [Data Storage](#-data-storage)                   |
| 🤝  | [Contributing](#-contributing)                   |
| 📄  | [License](#-license)                             |

</details>

<br/>

---

<br/>

## 🎯 Overview

<table>
<tr>
<td>

**HU PC Registration System** is an official web-based platform developed for **Haramaya University** to streamline the process of registering, tracking, and verifying student computer devices on campus. The system provides a complete workflow — from student registration with live photo capture and QR code generation, to real-time scanning and verification, to full administrative management.

Built with **React 18 + TypeScript**, styled with **Tailwind CSS** and **shadcn/ui** components, and powered by **EmailJS** for automated email notifications with QR codes. All data is stored locally via `localStorage` for privacy and offline-first functionality.

<br/>

> 🏫 _Designed specifically for Haramaya University's campus security and IT department to manage student PC registrations efficiently._

</td>
</tr>
</table>

<br/>

## ✨ Features

<div align="center">

### 🔑 Core Features

| Feature                    | Description                                                                    | Status |
| :------------------------- | :----------------------------------------------------------------------------- | :----: |
| 📝 **PC Registration**     | Complete registration form with student info, PC details, college & department |   ✅   |
| 📸 **Live Photo Capture**  | Camera integration for capturing student photos during registration            |   ✅   |
| 📱 **QR Code Generation**  | Auto-generates QR codes from Student IDs using `qrcode` library                |   ✅   |
| 📧 **Email Notifications** | Sends QR code to student's email via EmailJS after registration                |   ✅   |
| 🔍 **QR/Barcode Scanner**  | Real-time camera scanning (QR, CODE_39, CODE_128, EAN) with `html5-qrcode`     |   ✅   |
| 🔎 **Manual Search**       | Search students by name, ID, or PC serial number                               |   ✅   |
| 📊 **Records Dashboard**   | Sortable, searchable table of all registered students                          |   ✅   |
| 📥 **CSV Export**          | One-click export of all registration data to CSV file                          |   ✅   |

### 🛡️ Admin Features

| Feature                    | Description                                                           | Status |
| :------------------------- | :-------------------------------------------------------------------- | :----: |
| 🔐 **Secure Login**        | Admin authentication with changeable credentials                      |   ✅   |
| 📋 **Student Management**  | Full CRUD — Create, Read, Update, Delete registrations                |   ✅   |
| 📈 **Dashboard Stats**     | Total registered count & today's registration count                   |   ✅   |
| 🔑 **Change Username**     | Modify admin username with password verification                      |   ✅   |
| 🔒 **Change Password**     | Secure password update with current password confirmation             |   ✅   |
| 🚫 **Duplicate Detection** | Prevents duplicate Student IDs, Emails, Phone Numbers, and PC Serials |   ✅   |

### 🎨 UI/UX Features

| Feature                    | Description                                              | Status |
| :------------------------- | :------------------------------------------------------- | :----: |
| 🎨 **University Branding** | Custom HU Green & Gold color palette throughout          |   ✅   |
| ✨ **Smooth Animations**   | Fade-in, scale, and slide animations                     |   ✅   |
| 📱 **Responsive Design**   | Mobile-first, works on all screen sizes                  |   ✅   |
| 🖋️ **Modern Typography**   | Inter & Poppins fonts from Google Fonts                  |   ✅   |
| 🔔 **Toast Notifications** | Instant feedback for all user actions via Sonner & Radix |   ✅   |
| 🌐 **SEO Optimized**       | OpenGraph meta tags and proper semantic HTML             |   ✅   |

</div>

<br/>

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                        🌐 Browser (Client-Side SPA)             │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────┐   ┌──────────────┐   ┌───────────────────────┐  │
│  │  React 18  │   │ React Router │   │   TanStack Query      │  │
│  │ TypeScript │───│    v6.30     │───│ (Server State Mgmt)   │  │
│  └────────────┘   └──────────────┘   └───────────────────────┘  │
│        │                                         │               │
│  ┌─────▼─────────────────────────────────────────▼───────────┐  │
│  │                    UI Component Layer                      │  │
│  │  ┌──────────┐ ┌──────────┐ ┌────────┐ ┌────────────────┐ │  │
│  │  │shadcn/ui │ │Tailwind  │ │Lucide  │ │ Radix UI       │ │  │
│  │  │Components│ │  CSS 3   │ │ Icons  │ │ Primitives     │ │  │
│  │  └──────────┘ └──────────┘ └────────┘ └────────────────┘ │  │
│  └───────────────────────────────────────────────────────────┘  │
│        │                                                        │
│  ┌─────▼─────────────────────────────────────────────────────┐  │
│  │                     Pages Layer                            │  │
│  │  ┌──────┐ ┌────────┐ ┌───────┐ ┌───────┐ ┌─────┐        │  │
│  │  │ Home │ │Register│ │Scanner│ │Records│ │Admin│        │  │
│  │  └──────┘ └────────┘ └───────┘ └───────┘ └─────┘        │  │
│  └───────────────────────────────────────────────────────────┘  │
│        │                          │                  │           │
├────────▼──────────────────────────▼──────────────────▼──────────┤
│                    📡 External Services & Storage               │
│  ┌─────────────────┐ ┌──────────────┐ ┌──────────────────────┐ │
│  │   📧 EmailJS    │ │ 📱 QR Code   │ │ 💾 localStorage      │ │
│  │ (Email w/ QR)   │ │ (Generation) │ │ (Student Records)    │ │
│  └─────────────────┘ └──────────────┘ └──────────────────────┘ │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  📷 html5-qrcode (Camera Scanning: QR, Barcode, EAN)    │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

<br/>

## 🛠️ Tech Stack

<div align="center">

### 🎨 Frontend Core

<table>
<tr>
<td align="center" width="110">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="48" height="48" alt="React" />
<br /><b>React 18</b>
<br /><sub>UI Library</sub>
</td>
<td align="center" width="110">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="48" height="48" alt="TypeScript" />
<br /><b>TypeScript</b>
<br /><sub>Language</sub>
</td>
<td align="center" width="110">
<img src="https://vitejs.dev/logo.svg" width="48" height="48" alt="Vite" />
<br /><b>Vite 5</b>
<br /><sub>Build Tool</sub>
</td>
<td align="center" width="110">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" width="48" height="48" alt="Tailwind" />
<br /><b>Tailwind 3</b>
<br /><sub>Styling</sub>
</td>
<td align="center" width="110">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="48" height="48" alt="PostCSS" />
<br /><b>PostCSS</b>
<br /><sub>Processing</sub>
</td>
</tr>
</table>

### 🧩 UI Framework & Libraries

<table>
<tr>
<td align="center" width="130">
<br /><b>⬛ shadcn/ui</b>
<br /><sub>49 UI Components</sub>
</td>
<td align="center" width="130">
<br /><b>🎯 Radix UI</b>
<br /><sub>Accessible Primitives</sub>
</td>
<td align="center" width="130">
<br /><b>✨ Lucide React</b>
<br /><sub>Icon Library</sub>
</td>
<td align="center" width="130">
<br /><b>📊 Recharts</b>
<br /><sub>Data Visualization</sub>
</td>
</tr>
</table>

### 📦 Key Dependencies

| Package                    | Version    | Purpose                               |
| :------------------------- | :--------- | :------------------------------------ |
| `react` / `react-dom`      | `^18.3.1`  | Core UI library & DOM rendering       |
| `typescript`               | `^5.8.3`   | Static type checking                  |
| `react-router-dom`         | `^6.30.1`  | Client-side routing & navigation      |
| `@tanstack/react-query`    | `^5.83.0`  | Async state management                |
| `tailwindcss`              | `^3.4.17`  | Utility-first CSS framework           |
| `tailwindcss-animate`      | `^1.0.7`   | CSS animation utilities               |
| `qrcode`                   | `^1.5.4`   | QR code generation on canvas          |
| `html5-qrcode`             | `^2.3.8`   | Real-time QR/barcode camera scanning  |
| `emailjs-com`              | `^3.2.0`   | Send emails with QR codes to students |
| `@emailjs/browser`         | `^4.4.1`   | Browser-based email sending           |
| `react-hook-form`          | `^7.61.1`  | Form state management                 |
| `zod`                      | `^3.25.76` | Schema validation                     |
| `@hookform/resolvers`      | `^3.10.0`  | Zod integration with React Hook Form  |
| `date-fns`                 | `^3.6.0`   | Date utility functions                |
| `sonner`                   | `^1.7.4`   | Toast notification system             |
| `class-variance-authority` | `^0.7.1`   | Component variant management          |
| `clsx` + `tailwind-merge`  | Latest     | Conditional CSS class merging         |
| `cmdk`                     | `^1.1.1`   | Command palette component             |
| `recharts`                 | `^2.15.4`  | Charts & data visualization           |
| `vaul`                     | `^0.9.9`   | Drawer component                      |
| `embla-carousel-react`     | `^8.6.0`   | Carousel/slider                       |
| `next-themes`              | `^0.3.0`   | Theme management                      |
| `input-otp`                | `^1.4.2`   | OTP input component                   |

</div>

<br/>

## 📁 Folder Structure

```
HU-PC-REGISTRATION/
│
├── 📄 index.html                      # Entry HTML with SEO meta tags & Google Fonts
├── 📄 package.json                    # Dependencies & scripts
├── 📄 vite.config.ts                  # Vite config with path aliases (@/)
├── 📄 tailwind.config.ts              # Tailwind config with HU brand colors
├── 📄 tsconfig.json                   # TypeScript configuration
├── 📄 tsconfig.app.json               # App-specific TS config
├── 📄 tsconfig.node.json              # Node-specific TS config
├── 📄 postcss.config.js               # PostCSS with Tailwind & Autoprefixer
├── 📄 components.json                 # shadcn/ui configuration
├── 📄 eslint.config.js                # ESLint rules
├── 📄 .gitignore                      # Git ignore rules
│
├── 📁 public/                         # Static assets
│   ├── 🖼️ logo.png                    # HU logo (favicon)
│   ├── 🖼️ placeholder.svg             # Placeholder image
│   └── 🤖 robots.txt                  # SEO robots configuration
│
└── 📁 src/                            # Source code
    ├── 📄 App.tsx                     # Root component with routes & providers
    ├── 📄 App.css                     # Global app styles
    ├── 📄 main.tsx                    # Entry point
    ├── 📄 index.css                   # Tailwind directives & CSS variables
    ├── 📄 vite-env.d.ts               # Vite type declarations
    │
    ├── 📁 assets/                     # Bundled assets
    │   └── 🖼️ hu-logo.png             # Haramaya University logo
    │
    ├── 📁 components/                 # Shared components
    │   ├── 📄 Navigation.tsx           # Top navigation bar
    │   ├── 📄 NavLink.tsx              # Styled navigation link
    │   │
    │   └── 📁 ui/                     # shadcn/ui components (49 files)
    │       ├── accordion.tsx          ├── button.tsx
    │       ├── dialog.tsx             ├── input.tsx
    │       ├── select.tsx             ├── table.tsx
    │       ├── toast.tsx              ├── tooltip.tsx
    │       └── ... (41 more)
    │
    ├── 📁 hooks/                      # Custom React hooks
    │   ├── 📄 use-mobile.tsx           # Responsive breakpoint hook
    │   └── 📄 use-toast.ts            # Toast notification hook
    │
    ├── 📁 lib/                        # Utility libraries
    │   ├── 📄 storage.ts              # Student CRUD, search, export (localStorage)
    │   ├── 📄 adminAuth.ts            # Admin authentication & credential management
    │   └── 📄 utils.ts                # General utilities (cn helper)
    │
    └── 📁 pages/                      # Route-level page components
        ├── 📄 Home.tsx                # Landing page with feature cards
        ├── 📄 Register.tsx            # PC registration form + camera + QR + email
        ├── 📄 Scanner.tsx             # QR/barcode scanner + manual search
        ├── 📄 Records.tsx             # Student records table with sort & export
        ├── 📄 Admin.tsx               # Admin dashboard with full CRUD
        └── 📄 NotFound.tsx            # 404 error page
```

<br/>

## 🧩 Pages & Components

<div align="center">

### 📄 Pages

<table>
<tr>
<th align="center" width="180">Page</th>
<th align="center" width="100">Route</th>
<th align="left">Key Features</th>
</tr>
<tr>
<td align="center">
🏠 <b>Home</b>
</td>
<td align="center"><code>/</code></td>
<td>
  • University logo & branding<br/>
  • 4 feature cards (Register, Scan, Records, Admin)<br/>
  • Animated entrance with staggered delays<br/>
  • System status indicator
</td>
</tr>
<tr>
<td align="center">
📝 <b>Register</b>
</td>
<td align="center"><code>/register</code></td>
<td>
  • 📸 Live camera photo capture (circular crop)<br/>
  • 📝 Full student info form (name, ID, college, dept, year)<br/>
  • 💻 PC details (serial, brand: HP/Dell/Lenovo/Apple/etc.)<br/>
  • 📱 QR code auto-generation from Student ID<br/>
  • 📧 Email notification with QR via EmailJS<br/>
  • 🚫 Duplicate detection (ID, email, phone, serial)
</td>
</tr>
<tr>
<td align="center">
🔍 <b>Scanner</b>
</td>
<td align="center"><code>/scan</code></td>
<td>
  • 📷 Real-time camera QR/barcode scanning<br/>
  • 🔎 Manual search by name/ID/serial<br/>
  • ✅ Green "REGISTERED" card with photo & full details<br/>
  • ❌ Red "NOT REGISTERED" warning card<br/>
  • 🎯 Supports QR, CODE_39, CODE_128, EAN_13, EAN_8
</td>
</tr>
<tr>
<td align="center">
📊 <b>Records</b>
</td>
<td align="center"><code>/records</code></td>
<td>
  • 📋 Full student table with all registration data<br/>
  • 🔃 Sortable columns (name, ID, registration date)<br/>
  • 🔍 Real-time search filtering<br/>
  • 📥 One-click CSV export with timestamped filename<br/>
  • 🏷️ Color-coded PC type badges
</td>
</tr>
<tr>
<td align="center">
🛡️ <b>Admin</b>
</td>
<td align="center"><code>/admin</code></td>
<td>
  • 🔐 Secure login with customizable credentials<br/>
  • 📈 Dashboard with total & today's registration stats<br/>
  • ✏️ Edit student records via modal dialog<br/>
  • 🗑️ Delete records with confirmation<br/>
  • 🔑 Change username & password dialogs<br/>
  • 🚪 Secure logout
</td>
</tr>
<tr>
<td align="center">
🚫 <b>NotFound</b>
</td>
<td align="center"><code>*</code></td>
<td>
  • Custom 404 error page for invalid routes
</td>
</tr>
</table>

### 🧱 Shared Components

| Component               | File                        | Description                                                                         |
| :---------------------- | :-------------------------- | :---------------------------------------------------------------------------------- |
| 🧭 **Navigation**       | `components/Navigation.tsx` | Top navigation bar with links to all pages                                          |
| 🔗 **NavLink**          | `components/NavLink.tsx`    | Styled navigation link with active state                                            |
| 🎨 **49 UI Components** | `components/ui/`            | Full shadcn/ui library (Button, Dialog, Table, Input, Select, Toast, Tooltip, etc.) |

</div>

<br/>

## 🗺️ Routes

```
📍 Route Map
│
├── /                → 🏠 Home — Landing page with feature cards
├── /register        → 📝 Register — PC registration with photo & QR
├── /scan            → 🔍 Scanner — QR/barcode scanning & verification
├── /records         → 📊 Records — Sortable student records & CSV export
├── /admin           → 🛡️ Admin — Dashboard with full CRUD management
└── *                → 🚫 NotFound — 404 error page
```

<br/>

## 🚀 Getting Started

### 📋 Prerequisites

<table>
<tr>
<td>

| Requirement        | Version                               |
| :----------------- | :------------------------------------ |
| **Node.js**        | `≥ 18.x`                              |
| **npm** or **bun** | `≥ 9.x` / Latest                      |
| **Git**            | Latest                                |
| **Camera**         | Required for photo capture & scanning |

</td>
</tr>
</table>

### 📥 Installation

<details open>
<summary><b>Step-by-step guide</b></summary>

<br/>

**1️⃣ Clone the repository**

```bash
git clone https://github.com/AmarAhmedMohammed/HU-PC-REGISTRATION.git
cd HU-PC-REGISTRATION
```

**2️⃣ Install dependencies**

```bash
# Using npm
npm install

# Or using bun
bun install
```

**3️⃣ Set up environment variables**

```bash
# Create .env file in the root directory
cp .env.example .env
```

Add your EmailJS credentials (see [Environment Variables](#️-environment-variables) below).

**4️⃣ Start the development server**

```bash
npm run dev
```

**5️⃣ Open in browser**

```
🌐 http://localhost:8080
```

</details>

### 📜 Available Scripts

| Command             | Description                                             |
| :------------------ | :------------------------------------------------------ |
| `npm run dev`       | 🔄 Start development server (port 8080) with hot reload |
| `npm run build`     | 📦 Create optimized production build                    |
| `npm run build:dev` | 🧪 Build in development mode for debugging              |
| `npm run preview`   | 👁️ Preview the production build locally                 |
| `npm run lint`      | 🔍 Run ESLint for code quality checks                   |

<br/>

## ⚙️ Environment Variables

The project uses **EmailJS** for sending QR code emails to students. Create a `.env` file in the root directory:

```env
# ──────────────────────────────────────────────
# EmailJS Configuration
# Get credentials at: https://www.emailjs.com/
# ──────────────────────────────────────────────

VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

<details>
<summary><b>📧 How to set up EmailJS</b></summary>

<br/>

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an **Email Service** (Gmail, Outlook, etc.)
3. Create an **Email Template** with these variables:
   - `{{student_name}}` — Student's full name
   - `{{student_id}}` — Student ID number
   - `{{qr_code}}` — Base64 QR code image
   - `{{to_email}}` — Student's email address
4. Copy your **Service ID**, **Template ID**, and **Public Key** to the `.env` file

</details>

<br/>

## 🔐 Admin Panel

<div align="center">

<table>
<tr>
<td>

### Default Credentials

| Field        | Value      |
| :----------- | :--------- |
| **Username** | `admin`    |
| **Password** | `admin123` |

> ⚠️ **Important:** Change the default credentials immediately after first login using the **Change Username** and **Change Password** buttons in the admin dashboard.

</td>
</tr>
</table>

### Admin Capabilities

```
🛡️ Admin Dashboard
│
├── 📈 Statistics Panel
│   ├── Total Registered Students
│   └── Today's Registrations
│
├── 📋 Student Management
│   ├── ✏️ Edit — Modify name, Student ID, PC serial
│   └── 🗑️ Delete — Remove with confirmation
│
└── ⚙️ Settings
    ├── 🔑 Change Username (requires password)
    └── 🔒 Change Password (requires current password)
```

</div>

<br/>

## 💾 Data Storage

<div align="center">

The system uses **`localStorage`** for data persistence — no backend server required.

```
┌────────────────────────────────────────────────────┐
│                  localStorage                       │
├────────────────────────────────────────────────────┤
│                                                     │
│  🔑 hu_pc_registration_students                     │
│  ├── Student[]                                      │
│  │   ├── id (timestamp-based)                       │
│  │   ├── fullName                                   │
│  │   ├── studentId (e.g., UGPR1234/16)              │
│  │   ├── department                                 │
│  │   ├── college                                    │
│  │   ├── yearOfStudy (1st–5th)                      │
│  │   ├── pcSerialNumber                             │
│  │   ├── pcType (HP/Dell/Lenovo/Apple/ASUS/etc.)    │
│  │   ├── phoneNumber                                │
│  │   ├── email                                      │
│  │   ├── photoUrl (base64 JPEG)                     │
│  │   └── registrationDate (ISO string)              │
│  │                                                   │
│  🔑 hu_admin_credentials                            │
│  ├── username (default: "admin")                    │
│  └── password (default: "admin123")                 │
│                                                     │
└────────────────────────────────────────────────────┘
```

### Data Operations

| Operation              | Function                       | Description                                        |
| :--------------------- | :----------------------------- | :------------------------------------------------- |
| ➕ **Create**          | `saveStudent()`                | Add new student with auto-generated ID & timestamp |
| 📖 **Read**            | `getStudents()`                | Retrieve all registered students                   |
| ✏️ **Update**          | `updateStudent()`              | Modify student record by ID                        |
| 🗑️ **Delete**          | `deleteStudent()`              | Remove student record by ID                        |
| 🔍 **Search**          | `searchStudents()`             | Find by name, ID, or serial                        |
| 🔎 **Find**            | `findStudentByStudentId()`     | Lookup by exact Student ID                         |
| 🚫 **Duplicate Check** | `checkDuplicateRegistration()` | Validate uniqueness (ID, email, phone, serial)     |
| 📥 **Export**          | `exportToCSV()`                | Download all records as timestamped CSV            |

</div>

<br/>

## 🎨 Design System

<div align="center">

### University Brand Colors

| Color              | CSS Variable      | Value      | Usage                             |
| :----------------- | :---------------- | :--------- | :-------------------------------- |
| 🟢 **HU Green**    | `--hu-green`      | Primary    | Headers, buttons, primary actions |
| 🟡 **HU Gold**     | `--hu-gold`       | Secondary  | Accents, secondary actions        |
| ⬜ **HU White**    | `--hu-white`      | Background | Page backgrounds                  |
| 🔘 **HU Gray**     | `--hu-light-gray` | Neutral    | Subtle backgrounds, borders       |
| 🟢 **Success**     | `--success`       | Green      | Registration confirmation         |
| 🔴 **Destructive** | `--destructive`   | Red        | Errors, not registered, delete    |

### Typography

| Font        | Weight  | Usage                      |
| :---------- | :------ | :------------------------- |
| **Inter**   | 400–800 | Body text, labels, buttons |
| **Poppins** | 400–800 | Headings, titles           |

</div>

<br/>

## 🤝 Contributing

<table>
<tr>
<td>

Contributions are always welcome! Here's how you can help:

1. 🍴 **Fork** the repository
2. 🌿 **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. 💾 **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. 📤 **Push** to the branch (`git push origin feature/amazing-feature`)
5. 🔃 **Open** a Pull Request

### 💡 Contribution Ideas

- 🔗 Connect to a real backend (Firebase, Supabase, etc.)
- 📊 Add analytics & charts for registration trends
- 🌍 Multi-language support (Amharic, Oromiffa, English)
- 📱 PWA support for offline campus use
- 🖨️ Print student registration cards

</td>
</tr>
</table>

<br/>

## 📄 License

<div align="center">

This project is licensed under the **MIT License**.

<br/>

```
MIT License — feel free to use this project for learning and development.
```

<br/>

---

<br/>

<p align="center">
  <b>⭐ If you found this project helpful, please give it a star!</b>
</p>

<p align="center">
  Made with ❤️ for <b>Haramaya University</b> 🎓
</p>

<br/>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%"/>

<br/>

<p align="center">
  <img src="https://img.shields.io/badge/Haramaya_University-🎓_Excellence_in_Action-006B3F?style=for-the-badge" alt="HU"/>
</p>

</div>
