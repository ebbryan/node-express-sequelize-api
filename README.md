# Node.js Express Sequelize Todo, User, and Role API

A robust and scalable RESTful API for managing todo items, users, and roles, built with Node.js, Express.js, Sequelize ORM, and PostgreSQL. This API follows clean architecture principles with separation of concerns and is designed for easy maintenance and future expansion.

## 🚀 Features

- **CRUD Operations**: Full Create, Read, Update, and Soft Delete functionality for todos, users, and roles
- **UUID Identifiers**: Secure UUID-based primary keys
- **Status Management**: Comprehensive status system with `pending`, `in_progress`, `completed`, and `archived` states for todos
- **Soft Delete**: Archive todos instead of permanent deletion
- **Input Validation**: Built-in validation for duplicate titles in todos
- **Error Handling**: Comprehensive error handling with appropriate HTTP status codes
- **CORS Enabled**: Ready for cross-origin requests
- **Environment Configuration**: Easy configuration through environment variables

## 📦 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **ORM**: Sequelize
- **Database**: PostgreSQL
- **Environment**: dotenv for configuration
- **Development**: Nodemon for hot reloading

## 🏗️ Project Structure

```
node-express-sequelize-api/
├── config/
│   ├── associations.js       # Associations between models
│   ├── db-init.js            # Database initialization
│   └── sequelize.js          # Database configuration
├── src/
│   ├── role/                 # Role module
│   │   ├── role.controller.js # Role business logic
│   │   ├── role.model.js      # Role Sequelize model definition
│   │   ├── role.routes.js     # Role route definitions
│   │   └── role.service.js    # Role service layer
│   ├── todo/                 # Todo module
│   │   ├── todo.model.js     # Todo Sequelize model definition
│   │   ├── todo.service.js   # Todo business logic
│   │   ├── todo.controller.js # Todo HTTP request handlers
│   │   └── todo.routes.js    # Todo route definitions
│   ├── user/                 # User module
│   │   ├── user.controller.js # User business logic
│   │   ├── user.models.js     # User Sequelize model definition
│   │   ├── user.routes.js     # User route definitions
│   │   └── user.service.js    # User service layer
├── app.js                    # Main application entry point
├── middleware.js             # Custom middleware functions
├── package.json              # Dependencies and scripts
├── .env                      # Environment variables (create this)
├── .gitignore               # Git ignore rules
└── README.md                 # This file
```

## 📋 API Endpoints

### Todo Management

#### Get All Todos

- **Endpoint**: `GET /todos/get`
- **Description**: Retrieve all active todos (excluding archived items)
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

#### Create Todo

- **Endpoint**: `POST /todos/create`
- **Description**: Create a new todo item
- **Request Body**:
  ```json
  {
    "title": "Sample Todo",
    "status": "pending" // Optional, defaults to "pending"
  }
  ```
- **Validation**: Prevents duplicate titles
- **Response**: Returns the created todo with success status

#### Update Todo

- **Endpoint**: `PATCH /todos/update/:id`
- **Description**: Update an existing todo by ID
- **Parameters**: `id` (UUID) - The todo identifier
- **Request Body**:
  ```json
  {
    "title": "Updated Title", // Optional
    "status": "completed" // Optional
  }
  ```
- **Response**: Returns the updated todo

#### Archive Todo (Soft Delete)

- **Endpoint**: `PATCH /todos/:id/archive`
- **Description**: Archive a todo (soft delete by setting status to archived)
- **Parameters**: `id` (UUID) - The todo identifier
- **Response**: Returns the archived todo

### User Management

#### Get All Users

- **Endpoint**: `GET /users/`
- **Description**: Retrieve all users
- **Response**:
  ```json
  {
    "data": [
      {
        "id": "uuid",
        "name": "string",
        "email": "string",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
      }
    ],
    "success": true
  }
  ```

#### Create User

- **Endpoint**: `POST /users/create`
- **Description**: Create a new user
- **Request Body**:
  ```json
  {
    "name": "Sample User",
    "email": "user@example.com"
  }
  ```
- **Response**: Returns the created user with success status

#### Get User by ID

- **Endpoint**: `GET /users/:id`
- **Description**: Retrieve a user by ID
- **Parameters**: `id` (UUID) - The user identifier
- **Response**: Returns the user details

#### Update User

- **Endpoint**: `PATCH /users/update/:id`
- **Description**: Update an existing user by ID
- **Parameters**: `id` (UUID) - The user identifier
- **Request Body**:
  ```json
  {
    "name": "Updated Name", // Optional
    "email": "updated@example.com" // Optional
  }
  ```
- **Response**: Returns the updated user

#### Delete User

- **Endpoint**: `DELETE /users/delete/:id`
- **Description**: Delete a user by ID
- **Parameters**: `id` (UUID) - The user identifier
- **Response**: Returns a success message

### Role Management

#### Get All Roles

- **Endpoint**: `GET /roles/get`
- **Description**: Retrieve all roles
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

