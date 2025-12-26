# vendi

Demo project to demonstrate event-driven microservices.

## Services

| Service           | Location                  | Responsibility           | Database |
|-------------------|---------------------------|--------------------------|----------|
| Product Service   | backend/product-service   | Manages product catalog  | MongoDB  |

## Technologies

- NestJS
- MongoDB

## Architecture

Key characteristics:

- Cross-cutting concerns are handled via a shared **service-chassis** (`backend/chassis/*`)
