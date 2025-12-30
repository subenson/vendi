# vendi

Demo project to demonstrate event-driven microservices.

## Services

| Service           | Location                  | Responsibility           | Tech    | Database    |
|-------------------|---------------------------|--------------------------|---------|-------------|
| Identity Service  | backend/identity-service  | Manages users            | NestJS  | PostgreSQL  |
| Product Service   | backend/product-service   | Manages product catalog  | NestJS  | MongoDB     |

Cross-cutting concerns are handled via a shared microservice chassis.

| Chassis        | Location                | Responsibility             |
|----------------|-------------------------|----------------------------|
| core           | backend/core            | Common shared code         |

## Architecture

- Control Database (Tenant Registry)
- Database per Service per Tenant
