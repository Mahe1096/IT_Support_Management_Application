**Project Overview**

The IT Support Management Application is a comprehensive solution designed to streamline IT support services. It uses microservices architecture to enable efficient ticket management, user management, notification handling, and a knowledge base system. The application integrates with tools like RabbitMQ for messaging, MongoDB for data storage, and Consul for service discovery and health monitoring.Dockers for containerization and Kubernetes for deployment orchestration.

**Key Features**

**Microservices Architecture:**

Ticket Management Service
User Management Service
Notification Service
Knowledge Base Service
API Gateway for centralized routing
Service Discovery:Integrated with Consul for service registration and discovery.
Asynchronous Messaging:RabbitMQ for communication between services.
Database:MongoDB for all the 4 Services.
Scalable Deployment:Dockerized microservices and also deployed in Kubernetes for ease of deployment
Health Monitoring:Consul and custom health check conditions for monitoring service status.

**Technology Stack**

Backend: Node.js, Express.js
Database: Mongo DB
Messaging: RabbitMQ
Service Registry and Discovery: Consul
Containerization: Docker
Authentication: JWT Token
Deployment Orchestration:Kubernetes

**Setup and Installation**

**Clone the Repository:**

git clone https://github.com/<username>/IT_Support_Management_Application.git
cd IT_Support_Management_Application

**Environment Configuration:
**
Create a .env file in each microservice folder with the following variables:


PORT=<port-number>
DB_HOST=<database-host>
DB_USER=<database-user>
DB_PASSWORD=<database-password>
DB_NAME=<database-name>
RABBITMQ_URL=amqp://<rabbitmq-host>
CONSUL_URL=http://<consul-host>:8500

**Install Dependencies:** 

Navigate to each service folder and run: npm install

**Start Services:**

**Start RabbitMQ in a Docker Container::**

docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management

**Start Consul in a Docker Container:**

docker run -d --name consul -p 8500:8500 consul

**Start each service:**

npm install (or) node server.js 

**Dockerize the Services:**

Build and run Docker containers for the microservices:

docker build -t container_name:latest .    
docker run -d -p <port>:<port> --name name_of_container container_name:latest

**Kubernetes Deployment:**

Create 2 files one for DB and one for Microservice:

kubectl -f apply servicename.yaml
kubectl -f apply servicedbname.yaml

To check pod status

kubectl get pods

To check services

kubectl get services

To get deployments

kubectl get deployments

To apply all deployment files under deployments folder

kubectl apply -f ./deployments

**Access the Application:**

API Gateway URL: http://host.docker.internal:<gateway-port>
Consul UI: http://host.docker.internal:8500
RabbitMQ UI: amqp://host.docker.internal

**Directory Structure**

IT_Support_Management_Application/
├── ticket_management_service/
├── user_management_service/
├── notification_service/
├── knowledge_base_service/
├── api_gateway/
├── deployments/
└── README.md

**How It Works**

**Service Registration:**
Each service registers itself with Consul during startup.

**Service Discovery:**
The API Gateway uses Consul to discover the required services dynamically.

**Messaging:**
RabbitMQ facilitates communication between microservices.

**Health Monitoring:**
Health endpoints (e.g., /health) are checked by Consul to ensure service availability.
