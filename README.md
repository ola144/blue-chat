# Chat App API

A Node.js and Express backend for a real-time chat application with authentication, user management, chat rooms, and message handling.

## Features

- User signup and login
- JWT-based authentication
- User profile management
- Chat creation and listing
- Real-time messaging support with Socket.IO
- Swagger API documentation

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- Socket.IO
- JWT
- Swagger UI + Swagger JSDoc

## Project Structure

- `app.js` - Main Express app and Socket.IO setup
- `server.js` - Starts the server
- `Routes/` - API routes
- `Controllers/` - Request handlers
- `Models/` - Mongoose schemas
- `Middleware/` - Auth middleware
- `config.env` - Environment configuration

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create or update the environment file `config.env` with your values:

```env
PORT=3000
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
MONGO_CONN_STR=your_mongodb_connection_string
SECRET_KEY=your_secret_key
LOGIN_EXPIRES=7d
```

## Running the Server

Start the development server:

```bash
npm run dev
```

The API will run on the port defined in `config.env`.

## API Documentation

Swagger documentation is available at:

```text
http://localhost:3000/api-docs
```

If you use a different port, replace `3000` with your configured port.

## API Endpoints

### Auth
- `POST /api/v1/auth/signup`
- `POST /api/v1/auth/login`

### Users
- `GET /api/v1/user/user-details`
- `GET /api/v1/user/all-users`
- `PATCH /api/v1/user/update-user-details`
- `PATCH /api/v1/user/update-user-password`
- `PATCH /api/v1/user/upload-profile-picture`

### Chats
- `POST /api/v1/chat/create-new-chat`
- `GET /api/v1/chat/get-all-chat`
- `POST /api/v1/chat/clear-unread-message`

### Messages
- `POST /api/v1/message/new-message`
- `GET /api/v1/message/all-message/:chatId`
- `PATCH /api/v1/message/update-message/:messageId`

## Notes

- Most protected routes require a Bearer token in the `Authorization` header.
- The Swagger UI uses the same API routes and can help you test requests quickly.