#### Create Role

- **Endpoint**: `POST /roles/create`
- **Description**: Create a new role
- **Request Body**:
  ```json
  {
    "name": "Sample Role"
  }
  ```
- **Response**: Returns the created role with success status

#### Update Role

- **Endpoint**: `PATCH /roles/update/:id`
- **Description**: Update an existing role by ID
- **Parameters**: `id` (UUID) - The role identifier
- **Request Body**:
  ```json
  {
    "name": "Updated Role" // Optional
  }
  ```
- **Response**: Returns the updated role

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

### Step-by-Step Setup

1. **Clone and Navigate**

   ```bash
   git clone git@github.com:ebbryan/node-express-sequelize-api.git
   cd node-express-sequelize-api
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Database Setup**

   ```bash
   # Create PostgreSQL database
   createdb todo-db
   ```

4. **Environment Configuration**
   Create a `.env` file in the root directory:

   ```env
   DB_NAME=todo-db
   DB_USER=postgres
   DB_PASS=your_password
   DB_HOST=localhost
   DB_PORT=5432
   SERVER_PORT=3000
   NODE_ENV=development
   ```

5. **Start the Application**

   ```bash
   # Development mode with hot reload
   npm run dev

   # Or for production
   npm start
   ```

## 🧪 Testing the API

You can test the API using tools like curl, Postman, or Thunder Client:

```bash
# Get all todos
curl http://localhost:3000/todos/get

# Create a new todo
curl -X POST http://localhost:3000/todos/create \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Node.js", "status": "pending"}'

# Update a todo
curl -X PATCH http://localhost:3000/todos/update/123e4567-e89b-12d3-a456-426614174000 \
  -H "Content-Type: application/json" \
  -d '{"status": "completed"}'

# Archive a todo
curl -X PATCH http://localhost:3000/todos/123e4567-e89b-12d3-a456-426614174000/archive

# Get all users
curl http://localhost:3000/users/

# Create a new user
curl -X POST http://localhost:3000/users/create \
  -H "Content-Type: application/json" \
  -d '{"name": "Sample User", "email": "user@example.com"}'

# Update a user
curl -X PATCH http://localhost:3000/users/update/123e4567-e89b-12d3-a456-426614174000 \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated User"}'

# Delete a user
curl -X DELETE http://localhost:3000/users/delete/123e4567-e89b-12d3-a456-426614174000

# Get all roles
curl http://localhost:3000/roles/get

# Create a new role
curl -X POST http://localhost:3000/roles/create \
  -H "Content-Type: application/json" \
  -d '{"name": "Sample Role"}'

# Update a role
curl -X PATCH http://localhost:3000/roles/update/123e4567-e89b-12d3-a456-426614174000 \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Role"}'
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Code Style & Best Practices

This project follows these architectural patterns:

1. **Separation of Concerns**:

   - Routes handle HTTP requests
   - Controllers manage request/response logic
   - Services contain business logic
   - Models define data structure

2. **Error Handling**: Comprehensive try-catch blocks with appropriate HTTP status codes

3. **Validation**: Input validation at both service and controller levels

## 🚀 Deployment

### Production Deployment

1. **Environment Setup**

   ```bash
   # Set production environment
   NODE_ENV=production
   ```

2. **Database Configuration**

   - Update `.env` with production database credentials
   - Ensure PostgreSQL is running in production mode

3. **Start Application**
   ```bash
   npm start
   ```

### Docker Deployment (Future Ready)

```dockerfile
# Example Dockerfile for future implementation
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 📈 Scalability Considerations

### Current Architecture Benefits

- **Modular Structure**: Easy to add new features as separate modules
- **Service Layer**: Business logic is separated from HTTP handling
- **ORM Abstraction**: Database-agnostic design through Sequelize

### Future Enhancements

1. **Authentication**: JWT-based authentication system
2. **User-Role Associations**: Link users to specific roles
3. **Pagination**: Add pagination for large datasets
4. **Search & Filter**: Advanced filtering and search capabilities
5. **WebSocket Support**: Real-time updates
6. **Testing Suite**: Unit and integration tests
7. **API Documentation**: Swagger/OpenAPI documentation
8. **Rate Limiting**: Request rate limiting
9. **Logging**: Enhanced logging with Winston/Morgan
10. **Monitoring**: Health checks and performance monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section below
2. Review the API documentation
3. Create an issue in the GitHub repository

## 🔍 Troubleshooting

### Common Issues

1. **Database Connection Error**

   - Ensure PostgreSQL is running
   - Verify database credentials in `.env`
   - Check if database exists: `createdb todo-db`

2. **Port Already in Use**

   - Change `SERVER_PORT` in `.env`
   - Or kill the process using the port

3. **Module Not Found**
   - Run `npm install` to install dependencies

### Getting Help

- Check the console logs for detailed error messages
- Ensure all environment variables are properly set
- Verify database migrations are applied

---

**Built with ❤️ using Node.js, Express, and Sequelize**
