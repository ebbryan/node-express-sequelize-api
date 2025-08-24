# User-Role Relationship Implementation

## Steps to Complete:

1. [x] Update User Model - Add role_id foreign key and association
2. [x] Update Role Model - Add hasMany association to User
3. [x] Create associations.js file - Central model associations
4. [x] Update db-init.js - Import and execute associations
5. [x] Update User Service - Include role in queries and operations
6. [x] Update User Controller - Handle role data in requests/responses
7. [ ] Test the implementation

## Relationship Type:

- One-to-Many: One Role can have many Users
- User belongs to one Role
- Role has many Users
