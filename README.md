# Backend - Questionnaire Management System

This is the backend for a questionnaire management system built with Node.js, Express, and Prisma. It provides RESTful APIs for user authentication, questionnaire management, and user responses.

---

## **Technologies Used**

- **Node.js**: JavaScript runtime environment.
- **Express**: Framework for building RESTful APIs.
- **Prisma**: ORM for database interaction.
- **JWT (JSON Web Tokens)**: User authentication.
- **Bcrypt**: Password hashing.
- **Vitest**: Unit and integration testing framework.
- **Supertest**: HTTP route testing library.
- **PostgreSQL**: Relational database.
- **Docker**: Containerization for easy deployment.

---

## **Project Structure**
```
backend/
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── migrations/      # Database migrations
├── src/
│   ├── modules/         # Feature modules (e.g., user, questionnaire)
│   ├── common/          # Shared utilities and middleware
│   └── index.ts         # Entry point
├── .env.example         # Environment variables template
├── package.json         # Dependencies and scripts
├── Dockerfile           # Docker configuration
├── docker-compose.yml   # Docker Compose configuration
└── README.md            # Project documentation
```

---

## **🛠️ Getting Started**

Follow these steps to set up and run the backend project.

### **Step 1: 🚀 Initial Setup**

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/backend.git
   cd backend
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```

### **Step 2: ⚙️ Environment Configuration**

1. Rename `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Update the `.env` file with your database credentials and JWT secret:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
   JWT_SECRET="your_jwt_secret"
   ```
3. Run Prisma migrations to set up the database:
   ```bash
   npx prisma migrate dev --name init
   ```

### **Step 3: 🏃‍♂️ Running the Project**

Start the development server:
   ```bash
   yarn run dev
   ```

The API will be available at `http://localhost:8080`.

---

## **🐳 Running with Docker**

To run the project using Docker, follow these steps:

1. Build the Docker image:
   ```bash
   docker build -t backend-app .
   ```
2. Run the container:
   ```bash
   docker run -p 8080:8080 --env-file .env backend-app
   ```
3. Alternatively, use Docker Compose:
   ```bash
   docker-compose up -d
   ```

This will start the API and database as defined in `docker-compose.yml`.

---