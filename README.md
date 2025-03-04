# Backend - Credit Card Validator

This is the backend for a credit card validation system built with **Node.js**, **Express**, and **Joi**. It provides a RESTful API for validating credit card details, including card number, cardholder name, expiry date, and CVV.

---

## **Technologies Used**

- **Node.js**: JavaScript runtime environment.
- **Express**: Framework for building RESTful APIs.
- **Joi**: Schema validation library for request payloads.
- **Vitest**: Unit and integration testing framework.
- **Supertest**: HTTP route testing library.
- **Docker**: Containerization for easy deployment.

---

## **Project Structure**

```
backend/
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
   git clone https://github.com/PedroLuizComZ/credit-card-validator.git
   cd credit-card-validator
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