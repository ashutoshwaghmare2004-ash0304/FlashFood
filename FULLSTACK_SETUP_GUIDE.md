# 🚀 Complete Full-Stack FlashFood Setup Guide

## 📋 What You Have

### ✅ **Frontend (Current - React)**
- Complete React + TypeScript application
- Running in this environment
- Uses localStorage (temporary)

### ✅ **Backend (To Setup - Spring Boot)**
- All Java code provided in `backend/` folder
- Need to setup on your local machine
- MySQL database required

---

## 🎯 Setup Options

### **Option 1: Use Current Frontend Only** (Easiest)
Keep using the React app as-is. Works perfectly without backend!

### **Option 2: Setup Complete Full-Stack** (Recommended)
Connect React frontend to Spring Boot backend.

---

## 🔧 Option 2: Full-Stack Setup

### **Step 1: Setup Spring Boot Backend**

#### 1.1 Prerequisites
```bash
# Install Java 17
java -version  # Should show 17+

# Install Maven
mvn -version

# Install MySQL
mysql --version
```

#### 1.2 Create Spring Boot Project
```bash
# Create project directory
mkdir flashfood-backend
cd flashfood-backend

# Copy all files from backend/ folder to this directory
# - pom.xml
# - src/main/java/... (all Java files)
# - src/main/resources/application.properties
# - Dockerfile
# - docker-compose.yml
```

#### 1.3 Setup Database with Docker (EASIEST!)

**No installation needed! Use Docker:**

```bash
# Start PostgreSQL with Docker
docker-compose up -d postgres

# Database ready!
# PostgreSQL running on port 5432
# Database: flashfood_db
# User: flashfood
# Password: flashfood123
```

**OR Manual PostgreSQL (if no Docker):**

```bash
# Install PostgreSQL, then:
psql -U postgres

CREATE DATABASE flashfood_db;
CREATE USER flashfood WITH PASSWORD 'flashfood123';
GRANT ALL PRIVILEGES ON DATABASE flashfood_db TO flashfood;
\q
```

#### 1.4 Run Spring Boot
```bash
# From flashfood-backend directory
mvn spring-boot:run
```

Backend will start at: **http://localhost:8080**

---

### **Step 2: Update React Frontend**

#### 2.1 Create API Service
Create file: `src/services/api.ts`

```typescript
const API_URL = 'http://localhost:8080/api';

export const api = {
  // Auth
  register: async (userData: any) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(userData)
    });
    return res.json();
  },

  login: async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },

  // Restaurants
  getRestaurantsByCity: async (city: string) => {
    const res = await fetch(`${API_URL}/restaurants/city/${city}`, {
      credentials: 'include'
    });
    return res.json();
  },

  // Menu
  getMenu: async (restaurantId: string) => {
    const res = await fetch(`${API_URL}/menu/restaurant/${restaurantId}`, {
      credentials: 'include'
    });
    return res.json();
  },

  // Orders
  placeOrder: async (orderData: any) => {
    const res = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(orderData)
    });
    return res.json();
  },

  getOrders: async () => {
    const res = await fetch(`${API_URL}/orders`, {
      credentials: 'include'
    });
    return res.json();
  },

  cancelOrder: async (orderId: string) => {
    const res = await fetch(`${API_URL}/orders/${orderId}/cancel`, {
      method: 'PUT',
      credentials: 'include'
    });
    return res.json();
  }
};
```

#### 2.2 Update AppContext to Use API

Replace localStorage calls with API calls in `src/contexts/AppContext.tsx`.

---

### **Step 3: Test Full-Stack**

#### 3.1 Start Backend
```bash
cd flashfood-backend
mvn spring-boot:run
# Backend running at http://localhost:8080
```

#### 3.2 Start Frontend
```bash
cd flashfood-frontend  # Your React project
npm run dev
# Frontend running at http://localhost:5173
```

#### 3.3 Test Flow
1. Register user → Data saved in MySQL
2. Login → Session created in Spring Boot
3. Browse restaurants → From MySQL database
4. Place order → Saved in MySQL
5. View orders → Retrieved from MySQL

---

## 🐳 Docker Setup (Easiest! - RECOMMENDED)

