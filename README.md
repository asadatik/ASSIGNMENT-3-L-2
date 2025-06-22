
# 📚 Library Management API

A RESTful API for managing a library system, built using **Express.js**, **TypeScript**, and **MongoDB** (via Mongoose).  
It allows managing books, borrowing records, and availability status using proper schema validation, static methods, and aggregation.

---
##  Live link(https://mongose.vercel.app)
---
## 🚀 Tech Stack

- **Backend**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB + Mongoose
- **Validation**: Mongoose Schema
- **Linting**: ESLint (Flat Config)

---

## ⚙️ Project Setup

### 🔹 Clone the repository

```bash
git clone https://github.com/asadatik/ASSIGNMENT-3-L-2.git
cd ASSIGNMENT-3-L-2
```

### 🔹 Install dependencies

```bash
npm install
```

### 🔹 Set up environment variables

Create a `.env` file and add:

```
DB_USER = 
DB_PASS =
```

### 🔹 Run the project

```bash
npm run dev
```

---

## 📘 API Endpoints

### ✅ 1. Create a Book
**POST** `/api/books`

**Request Body:**
```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

---

### ✅ 2. Get All Books
**GET** `/api/books`

**Query Params:**
- `filter`: Filter by genre (e.g., `FANTASY`)
- `sortBy`: Field to sort by (e.g., `createdAt`)
- `sort`: `asc` or `desc`
- `limit`: Number of results (default 10)

**Example:**
```
GET /api/books?filter=SCIENCE&sortBy=createdAt&sort=desc&limit=5
```

---

### ✅ 3. Get Book by ID
**GET** `/api/books/:bookId`

---

### ✅ 4. Update a Book
**PUT** `/api/books/:bookId`

**Request Body:**
```json
{
  "copies": 10
}
```

---

### ✅ 5. Delete a Book
**DELETE** `/api/books/:bookId`

---

### ✅ 6. Borrow a Book
**POST** `/api/borrow`

**Request Body:**
```json
{
  "book": "bookObjectId",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

---

### ✅ 7. Borrowed Book Summary
**GET** `/api/borrow`

**Returns:**
```json
[
  {
    "book": {
      "title": "The Theory of Everything",
      "isbn": "9780553380163"
    },
    "totalQuantity": 5
  }
]
```

---

## 🔐 Validation & Business Logic

- Mongoose Schema Validation for all fields.
- `copies` must be ≥ 0.
- `available` auto-updates if copies reach 0.
- Borrow operation uses `pre`/`post` middleware.
- Aggregation pipeline used for borrow summary.
- Static method used to update book availability.

---

## 📦 Bonus Features

- ESLint Flat Config with TypeScript support
- Auto error response format
- Clean & modular folder structure

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

