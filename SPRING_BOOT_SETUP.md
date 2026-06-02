# 🔧 Flash Food - Complete Spring Boot Backend Setup

## 📋 Project Structure

Create this folder structure on your local machine:

```
flashfood-backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── flashfood/
│   │   │           ├── FlashFoodApplication.java
│   │   │           ├── controller/
│   │   │           │   ├── AuthController.java
│   │   │           │   ├── RestaurantController.java
│   │   │           │   ├── MenuController.java
│   │   │           │   ├── OrderController.java
│   │   │           │   └── UserController.java
│   │   │           ├── service/
│   │   │           │   ├── UserService.java
│   │   │           │   ├── RestaurantService.java
│   │   │           │   ├── MenuService.java
│   │   │           │   └── OrderService.java
│   │   │           ├── repository/
│   │   │           │   ├── UserRepository.java
│   │   │           │   ├── RestaurantRepository.java
│   │   │           │   ├── MenuItemRepository.java
│   │   │           │   └── OrderRepository.java
│   │   │           ├── model/
│   │   │           │   ├── User.java
│   │   │           │   ├── Address.java
│   │   │           │   ├── Restaurant.java
│   │   │           │   ├── MenuItem.java
│   │   │           │   ├── Order.java
│   │   │           │   ├── OrderItem.java
│   │   │           │   └── CartItem.java
│   │   │           ├── dto/
│   │   │           │   ├── LoginRequest.java
│   │   │           │   ├── RegisterRequest.java
│   │   │           │   ├── OrderRequest.java
│   │   │           │   └── OrderResponse.java
│   │   │           └── config/
│   │   │               └── WebConfig.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── data.sql
│   └── test/
├── pom.xml
└── Dockerfile
```

## 🚀 Quick Start

### 1. Create Spring Boot Project

```bash
# Using Spring Initializr (https://start.spring.io/)
# Or use the pom.xml I'll provide below
```

### 2. Copy All Files

Copy all the Java files I'm providing into the correct folders.

### 3. Setup MySQL

```sql
CREATE DATABASE flashfood_db;
CREATE USER 'flashfood'@'localhost' IDENTIFIED BY 'flashfood123';
GRANT ALL PRIVILEGES ON flashfood_db.* TO 'flashfood'@'localhost';
FLUSH PRIVILEGES;
```

### 4. Run Application

```bash
mvn spring-boot:run
```

### 5. API Available at

```
http://localhost:8080
```

---

## 📝 Files to Create

I'll create all the necessary files below. Copy each file to your local Spring Boot project.
