# Notes API

A RESTful Notes API built with Node.js, Express.js and TypeScript. It allows users to register, log in, and manage their personal notes securely.

## Features

- User registration and login
- Password hashing with bcrypt
- JWT-based authentication
- Role-based authorization
- Create, read, update and delete notes
- User-specific note access
- Request validation using Zod
- Security headers with Helmet
- Cross-Origin Resource Sharing (CORS)
- Login rate limiting to prevent repeated failed attempts

## Technologies Used

- Node.js
- Express.js
- TypeScript
- JSON Web Tokens (JWT)
- bcrypt
- Zod
- Helmet
- CORS
- express-rate-limit

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/chimaemmanuel01/notes-api.git
```

### 2. Navigate into the project

```bash
cd notes-api
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root and add:

```env
PORT=3000
JWT_SECRET=your_secure_secret_key
```

Replace `your_secure_secret_key` with a strong, private secret.

### 5. Start the development server

```bash
npm run dev
```

The API will run at:

`http://localhost:3000`

## Available Scripts

| Command | Description |
| `npm run dev` | Starts the development server |
| `npm run build` | Compiles TypeScript |
| `npm start` | Runs the compiled application |

## API Endpoints

### Authentication

| Method | Endpoint | Description |
| POST | `/user/register` | Register a new user |
| POST | `/user/login` | Log in a user |

### Notes

| Method | Endpoint | Description |
| POST | `/api/notes` | Create a note |
| GET | `/api/notes` | Get the authenticated user's notes |
| GET | `/api/notes/:id` | Get a specific note |
| PUT | `/api/notes/:id` | Update a note |
| DELETE | `/api/notes/:id` | Delete a note (admin only) |

Protected routes require a valid JWT access token in the Authorization header:

```text
Authorization: Bearer YOUR_TOKEN
```

## Security

- Passwords are hashed before storage.
- JWT protects authenticated routes.
- Zod validates incoming request data.
- Helmet adds security-related HTTP headers.
- CORS controls permitted browser origins.
- Login rate limiting allows up to 5 failed attempts within 15 minutes before temporarily blocking further attempts.

## Author

Chima Emmanuel
