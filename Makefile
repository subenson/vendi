.PHONY: down dev rebuild logs migration migrate revert migration-show empty-migration

down:
	docker-compose down

dev:
	docker-compose up -d

rebuild:
	docker-compose up -d --build

logs:
	docker-compose logs -f

# Usage: make migration service=identity name=CreateUserTable
migration:
	@if [ -z "$(service)" ]; then echo "Error: service parameter is required. Usage: make migration service=identity name=MigrationName"; exit 1; fi
	@if [ -z "$(name)" ]; then echo "Error: name parameter is required. Usage: make migration service=identity name=MigrationName"; exit 1; fi
	docker exec $(service) bash -c "cd /app/backend/$(service)-service && npm run migration:generate -- src/infrastructure/database/migrations/$(name)"

# Usage: make migrate service=identity
migrate:
	@if [ -z "$(service)" ]; then echo "Error: service parameter is required. Usage: make migrate service=identity"; exit 1; fi
	docker exec $(service) bash -c "cd /app/backend/$(service)-service && npm run migration:run"

# Usage: make revert service=identity
revert:
	@if [ -z "$(service)" ]; then echo "Error: service parameter is required. Usage: make revert service=identity"; exit 1; fi
	docker exec $(service) bash -c "cd /app/backend/$(service)-service && npm run migration:revert"

# Usage: make migration-show service=identity
migration-show:
	@if [ -z "$(service)" ]; then echo "Error: service parameter is required. Usage: make migration-show service=identity"; exit 1; fi
	docker exec $(service) bash -c "cd /app/backend/$(service)-service && npm run migration:show"

# Usage: make empty-migration service=identity name=CreateUserTable
empty-migration:
	@if [ -z "$(service)" ]; then echo "Error: service parameter is required. Usage: make empty-migration service=identity name=MigrationName"; exit 1; fi
	@if [ -z "$(name)" ]; then echo "Error: name parameter is required. Usage: make empty-migration service=identity name=MigrationName"; exit 1; fi
	docker exec $(service) bash -c "cd /app/backend/$(service)-service && npm run migration:create -- src/infrastructure/database/migrations/$(name)"