### Run Everything with Docker Compose

```bash
cd flashfood-backend
docker-compose up -d
```

This starts:
- **PostgreSQL database** (port 5432) ✅
- **Spring Boot backend** (port 8080) ✅

**No PostgreSQL installation needed!**

Then run React frontend separately:
```bash
cd flashfood-frontend
npm run dev
```

**See `POSTGRESQL_DOCKER_SETUP.md` for complete guide!**

---

## 📊 Architecture

```
┌─────────────────┐
│  React Frontend │  (Port 5173)
│  (Current Env) │
└────────┬────────┘
         │ HTTP Requests
         ↓
┌─────────────────┐
│  Spring Boot    │  (Port 8080)
│  Backend        │  (Your Local Machine)
└────────┬────────┘
         │ JDBC
         ↓
┌─────────────────┐
│  MySQL Database │  (Port 3306)
│                 │  (Your Local Machine)
└─────────────────┘
```

---

## 📝 File Structure You Need to Create

```
flashfood-backend/
├── pom.xml                           ← Copy from backend/pom.xml
├── Dockerfile                        ← Copy from backend/Dockerfile
├── docker-compose.yml                ← Copy from backend/docker-compose.yml
└── src/
    ├── main/
    │   ├── java/
    │   │   └── com/flashfood/
    │   │       ├── FlashFoodApplication.java      ← Copy
    │   │       ├── controller/
    │   │       │   ├── AuthController.java        ← Copy
    │   │       │   ├── RestaurantController.java  ← Copy
    │   │       │   ├── MenuController.java        ← Copy
    │   │       │   └── OrderController.java       ← Copy
    │   │       ├── service/
    │   │       │   ├── UserService.java           ← Copy
    │   │       │   ├── RestaurantService.java     ← Copy
    │   │       │   ├── MenuService.java           ← Copy
    │   │       │   └── OrderService.java          ← Copy
    │   │       ├── repository/
    │   │       │   ├── UserRepository.java        ← Copy
    │   │       │   ├── RestaurantRepository.java  ← Copy
    │   │       │   ├── MenuItemRepository.java    ← Copy
    │   │       │   └── OrderRepository.java       ← Copy
    │   │       └── model/
    │   │           ├── User.java                  ← Copy
    │   │           ├── Address.java               ← Copy
    │   │           ├── Restaurant.java            ← Copy
    │   │           ├── MenuItem.java              ← Copy
    │   │           ├── Order.java                 ← Copy
    │   │           └── OrderItem.java             ← Copy
    │   └── resources/
    │       └── application.properties             ← Copy
    └── test/
```

---

## ✅ Quick Commands

### Backend
```bash
# Build
mvn clean install

# Run
mvn spring-boot:run

# Build JAR
mvn clean package

# Run JAR
java -jar target/flashfood-backend-1.0.0.jar

# Docker
docker-compose up -d
```

### Frontend
```bash
# Install
npm install

# Run
npm run dev

# Build
npm run build
```

---

## 🎯 Next Steps

1. **Copy all files** from `backend/` folder to your local machine
2. **Create Spring Boot project** structure
3. **Setup MySQL** database
4. **Run backend**: `mvn spring-boot:run`
5. **Run frontend**: `npm run dev`
6. **Connect them** by updating API calls in React

---

## 📞 API Endpoints (When Backend Running)

```
POST   /api/auth/register       - Register user
POST   /api/auth/login          - Login
POST   /api/auth/logout         - Logout
GET    /api/auth/current        - Get current user

GET    /api/restaurants         - Get all restaurants
GET    /api/restaurants/city/:city - Get by city
GET    /api/restaurants/:id     - Get restaurant details

GET    /api/menu/restaurant/:id - Get menu
GET    /api/menu/favorites      - Get local favorites

POST   /api/orders              - Place order
GET    /api/orders              - Get user orders
GET    /api/orders/:id          - Get order details
PUT    /api/orders/:id/cancel   - Cancel order
```

---

## 🎉 You're Ready!

All Spring Boot code is provided in the `backend/` folder.
Just copy to your local machine and run!

**Current React app works as-is (Option 1)**
**OR setup full-stack (Option 2)**

Your choice! 🚀
