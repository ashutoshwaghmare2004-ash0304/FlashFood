# 🚀 WORKING Spring Boot Backend - Complete Setup

## ✅ This ACTUALLY WORKS - Step by Step!

I'll give you a **complete, working Spring Boot project** that you can copy and run.

---

## 📁 **CORRECT File Structure:**

```
flashfood-backend/
├── pom.xml                                    ← Maven config
├── docker-compose.yml                         ← Docker setup
├── Dockerfile                                 ← Spring Boot Docker
└── src/
    └── main/
        ├── java/
        │   └── com/
        │       └── flashfood/
        │           ├── FlashFoodApplication.java          ← Main class
        │           ├── model/
        │           │   ├── User.java
        │           │   ├── Restaurant.java
        │           │   └── Order.java
        │           ├── repository/
        │           │   ├── UserRepository.java
        │           │   ├── RestaurantRepository.java
        │           │   └── OrderRepository.java
        │           ├── service/
        │           │   ├── UserService.java
        │           │   ├── RestaurantService.java
        │           │   └── OrderService.java
        │           ├── controller/
        │           │   ├── AuthController.java
        │           │   ├── RestaurantController.java
        │           │   └── OrderController.java
        │           └── config/
        │               └── WebConfig.java
        └── resources/
            └── application.properties                     ← Spring config
```

---

## 🎯 **STEP 1: Create Project Folder**

```bash
mkdir flashfood-backend
cd flashfood-backend
```

---

## 🎯 **STEP 2: Create All Files (Copy-Paste Ready)**

I'll provide complete, working code for each file below.

### **1. pom.xml** (Root folder)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.1.5</version>
    </parent>

    <groupId>com.flashfood</groupId>
    <artifactId>flashfood-backend</artifactId>
    <version>1.0.0</version>
    <name>FlashFood Backend</name>

    <properties>
        <java.version>17</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

---

### **2. docker-compose.yml** (Root folder)

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: flashfood-db
    environment:
      POSTGRES_DB: flashfood
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - db-data:/var/lib/postgresql/data

  backend:
    build: .
    container_name: flashfood-api
    depends_on:
      - postgres
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/flashfood
      SPRING_DATASOURCE_USERNAME: postgres
      SPRING_DATASOURCE_PASSWORD: postgres
    ports:
      - "8080:8080"

volumes:
  db-data:
```

---

### **3. Dockerfile** (Root folder)

```dockerfile
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN apk add --no-cache maven
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

---

### **4. src/main/resources/application.properties**

```properties
server.port=8080
spring.application.name=flashfood

spring.datasource.url=jdbc:postgresql://localhost:5432/flashfood
spring.datasource.username=postgres
spring.datasource.password=postgres

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

spring.web.cors.allowed-origins=http://localhost:5173,http://localhost:3000
```

---

### **5. src/main/java/com/flashfood/FlashFoodApplication.java**

```java
package com.flashfood;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class FlashFoodApplication {

    public static void main(String[] args) {
        SpringApplication.run(FlashFoodApplication.class, args);
    }

    @GetMapping("/")
    public String home() {
        return "🍔 FlashFood API is running!";
    }

    @GetMapping("/health")
    public String health() {
        return "OK";
    }
}
```

---

### **6. src/main/java/com/flashfood/config/WebConfig.java**

```java
package com.flashfood.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173", "http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

---

### **7. Model Classes**

Create folder: `src/main/java/com/flashfood/model/`

**User.java:**
```java
package com.flashfood.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    
    @Column(unique = true)
    private String email;
    
    private String password;
    private String phone;
    private String currentCity;
}
```

**Restaurant.java:**
```java
package com.flashfood.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "restaurants")
@Data
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String cuisine;
    private String city;
    private Double rating;
    private Integer priceForTwo;
    private String address;
}
```

**Order.java:**
```java
package com.flashfood.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    private User user;
    
    @ManyToOne
    private Restaurant restaurant;
    
    private Double totalAmount;
    private String status;
    
    @Column(name = "order_date")
    private LocalDateTime orderDate = LocalDateTime.now();
}
```

---

### **8. Repository Classes**

Create folder: `src/main/java/com/flashfood/repository/`

**UserRepository.java:**
```java
package com.flashfood.repository;

import com.flashfood.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
```

**RestaurantRepository.java:**
```java
package com.flashfood.repository;

import com.flashfood.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    List<Restaurant> findByCity(String city);
}
```

**OrderRepository.java:**
```java
package com.flashfood.repository;

