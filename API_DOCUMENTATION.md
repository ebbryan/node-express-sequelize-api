# API Documentation - Node.js Express Sequelize API

## Overview

This document provides comprehensive documentation for the RESTful API built with Node.js, Express.js, Sequelize ORM, and PostgreSQL. The API manages todo items, users, and roles with full CRUD operations.

## Base URL

```
http://localhost:3000
```

## Authentication

Currently, the API does not require authentication. All endpoints are publicly accessible. Future implementations may include JWT-based authentication.

## Response Format

All API responses follow a consistent JSON format:

```json
{
  "data": [/* array of objects */],
  "success": true|false
}
```

Error responses include appropriate HTTP status codes and error messages.

## Todo Management

### Get All Todos

Retrieve all active todos (excluding archived items).

- **Endpoint**: `GET /todos/get`
- **Description**: Returns all non-archived todos
- **Response**:
  ```json
  {
    "data": [
      {
        "id": "uuid",
        "title": "string",
        "status": "pending|in_progress|completed|archived",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
      }
    ],
    "success": true
  }
  ```

### Create Todo

Create a new todo item.

- **Endpoint**: `POST /todos/create`
- **Request Body**:
  ```json
  {
    "title": "Sample Todo",
    "status": "pending" // Optional, defaults to "pending"
  }
  ```
- **Validation**: Prevents duplicate titles
- **Response**: Returns the created todo with success status

### Update Todo

Update an existing todo by ID.

- **Endpoint**: `PATCH /todos/update/:id`
- **Parameters**: `id` (UUID) - The todo identifier
- **Request Body**:
  ```json
  {
    "title": "Updated Title", // Optional
    "status": "completed" // Optional
  }
  ```
- **Response**: Returns the updated todo

### Archive Todo (Soft Delete)

Archive a todo by setting its status to archived.

- **Endpoint**: `PATCH /todos/:id/archive`
- **Parameters**: `id` (UUID) - The todo identifier
- **Response**: Returns the archived todo

## User Management

### Get All Users

Retrieve all users with their associated roles.

- **Endpoint**: `GET /users/`
- **Description**: Returns all users with role information (password and role_id fields excluded for security)
- **Response**:
  ```json
  {
    "data": [
      {
        "id": "uuid",
        "first_name": "string",
        "last_name": "string",
        "email": "string",
        "status": "active|in_active|archived",
        "role": {
          "id": "uuid",
          "name": "string"
        },
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
      }
    ],
    "success": true
  }
  ```

### Create User

Create a new user with hashed password.

- **Endpoint**: `POST /users/create`
- **Request Body**:
  ```json
  {
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "password": "securepassword123",
    "role_id": "uuid" // Optional, references a role
  }
  ```
- **Validation**:
  - Email must be unique
  - Email must be valid format
  - Password is automatically hashed using bcrypt
- **Response**: Returns the created user with success status (password and role_id fields excluded)

### Get User by ID

Retrieve a specific user by ID with their associated role.

- **Endpoint**: `GET /users/:id`
- **Parameters**: `id` (UUID) - The user identifier
- **Response**: Returns the user details with role information

### Update User

Update an existing user by ID.

- **Endpoint**: `PATCH /users/update/:id`
- **Parameters**: `id` (UUID) - The user identifier
- **Request Body**:
  ```json
  {
    "first_name": "Updated First Name", // Optional
    "last_name": "Updated Last Name", // Optional
    "email": "updated@example.com", // Optional
    "password": "newpassword123", // Optional (automatically hashed)
    "status": "active|in_active|archived", // Optional
    "role_id": "uuid" // Optional
  }
  ```
- **Response**: Returns the updated user with role information

### Delete User

Delete a user by ID (permanent deletion).

- **Endpoint**: `DELETE /users/delete/:id`
- **Parameters**: `id` (UUID) - The user identifier
- **Response**:
  ```json
  {
    "message": "User deleted successfully"
  }
  ```

### Verify Password

Verify if the provided password matches the user's stored password.

