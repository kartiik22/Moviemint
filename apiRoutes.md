# API Endpoints (Localhost)

## Authentication

- **POST http://localhost:5000/auth/signup**  
  → Register a new user.

- **POST http://localhost:5000/auth/login**  
  → Login and receive a JWT token.

---

## Show Management

- **GET http://localhost:5000/shows**  
  → Get all shows (admins see full data, users don't see `url`).

- **GET http://localhost:5000/shows/:id**  
  → Get one show by ID (admins see `url`, users don’t).

- **POST http://localhost:5000/shows** *(Admin only)*  
  → Create a new show.

- **PUT http://localhost:5000/shows/:id** *(Admin only)*  
  → Update a show by ID.

- **DELETE http://localhost:5000/shows/:id** *(Admin only)*  
  → Delete a show by ID.