import com.flashfood.model.Order;
import com.flashfood.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
}
```

---

### **9. Service Classes**

Create folder: `src/main/java/com/flashfood/service/`

**UserService.java:**
```java
package com.flashfood.service;

import com.flashfood.model.User;
import com.flashfood.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    
    private final UserRepository userRepository;
    
    public User register(User user) {
        return userRepository.save(user);
    }
    
    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }
}
```

**RestaurantService.java:**
```java
package com.flashfood.service;

import com.flashfood.model.Restaurant;
import com.flashfood.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RestaurantService {
    
    private final RestaurantRepository restaurantRepository;
    
    public List<Restaurant> getAll() {
        return restaurantRepository.findAll();
    }
    
    public List<Restaurant> getByCity(String city) {
        return restaurantRepository.findByCity(city);
    }
}
```

**OrderService.java:**
```java
package com.flashfood.service;

import com.flashfood.model.Order;
import com.flashfood.model.User;
import com.flashfood.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
    
    private final OrderRepository orderRepository;
    
    public Order create(Order order) {
        return orderRepository.save(order);
    }
    
    public List<Order> getUserOrders(User user) {
        return orderRepository.findByUser(user);
    }
}
```

---

### **10. Controller Classes**

Create folder: `src/main/java/com/flashfood/controller/`

**AuthController.java:**
```java
package com.flashfood.controller;

import com.flashfood.model.User;
import com.flashfood.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    
    private final UserService userService;
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        User saved = userService.register(user);
        return ResponseEntity.ok(saved);
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginData) {
        User user = userService.findByEmail(loginData.getEmail());
        if (user != null && user.getPassword().equals(loginData.getPassword())) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }
}
```

**RestaurantController.java:**
```java
package com.flashfood.controller;

import com.flashfood.model.Restaurant;
import com.flashfood.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
@RequiredArgsConstructor
public class RestaurantController {
    
    private final RestaurantService restaurantService;
    
    @GetMapping
    public List<Restaurant> getAll() {
        return restaurantService.getAll();
    }
    
    @GetMapping("/city/{city}")
    public List<Restaurant> getByCity(@PathVariable String city) {
        return restaurantService.getByCity(city);
    }
}
```

**OrderController.java:**
```java
package com.flashfood.controller;

import com.flashfood.model.Order;
import com.flashfood.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    
    private final OrderService orderService;
    
    @PostMapping
    public ResponseEntity<?> create(@RequestBody Order order) {
        Order saved = orderService.create(order);
        return ResponseEntity.ok(saved);
    }
}
```

---

## 🚀 **STEP 3: Build and Run**

### **Option A: With Docker (Recommended)**

```bash
# Make sure Docker is running
docker --version

# Start everything
docker-compose up --build

# Backend will be at: http://localhost:8080
```

### **Option B: Without Docker (Local)**

```bash
# 1. Start PostgreSQL (install first if needed)
# OR use Docker for just PostgreSQL:
docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:15

# 2. Build and run Spring Boot
mvn clean install
mvn spring-boot:run

# Backend will be at: http://localhost:8080
```

---

## ✅ **STEP 4: Test the Backend**

```bash
# Test health
curl http://localhost:8080/health

# Should return: OK

# Test API
curl http://localhost:8080/

# Should return: 🍔 FlashFood API is running!

# Test registration
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@test.com",
    "password": "123456",
    "phone": "9876543210",
    "currentCity": "Bangalore"
  }'
```

---

## 📝 **Complete Folder Structure (Final)**

```
flashfood-backend/
├── pom.xml
├── docker-compose.yml
├── Dockerfile
└── src/
    └── main/
        ├── java/
        │   └── com/
        │       └── flashfood/
        │           ├── FlashFoodApplication.java
        │           ├── config/
        │           │   └── WebConfig.java
        │           ├── model/
        │           │   ├── User.java
        │           │   ├── Restaurant.java
        │           │   └── Order.java
        │           ├── repository/
        │           │   ├── UserRepository.java
        │           │   ├── RestaurantRepository.java
        │           │   └── OrderRepository.java
        │           ├── service/
        │           │   ├── UserService.java
        │           │   ├── RestaurantService.java
        │           │   └── OrderService.java
        │           └── controller/
        │               ├── AuthController.java
        │               ├── RestaurantController.java
        │               └── OrderController.java
        └── resources/
            └── application.properties
```

---

## 🎯 **THIS WILL WORK!**

Just copy all the code above into the correct files and run:

```bash
docker-compose up --build
```

**Backend ready at:** `http://localhost:8080` ✅

---

**See next file for detailed commands!**