- **Endpoint**: `POST /users/verify-password`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "isMatch": true|false
  }
  ```

## Role Management

### Get All Roles

Retrieve all roles.

- **Endpoint**: `GET /roles/`
- **Response**:
  ```json
  {
    "data": [
      {
        "id": "uuid",
        "name": "string",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
      }
    ],
    "success": true
  }
  ```

### Get Role by ID

Retrieve a specific role by ID.

- **Endpoint**: `GET /roles/:id`
- **Parameters**: `id` (UUID) - The role identifier
- **Response**: Returns the role details

### Create Role

Create a new role.

- **Endpoint**: `POST /roles/create`
- **Request Body**:
  ```json
  {
    "name": "Sample Role"
  }
  ```
- **Validation**: Prevents duplicate role names
- **Response**: Returns the created role with success status

### Update Role

Update an existing role by ID.

- **Endpoint**: `PATCH /roles/update/:id`
- **Parameters**: `id` (UUID) - The role identifier
- **Request Body**:
  ```json
  {
    "name": "Updated Role" // Optional
  }
  ```
- **Validation**: Prevents duplicate role names
- **Response**: Returns the updated role

### Delete Role

Delete a role by ID (permanent deletion).

- **Endpoint**: `DELETE /roles/delete/:id`
- **Parameters**: `id` (UUID) - The role identifier
- **Response**:
  ```json
  {
    "message": "Role deleted successfully"
  }
  ```

## Error Handling

The API uses consistent error handling with appropriate HTTP status codes:

### Common HTTP Status Codes

- `200 OK`: Successful request
- `201 Created`: Resource successfully created
- `400 Bad Request`: Invalid input or validation error
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

### Error Response Format

```json
{
  "error": "Error message description",
  "success": false
}
```

## Data Models

### Todo Model

```typescript
interface Todo {
  id: string; // UUID
  title: string;
  status: "pending" | "in_progress" | "completed" | "archived";
  createdAt: Date;
  updatedAt: Date;
}
```

### User Model

```typescript
interface User {
  id: string; // UUID
  status: "active" | "in_active" | "archived";
  first_name: string;
  last_name: string;
  email: string;
  password: string; // Hashed
  role_id: string; // UUID (references Role.id)
  createdAt: Date;
  updatedAt: Date;
}
```

### Role Model

```typescript
interface Role {
  id: string; // UUID
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## Database Schema

### Tables

1. **todos**

   - id (UUID, Primary Key)
   - title (STRING)
   - status (ENUM: 'pending', 'in_progress', 'completed', 'archived')
   - createdAt (DATE)
   - updatedAt (DATE)

2. **users**

   - id (UUID, Primary Key)
   - status (ENUM: 'active', 'in_active', 'archived')
   - first_name (STRING)
   - last_name (STRING)
   - email (STRING, Unique)
   - password (STRING)
   - role_id (UUID, Foreign Key to roles.id)
   - createdAt (DATE)
   - updatedAt (DATE)

3. **roles**
   - id (UUID, Primary Key)
   - name (STRING)
   - createdAt (DATE)
   - updatedAt (DATE)

## Rate Limiting

Currently, the API does not implement rate limiting. Future implementations may include request rate limiting to prevent abuse.

## CORS Configuration

The API is configured to allow cross-origin requests from any domain. This can be customized in the middleware configuration.

## Security Considerations

1. **Password Hashing**: User passwords are hashed using bcrypt with 12 salt rounds
2. **Sensitive Data Exclusion**: Password and role_id fields are excluded from user responses
3. **Input Validation**: All inputs are validated both at service and controller levels
4. **SQL Injection Prevention**: Sequelize ORM provides protection against SQL injection attacks

## Testing Examples

### Using curl

```bash
# Get all todos
curl http://localhost:3000/todos/get

# Create a new todo
curl -X POST http://localhost:3000/todos/create \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Node.js", "status": "pending"}'

# Create a new user
curl -X POST http://localhost:3000/users/create \
  -H "Content-Type: application/json" \
  -d '{"first_name": "John", "last_name": "Doe", "email": "john@example.com", "password": "password123"}'

# Verify password
curl -X POST http://localhost:3000/users/verify-password \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "password123"}'

# Create a new role
curl -X POST http://localhost:3000/roles/create \
  -H "Content-Type: application/json" \
  -d '{"name": "Admin"}'
```

### Using Postman/Thunder Client

1. Set the request method (GET, POST, PATCH, DELETE)
2. Set the Content-Type header to `application/json`
3. Include the request body for POST/PATCH requests
4. Include URL parameters for endpoints requiring IDs

## Troubleshooting

### Common Issues

1. **Database Connection Errors**

   - Ensure PostgreSQL is running
   - Verify database credentials in `.env` file
   - Check if the database exists

2. **Port Conflicts**

   - Change the `SERVER_PORT` in `.env` if port 3000 is already in use

3. **Validation Errors**

   - Check that all required fields are provided
   - Ensure email format is valid
   - Verify that unique constraints are not violated

4. **UUID Format**
   - Ensure all UUID parameters are in the correct format (e.g., 123e4567-e89b-12d3-a456-426614174000)

## Future Enhancements

1. **Authentication**: JWT-based authentication system
2. **Authorization**: Role-based access control
3. **Pagination**: Support for large datasets
4. **Search & Filter**: Advanced query capabilities
5. **File Uploads**: Support for user avatars and todo attachments
6. **Email Verification**: User registration confirmation
7. **Password Reset**: Secure password recovery mechanism
8. **API Versioning**: Support for multiple API versions
9. **Rate Limiting**: Request throttling
10. **API Documentation**: Swagger/OpenAPI integration

## Support

For issues or questions regarding this API:

1. Check the console logs for detailed error messages
2. Verify all environment variables are properly set
3. Ensure database migrations are applied
4. Review this documentation for endpoint specifications

---

_Last Updated: [Current Date]_
_API Version: 1.0.0_
