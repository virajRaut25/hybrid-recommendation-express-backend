# Express Backend for HRS (Hybrid Recommendation System)

This repository contains the backend code for the HRS (Hybrid Recommendation System) application built using Express.js, MongoDB, and related libraries.

## Overview

The Express backend serves as the foundation for handling HTTP requests, managing data storage, and implementing business logic for the HRS application. It provides endpoints for user authentication, managing user history, and other essential functionalities.

## Directory Structure

The backend code is organized into different directories based on functionality:

- `middleware`: Contains middleware functions used for request processing, such as authentication.
- `models`: Defines Mongoose schemas for MongoDB collections, including User and UserItem.
- `routes`: Contains route handlers for different API endpoints, such as authentication and user history.
- `db.js`: Establishes a connection to the MongoDB database.
- `index.js`: Initializes the Express server, configures middleware, and defines routes.

## Components

### Middleware

- `fetchuser.js`: Middleware function to extract user information from JWT tokens for authentication purposes.

### Models

- `User.js`: Mongoose schema for storing user information, including email, password, date of birth, and gender.
- `UserItem.js`: Mongoose schema for user-related data, including search history, liked items, and weekday statistics.

### Routes

- `auth.js`: Handles user authentication endpoints, such as signup and signin.
- `history.js`: Manages user history, including search history, liked items, and genre statistics.

### Database Connection

- `db.js`: Establishes a connection to the MongoDB database using Mongoose.

### Server Initialization

- `index.js`: Initializes the Express server, configures middleware, defines routes, and starts the server listening on a specified port.

## Usage

1. Ensure MongoDB is running locally or on a remote server.
2. Create a `.env` file in the root directory and set the MongoDB URI (`MONGODB_URI`) and JWT secret (`JWT_SECRET`).
3. Install dependencies using `npm install`.
4. Start the Express server using `npm index.js`.
5. The server will start listening on the specified port, and you can access the defined routes to interact with the HRS application.

## Additional Notes

- Handle errors and exceptions gracefully in the server code.
- Secure sensitive information such as database credentials and secret keys.
- Monitor server logs and performance metrics for optimization and troubleshooting.
