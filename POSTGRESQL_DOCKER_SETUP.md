# 🐘 FlashFood - PostgreSQL + Docker Setup

## ✅ **EASIEST SETUP - Just Docker!**

No need to install PostgreSQL locally. Everything runs in Docker!

---

## 🚀 **Quick Start (3 Steps)**

### **Step 1: Install Docker**

Download and install Docker Desktop:
- **Windows/Mac:** https://www.docker.com/products/docker-desktop
- **Linux:** `sudo apt install docker.io docker-compose`

Verify installation:
```bash
docker --version
docker-compose --version
```

---

### **Step 2: Create Spring Boot Project**

#### 2.1 Create project folder:
```bash
mkdir flashfood-backend
cd flashfood-backend
```

#### 2.2 Copy these files from `backend/` folder:
- ✅ `pom.xml`
- ✅ `application.properties`
- ✅ `docker-compose.yml`
- ✅ `Dockerfile`
- ✅ `init.sql`
- ✅ `FlashFoodApplication.java`
- ✅ All Java classes from `models.md` and `repositories-services-controllers.md`

Your structure should be:
```
flashfood-backend/
├── pom.xml
├── docker-compose.yml
├── Dockerfile
├── init.sql
└── src/
    └── main/
        ├── java/
        │   └── com/flashfood/
        │       ├── FlashFoodApplication.java
        │       ├── controller/
        │       ├── service/
        │       ├── repository/
        │       └── model/
        └── resources/
            └── application.properties
```

---

### **Step 3: Build & Run with Docker**

#### Option A: Run with Docker Compose (EASIEST!)

```bash
# Start PostgreSQL + Spring Boot
docker-compose up -d

# View logs
docker-compose logs -f

# Stop everything
docker-compose down
```

**That's it!** 🎉

- PostgreSQL running on: `localhost:5432`
- Spring Boot API on: `http://localhost:8080`

#### Option B: Run Manually

```bash
# 1. Start only PostgreSQL
docker-compose up -d postgres

# 2. Wait 10 seconds for PostgreSQL to start

# 3. Run Spring Boot locally
mvn spring-boot:run
```

---

## 🎯 **No Local Installation Needed!**

### **What Docker Does:**
✅ Downloads PostgreSQL image automatically  
✅ Creates database `flashfood_db`  
✅ Creates user `flashfood` with password `flashfood123`  
✅ Runs initialization script  
✅ Builds Spring Boot app in container  
✅ Connects everything automatically  

### **You Don't Need:**
❌ PostgreSQL installation  
❌ Manual database creation  
❌ Complex configuration  
❌ PgAdmin (but you can add if needed)  

---

## 🔧 **Configuration Details**

### **Database:**
- **Host:** localhost
- **Port:** 5432
- **Database:** flashfood_db
- **Username:** flashfood
- **Password:** flashfood123

### **Spring Boot:**
- **Port:** 8080
- **API:** http://localhost:8080/api

### **Hibernate:**
- **DDL Auto:** update (creates tables automatically)
- **Dialect:** PostgreSQLDialect

---

## 📝 **Useful Commands**

### **Docker Compose:**
```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Remove everything (including data)
docker-compose down -v

# Rebuild containers
docker-compose up -d --build
```

### **Database Commands:**
```bash
# Connect to PostgreSQL
docker exec -it flashfood-postgres psql -U flashfood -d flashfood_db

# Inside psql:
\dt              # List tables
\d users         # Describe users table
SELECT * FROM users;
\q               # Quit
```

### **Spring Boot:**
```bash
# Build
mvn clean install

# Run
mvn spring-boot:run

# Package JAR
mvn clean package
```

---

## 🧪 **Test the Setup**

### **1. Start Everything:**
```bash
docker-compose up -d
```

### **2. Check PostgreSQL:**
```bash
docker exec -it flashfood-postgres psql -U flashfood -d flashfood_db -c "\dt"
```

Should show: "Did not find any relations" (normal before first API call)

### **3. Test Spring Boot:**

Wait ~30 seconds for Spring Boot to start, then:

```bash
# Test health
curl http://localhost:8080/api/auth/current

# Should return: "Not authenticated" (this is correct!)
```

