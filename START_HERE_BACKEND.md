# 🚀 START HERE - Complete Backend Setup

## ✅ **THIS IS THE CORRECT GUIDE!**

I've created a **SIMPLE, WORKING** Spring Boot backend for you.

---

## 📖 **3 Documents to Read:**

### **1. WORKING_BACKEND_SETUP.md** ⭐ **READ THIS FIRST!**
- Complete file structure
- All Java code (copy-paste ready)
- Correct folder organization
- Step-by-step setup

### **2. SIMPLE_BUILD_COMMANDS.md** ⭐ **COMMANDS HERE!**
- Docker commands
- Build commands
- Test commands
- Troubleshooting

### **3. This file** (Quick overview)

---

## 🎯 **Quick Setup (3 Steps)**

### **Step 1: Install Docker**
Download: https://www.docker.com/products/docker-desktop

```bash
docker --version  # Verify
```

### **Step 2: Create Backend Project**

Create this folder structure on your computer:

```
flashfood-backend/
├── pom.xml
├── docker-compose.yml
├── Dockerfile
└── src/
    └── main/
        ├── java/com/flashfood/
        │   ├── FlashFoodApplication.java
        │   ├── config/WebConfig.java
        │   ├── model/
        │   │   ├── User.java
        │   │   ├── Restaurant.java
        │   │   └── Order.java
        │   ├── repository/
        │   │   ├── UserRepository.java
        │   │   ├── RestaurantRepository.java
        │   │   └── OrderRepository.java
        │   ├── service/
        │   │   ├── UserService.java
        │   │   ├── RestaurantService.java
        │   │   └── OrderService.java
        │   └── controller/
        │       ├── AuthController.java
        │       ├── RestaurantController.java
        │       └── OrderController.java
        └── resources/
            └── application.properties
```

**Copy ALL the code from `WORKING_BACKEND_SETUP.md` into these files!**

### **Step 3: Run with Docker**

```bash
cd flashfood-backend
docker-compose up --build
```

**Done!** Backend running at `http://localhost:8080` ✅

---

## 🧪 **Test if Working**

```bash
# Test 1: Health check
curl http://localhost:8080/health
# Expected: OK

# Test 2: Register user
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@test.com",
    "password": "123456",
    "phone": "9876543210",
    "currentCity": "Bangalore"
  }'
# Expected: JSON with user data
```

If both work, backend is ready! ✅

---

## 🎯 **What You Get:**

### **Database (PostgreSQL in Docker):**
- Auto-created tables
- No manual setup needed
- Runs in Docker container

### **Spring Boot API:**
- User registration
- User login
- Restaurant management
- Order management
- CORS configured for React

### **REST API Endpoints:**
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/city/{city}` - By city
- `POST /api/orders` - Create order

---

## 📊 **Architecture:**

```
React Frontend (localhost:5173)
        ↓
Spring Boot API (localhost:8080)
        ↓
PostgreSQL DB (localhost:5432 - Docker)
```

---

## 🔧 **Useful Commands:**

```bash
# Start
docker-compose up -d

# Stop
docker-compose down

# View logs
docker-compose logs -f backend

# Restart
docker-compose restart

# Rebuild
docker-compose up --build
```

---

## 📝 **File Checklist:**

Before running, make sure you have:

- [ ] pom.xml (Maven configuration)
- [ ] docker-compose.yml (Docker setup)
- [ ] Dockerfile (Spring Boot container)
- [ ] application.properties (Spring config)
- [ ] FlashFoodApplication.java (Main class)
- [ ] WebConfig.java (CORS config)
- [ ] 3 Model classes (User, Restaurant, Order)
- [ ] 3 Repository interfaces
- [ ] 3 Service classes
- [ ] 3 Controller classes

**Total: 16 files**

---

## ❌ **Common Mistakes to Avoid:**

1. **Wrong folder structure**
   - Make sure Java files are in `src/main/java/com/flashfood/`
   - NOT in root folder!

2. **Missing package declarations**
   - Every Java file must have `package com.flashfood.xxx;`

3. **Port conflicts**
   - Close any app using port 8080 or 5432

4. **Docker not running**
   - Start Docker Desktop before running commands

5. **Incomplete files**
   - Copy ALL code from `WORKING_BACKEND_SETUP.md`

---

## 🆘 **Need Help?**

### **Problem: Docker build fails**
```bash
docker-compose down -v
docker system prune -a
docker-compose up --build
```

### **Problem: Can't connect to database**
```bash
docker logs flashfood-db
docker-compose restart postgres
```

### **Problem: Port already in use**
```bash
# Change port in docker-compose.yml
ports:
  - "8081:8080"  # Use 8081 instead
```

---

## ✅ **Success Indicators:**

You'll know it's working when:

1. `docker-compose up` shows no errors
2. `curl http://localhost:8080/health` returns "OK"
3. Can register a user via API
4. Can see data in PostgreSQL
5. React frontend can call the API

---

## 🎉 **Next Steps:**

1. **Read:** `WORKING_BACKEND_SETUP.md` (get all the code)
2. **Create:** All files with correct structure
3. **Run:** `docker-compose up --build`
4. **Test:** Use curl commands
5. **Connect:** Update React to use API

---

## 📚 **All Documentation:**

- **WORKING_BACKEND_SETUP.md** - Complete code ⭐
- **SIMPLE_BUILD_COMMANDS.md** - Commands ⭐
- **START_HERE_BACKEND.md** - This file
- **README.md** - Frontend overview
- **QUICKSTART.md** - React usage

---

## 🚀 **Ready?**

1. Open `WORKING_BACKEND_SETUP.md`
2. Copy all the code
3. Create the files
4. Run `docker-compose up --build`

**It will work!** ✅

---

**Questions? Check `SIMPLE_BUILD_COMMANDS.md` for troubleshooting!**
