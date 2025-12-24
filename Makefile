down:
	docker-compose down

dev:
	docker-compose up -d

rebuild:
	docker-compose up -d --build

logs:
	docker-compose logs -f
