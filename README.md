# BlogHub – Spring Boot Blog Application

BlogHub is a full-stack blog application built using **Spring Boot** for backend and **HTML, CSS, and JavaScript** for frontend.  
The project supports **User and Admin roles**, authentication using a **Login Interceptor**, and **Role-Based Access Control (RBAC)**.

---

## 🚀 Features

### 👤 User Features
- User Registration
- User Login & Logout
- Session-based authentication
- View blog posts by category
- Create blog posts (after login)

### 🛠 Admin Features
- Admin Login
- Create, Update, Delete Categories
- Manage all blog posts
- Admin-only APIs protected using Role-Based Access Control

---

## 🔐 Authentication & Role-Based Access Control (RBAC)

- **Spring Security is NOT used**
- Authentication is implemented using **Spring Boot Interceptor**
- **Role-Based Access Control (RBAC)** is applied:
  - Admin can access category & admin-specific APIs
  - Users can access only user-allowed APIs
- Interceptor validates:
  - Login session
  - User role (ADMIN / USER)
- Unauthorized access returns proper error responses

---

## 🧩 Backend Tech Stack

- Java
- Spring Boot
- Spring MVC
- Spring Data JPA
- Hibernate
- MySQL
- REST APIs
- Spring Boot Interceptor (Authentication + RBAC)

---

## 🎨 Frontend Tech Stack

- HTML
- CSS
- JavaScript
- Fetch API

Frontend handles:
- Login & Registration UI
- Blog listing
- Category-based filtering
- Secure API integration with backend

---

## 📬 API Testing

- All APIs are tested using **Postman**
- API request & response screenshots are included
- APIs covered:
  - User Registration
  - User Login / Logout
  - Admin Login
  - Category CRUD (Admin only)
  - Post CRUD
  - Role-based authorization checks

---

## 📁 Project Structure
```
BlogHubApp
│
├── src/main/java
│   └── in.scalive
│       ├── config
│       │   └── WebConfig.java
│       │
│       ├── controller
│       │   ├── AuthController.java
│       │   ├── AuthorController.java
│       │   ├── CategoryController.java
│       │   └── PostController.java
│       │
│       ├── dto
│       │   ├── AuthResponseDTO.java
│       │   ├── LoginRequestDTO.java
│       │   ├── RegisterRequestDTO.java
│       │   ├── CategoryRequestDTO.java
│       │   ├── CategoryResponseDTO.java
│       │   ├── CategoryUpdateDTO.java
│       │   ├── PostRequestDTO.java
│       │   ├── PostResponseDTO.java
│       │   └── PostUpdateDTO.java
│       │
│       ├── entity
│       │   ├── Author.java
│       │   ├── Category.java
│       │   └── Post.java
│       │
│       ├── exception
│       │   ├── GlobalExceptionHandler.java
│       │   ├── ResourceNotFoundException.java
│       │   └── ResourceAlreadyExistsException.java
│       │
│       ├── interceptor
│       │   └── SessionAuthInterceptor.java
│       │
│       ├── repository
│       │   ├── AuthorRepository.java
│       │   ├── CategoryRepository.java
│       │   └── PostRepository.java
│       │
│       ├── service
│       │   ├── AuthService.java
│       │   ├── AuthorService.java
│       │   ├── CategoryService.java
│       │   └── PostService.java
│       │
│       └── BlogHubAppApplication.java
│
├── src/main/resources
│   ├── static
│   │   ├── css
│   │   │   └── style.css
│   │   ├── js
│   │   ├── index.html
│   │   ├── login.html
│   │   ├── register.html
│   │   ├── categories.html
│   │   ├── category-create.html
│   │   ├── posts.html
│   │   ├── post.html
│   │   ├── post-create.html
│   │   ├── post-update.html
│   │   ├── users.html
│   │   └── user-create.html
│   │
│   └── application.properties
│
└── README.md
```
