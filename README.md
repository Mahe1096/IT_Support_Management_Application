Project Overview
The IT Support Management Application is a comprehensive solution designed to streamline IT support services. It uses microservices architecture to enable efficient ticket management, user management, notification handling, and a knowledge base system. The application integrates with tools like RabbitMQ for messaging, MySQL for data storage, and Consul for service discovery and health monitoring.

Key Features
Microservices Architecture:

Ticket Management Service
User Management Service
Notification Service
Knowledge Base Service
API Gateway for centralized routing
Service Discovery:

Integrated with Consul for service registration and discovery.
Asynchronous Messaging:

RabbitMQ for communication between services.
Database:

MySQL for persistent storage.
Scalable Deployment:

Dockerized microservices for ease of deployment.
Health Monitoring:

Consul and custom health check endpoints for monitoring service status.
Technology Stack
Backend: Node.js, Express.js, FastAPI
Frontend: React.js (if applicable)
Database: MySQL
Messaging: RabbitMQ
Service Discovery: Consul
Containerization: Docker
Authentication: OAuth2 (if implemented)
Setup and Installation
Clone the Repository:

bash
Copy code
git clone https://github.com/<username>/IT_Support_Management_Application.git
cd IT_Support_Management_Application
Environment Configuration:

Create a .env file in each microservice folder with the following variables:
env
Copy code
PORT=<port-number>
DB_HOST=<database-host>
DB_USER=<database-user>
DB_PASSWORD=<database-password>
DB_NAME=<database-name>
RABBITMQ_URL=amqp://<rabbitmq-host>
CONSUL_URL=http://<consul-host>:8500
Install Dependencies: Navigate to each service folder and run:

bash
Copy code
npm install
Start Services:

Start RabbitMQ:
bash
Copy code
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management
Start Consul:
bash
Copy code
docker run -d --name consul -p 8500:8500 consul
Start each service:
bash
Copy code
node server.js
Dockerize the Services:

Build and run Docker containers for the microservices:
bash
Copy code
docker-compose up --build
Access the Application:

API Gateway URL: http://localhost:<gateway-port>
Consul UI: http://localhost:8500
RabbitMQ UI: http://localhost:15672
Directory Structure
Copy code
IT_Support_Management_Application/
├── ticket_management_service/
├── user_management_service/
├── notification_service/
├── knowledge_base_service/
├── api_gateway/
├── deployments/
└── README.md
How It Works
Service Registration:
Each service registers itself with Consul during startup.
Service Discovery:
The API Gateway uses Consul to discover the required services dynamically.
Messaging:
RabbitMQ facilitates communication between microservices.
Health Monitoring:
Health endpoints (e.g., /health) are checked by Consul to ensure service availability.
