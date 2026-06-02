# ⚡ Simple Build Commands - COPY & PASTE

## 🎯 **EASIEST WAY - Use Docker**

### **1. Prerequisites**
```bash
# Install Docker Desktop
# Download: https://www.docker.com/products/docker-desktop

# Verify installation
docker --version
docker-compose --version
```

### **2. Create Project**
```bash
# Create folder
mkdir flashfood-backend
cd flashfood-backend

# Copy all files from WORKING_BACKEND_SETUP.md
# Create exact folder structure as shown
```

### **3. Run with Docker**
```bash
# Build and start everything
docker-compose up --build

# Or run in background
docker-compose up -d --build

# View logs
docker-compose logs -f backend

# Stop everything
docker-compose down
```

---

## 🔧 **Alternative - Run Locally (Without Docker)**

### **1. Install Java & Maven**
```bash
# Install Java 17
java -version  # Should show 17+

# Install Maven
mvn -version
```

### **2. Start PostgreSQL with Docker**
```bash
# Start only PostgreSQL in Docker
docker run --name postgres-db \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=flashfood \
  -p 5432:5432 \
  -d postgres:15
```

### **3. Build Spring Boot**
```bash
cd flashfood-backend

# Clean and build
mvn clean install

# Run
mvn spring-boot:run
```

---

## ✅ **Test if Working**

### **Test 1: Health Check**
```bash
curl http://localhost:8080/health
# Expected: OK
```

### **Test 2: Home**
```bash
curl http://localhost:8080/
# Expected: 🍔 FlashFood API is running!
```

### **Test 3: Register User**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "9876543210",
    "currentCity": "Bangalore"
  }'

# Expected: JSON with user data
```

### **Test 4: Login**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'

# Expected: JSON with user data
```

### **Test 5: Get Restaurants**
```bash
curl http://localhost:8080/api/restaurants

# Expected: [] (empty array initially)
```

---

## 🐛 **Troubleshooting**

### **Port 8080 already in use**
```bash
# Find and kill process
# Mac/Linux:
lsof -ti:8080 | xargs kill -9

# Windows:
netstat -ano | findstr :8080
# Then kill the PID shown
```

### **Port 5432 already in use (PostgreSQL)**
```bash
# Stop local PostgreSQL
# Mac:
brew services stop postgresql

# Linux:
sudo systemctl stop postgresql

# Or change port in docker-compose.yml:
ports:
  - "5433:5432"  # Use 5433 instead
```

### **Docker build fails**
```bash
# Clean Docker
docker-compose down -v
docker system prune -a

# Rebuild
docker-compose up --build
```

### **Can't connect to database**
```bash
# Check if PostgreSQL container is running
docker ps

# Check logs
docker logs flashfood-db

# Restart PostgreSQL
docker-compose restart postgres
```

### **Maven build fails**
```bash
# Clean Maven cache
mvn clean

# Delete target folder
rm -rf target/

# Rebuild
mvn clean install -U
```

---

## 📊 **Check Running Services**

### **Docker**
```bash
# List running containers
docker ps

# Should show:
# - flashfood-db (postgres)
# - flashfood-api (spring boot)

# View logs
docker-compose logs -f

# Stop services
docker-compose stop

# Start services
docker-compose start
```

### **Local PostgreSQL**
```bash
# Connect to database
docker exec -it flashfood-db psql -U postgres -d flashfood

# Or if running locally:
psql -U postgres -d flashfood

# Inside psql:
\l              # List databases
\c flashfood    # Connect to flashfood
\dt             # List tables
SELECT * FROM users;
\q              # Quit
```

---

## 🎯 **Quick Reference**

### **Start Everything (Docker)**
```bash
docker-compose up -d
```

### **Stop Everything**
```bash
docker-compose down
```

### **Rebuild**
```bash
docker-compose up --build
```

### **View Logs**
```bash
docker-compose logs -f backend
```

### **Restart**
```bash
docker-compose restart
```

### **Remove Everything (including data)**
```bash
docker-compose down -v
```

---

## 🚀 **Development Workflow**

### **1. Start Backend**
```bash
cd flashfood-backend
docker-compose up -d
```

### **2. Start Frontend**
```bash
cd flashfood-frontend
npm run dev
```

### **3. Test Full Stack**
```bash
# Backend: http://localhost:8080
# Frontend: http://localhost:5173

# Register on frontend
# Data will be saved in PostgreSQL!
```

---

## 📝 **Environment Variables**

Create `.env` file in backend folder:

```env
POSTGRES_DB=flashfood
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
SERVER_PORT=8080
```

Update `docker-compose.yml`:
```yaml
environment:
  POSTGRES_DB: ${POSTGRES_DB}
  POSTGRES_USER: ${POSTGRES_USER}
  POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
```

---

## ✅ **Success Checklist**

- [ ] Docker installed and running
- [ ] Project folder created
- [ ] All files copied with correct structure
- [ ] `docker-compose up --build` runs without errors
- [ ] `curl http://localhost:8080/health` returns "OK"
- [ ] Can register a user via API
- [ ] Can view tables in PostgreSQL
- [ ] Frontend can connect to backend

---

## 🎉 **You're Done!**

If all tests pass, your backend is working! 🚀

**Backend:** `http://localhost:8080` ✅  
**PostgreSQL:** `localhost:5432` ✅  
**API Docs:** See `WORKING_BACKEND_SETUP.md` ✅
