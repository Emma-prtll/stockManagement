# GearStock

GearStock is a stock management web application designed to simplify and optimize vehicle and employee management within a company.

The goal of the application is to provide a fluid, intuitive, and secure experience while ensuring data integrity and operational efficiency.

---
## Features

- Vehicle creation with multi-step form (stepper)
- Real-time stock management
- Stock movement history tracking
- Employee management
- Confirmation dialogs for sensitive actions
- Notification system for success and error feedback
- Dashboard with data visualization
- Secure CRUD operations

---

## Tech Stack

### Frontend
- React
- TailwindCSS
- Material Tailwind
- Zustand 
- React Router
- React Hot Toast
- React-helmet
- Vite 
- Axios
- Chart.js
- React-icons
- Validator

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Bcrypt 
- Cors 
- Dotenv 
- Express-async-handler 
- Jsonwebtoken
- Nodemon

---

## Project Structure
gearstock

├── frontend/ 

├── backend/ 

├── README.md

---

## Installation & Setup

### Clone the repository

    ```bash
    git clone https://github.com/Emma-prtll/stockManagement.git
    cd gearstock
#### Backend

    cd back-stockManagement
    npm install
    npm run dev

Create .env file

    PORT
    NODE_ENV
    DATABASE_URI
    JWT_SECRET

#### Frontend

    cd Front-stockMangement
    npm install
    npm run dev