### **4. Register a user via API:**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "phone": "9876543210",
    "currentCity": "Bangalore"
  }'
```

### **5. Check database:**
```bash
docker exec -it flashfood-postgres psql -U flashfood -d flashfood_db -c "SELECT * FROM users;"
```

Should show the registered user! ✅

---

## 🌐 **Connect React Frontend**

### Update `src/contexts/AppContext.tsx`:

Replace localStorage with API calls:

```typescript
const API_URL = 'http://localhost:8080/api';

const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    if (data.success) {
      setUser(data.user);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

// Similar for other functions...
```

Then run React:
```bash
npm run dev
```

---

## 🐛 **Troubleshooting**

### **Issue: Port 5432 already in use**
```bash
# Stop local PostgreSQL
sudo systemctl stop postgresql

# Or change port in docker-compose.yml
ports:
  - "5433:5432"  # Use 5433 instead
```

### **Issue: Backend can't connect to DB**
```bash
# Check if PostgreSQL is running
docker-compose ps

# View PostgreSQL logs
docker-compose logs postgres

# Restart
docker-compose restart postgres
```

### **Issue: Tables not created**
```bash
# Check application.properties
spring.jpa.hibernate.ddl-auto=update  # Should be 'update' not 'none'

# Restart backend
docker-compose restart backend
```

### **Issue: Docker not starting**
```bash
# Remove old containers
docker-compose down -v

# Rebuild
docker-compose up -d --build
```

---

## 📊 **Database Schema**

Tables auto-created by Hibernate:
1. **users** - User accounts
2. **addresses** - Delivery addresses
3. **restaurants** - Restaurant details
4. **menu_items** - Food items
5. **orders** - Customer orders
6. **order_items** - Items in orders

All with proper foreign keys and relationships!

---

## 🎯 **Production Tips**

### **Use Environment Variables:**

Create `.env` file:
```env
POSTGRES_USER=flashfood
POSTGRES_PASSWORD=your_secure_password_here
POSTGRES_DB=flashfood_db
```

Update `docker-compose.yml`:
```yaml
environment:
  POSTGRES_USER: ${POSTGRES_USER}
  POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
  POSTGRES_DB: ${POSTGRES_DB}
```

### **Backup Database:**
```bash
docker exec flashfood-postgres pg_dump -U flashfood flashfood_db > backup.sql
```

### **Restore Database:**
```bash
docker exec -i flashfood-postgres psql -U flashfood -d flashfood_db < backup.sql
```

---

## ✅ **Advantages of PostgreSQL + Docker**

### **PostgreSQL Benefits:**
✅ More robust than MySQL  
✅ Better JSON support  
✅ Advanced features  
✅ Open source  
✅ Great for production  

### **Docker Benefits:**
✅ No local installation  
✅ Consistent environment  
✅ Easy cleanup  
✅ One command setup  
✅ Perfect for development  

---

## 🚀 **Full Stack Running:**

### **Backend:**
```bash
cd flashfood-backend
docker-compose up -d
# PostgreSQL + Spring Boot running
```

### **Frontend:**
```bash
cd flashfood-frontend
npm run dev
# React running on http://localhost:5173
```

### **Architecture:**
```
React Frontend (5173)
    ↓ HTTP
Spring Boot API (8080)
    ↓ JDBC
PostgreSQL (5432 - in Docker)
```

---

## 🎉 **You're Ready!**

### **Quick Commands:**
```bash
# Start everything
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop everything
docker-compose down

# Access database
docker exec -it flashfood-postgres psql -U flashfood -d flashfood_db
```

---

## 📞 **API Endpoints (After Start):**

- POST `http://localhost:8080/api/auth/register`
- POST `http://localhost:8080/api/auth/login`
- GET `http://localhost:8080/api/restaurants`
- GET `http://localhost:8080/api/restaurants/city/Bangalore`
- GET `http://localhost:8080/api/menu/restaurant/1`
- POST `http://localhost:8080/api/orders`
- GET `http://localhost:8080/api/orders`

All endpoints ready with PostgreSQL database! 🎊

---

**🐘 PostgreSQL + 🐳 Docker = Perfect Combo!**

**Just run:** `docker-compose up -d`

**Everything works!** ✅
