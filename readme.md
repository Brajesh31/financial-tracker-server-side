# Financial Tracker API

A Node.js REST API built with Express and MongoDB to manage user data for a financial tracker application.

## Features

- MongoDB connection with Mongoose
- User schema and model
- Basic API health check endpoint
- Environment configuration with dotenv
- CORS support

## Tech Stack

- Node.js
- Express
- MongoDB & Mongoose
- dotenv
- bcryptjs
- jsonwebtoken

## Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd ft-api
   ```

2. **Install dependencies:**

   ```bash
   yarn install
   ```

3. **Create a .env file in the project root:**

   ```ini
   MONGO_URL=<Database URL (remote or local)>
   PORT=3000
   ```
