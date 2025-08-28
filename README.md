# Node.js Express TypeScript Sequelize API

A robust and scalable RESTful API for managing todo items, users, and roles, built with Node.js, Express.js, TypeScript, Sequelize ORM, and PostgreSQL. This API follows clean architecture principles with separation of concerns and is designed for easy maintenance and future expansion.

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
- **Language**: TypeScript
- **Framework**: Express.js
- **ORM**: Sequelize
- **Database**: PostgreSQL
- **Environment**: dotenv for configuration
- **Development**: Nodemon for hot reloading

## 🏗️ Project Structure

```
node-express-sequelize-api/
├── src/
│   ├── app.ts                # Main application entry point
│   ├── middleware.ts         # Custom middleware functions
│   ├── routes.ts             # Main route definitions
│   ├── config/               # Configuration files
│   │   ├── associations.ts   # Associations between models
│   │   ├── db-init.ts        # Database initialization
│   │   └── sequelize.ts      # Database configuration
│   ├── helpers/              # Helper functions
│   │   └── handleErrorType.ts # Error type handling utilities
│   ├── modules/              # Feature modules
│   │   ├── role/             # Role module
│   │   │   ├── role.controller.ts # Role business logic
│   │   │   ├── role.model.ts      # Role Sequelize model definition
│   │   │   ├── role.routes.ts     # Role route definitions
│   │   │   ├── role.service.ts    # Role service layer
│   │   │   └── role.validator.ts  # Role validation schemas
│   │   ├── todo/             # Todo module
│   │   │   ├── todo.controller.ts # Todo HTTP request handlers
│   │   │   ├── todo.model.ts      # Todo Sequelize model definition
│   │   │   ├── todo.routes.ts     # Todo route definitions
│   │   │   ├── todo.service.ts    # Todo business logic
│   │   │   └── todo.validator.ts  # Todo validation schemas
│   │   └── user/             # User module
│   │       ├── user.controller.ts # User business logic
│   │       ├── user.model.ts      # User Sequelize model definition
│   │       ├── user.routes.ts     # User route definitions
│   │       ├── user.service.ts    # User service layer
│   │       └── user.validator.ts  # User validation schemas
│   └── seeders/              # Database seeders
│       └── role.seeder.ts    # Role data seeder
├── package.json              # Dependencies and scripts
├── package-lock.json         # Lock file for dependencies
├── tsconfig.json            # TypeScript configuration
├── tsconfig.tsbuildinfo     # TypeScript build info
├── .env                     # Environment variables (create this)
├── .gitignore              # Git ignore rules
├── API_DOCUMENTATION.md     # API documentation
├── TODO.md                  # Project tasks and todos
└── README.md                # This file
```

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

## 📈 Scalability Considerations

### Current Architecture Benefits

- **Modular Structure**: Easy to add new features as separate modules
- **Service Layer**: Business logic is separated from HTTP handling
- **ORM Abstraction**: Database-agnostic design through Sequelize

### Future Enhancements

1. **Authentication**: JWT-based authentication system
2. **Pagination**: Add pagination for large datasets
3. **Search & Filter**: Advanced filtering and search capabilities
4. **WebSocket Support**: Real-time updates
5. **Testing Suite**: Unit and integration tests
6. **API Documentation**: Swagger/OpenAPI documentation
7. **Rate Limiting**: Request rate limiting
8. **Logging**: Enhanced logging with Winston/Morgan
9. **Monitoring**: Health checks and performance monitoring

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

**Built with ❤️ using Node.js, Express, TypeScript and Sequelize**
