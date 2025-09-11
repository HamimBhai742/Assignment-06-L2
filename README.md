# 💳 PayWallet — (React + Redux Toolkit + RTK Query)

### 🌐 https://assignment-06-nine.vercel.app

## 📖 Project Overview

PayWallet is a secure, role-based, and user-friendly frontend application designed for a Digital Wallet System (similar to bKash or Nagad). It empowers Users, Agents, and Admins to manage wallets, perform financial transactions, and monitor activities seamlessly.

- Admins can view all users, block or unblock accounts, manage agents by approving or suspending them, and monitor every transaction across the system.

- Agents are responsible for handling cash-in and cash-out operations, enabling smooth money flow for users.

- Users can easily deposit, withdraw, and send money to others, making financial management simple and efficient.

The project is built with **React.js**, **Redux Toolkit**, and **RTK Query**, consuming a backend API to deliver real-time wallet operations.


## ⚡ Features

### 🌍 Public Landing Pages
- Responsive **Home Page** with hero banner, sticky navbar, smooth transitions, and skeleton loaders
- **About Page** — service story, mission, team details
- **Features Page** — key features with visuals
- **Contact Page** — inquiry form (simulated)
- **FAQ Page** — common Q&A
- Optional **Pricing Page**

### 🔐 Authentication
- JWT-based **Login & Registration**
- Role-based redirection (**User / Agent / Admin**)
- Persisted authentication state across refresh
- Logout functionality

### 👤 User Dashboard
- Wallet balance overview with quick actions
- Deposit, Withdraw, and Send Money
- Transaction history with pagination & filters
- Profile management (update info, change password)

### 🏪 Agent Dashboard
- Cash-in/out summary & activity overview
- Add/Withdraw money for users
- View agent-handled transactions
- Profile management

### 🛡️ Admin Dashboard
- System overview: users, agents, transaction stats
- Manage users (block/unblock) & agents (approve/suspend)
- View all transactions with advanced filters
- Search bars, multi-filters, and pagination
- Profile management

## 🛠️ Tech Stack

### Frontend
- React.js + React Router
- Redux Toolkit + RTK Query
- TypeScript
- Tailwind CSS

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT + bcrypt (authentication)


## 🚀 Getting Started

### Installation
```bash
# Clone repository
git clone https://github.com/HamimBhai742/Assignment-06-L2.git
cd Assignment-06-L2

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
