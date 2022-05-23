include packages/server/.env

.PHONY: stop
stop:
	docker-compose --env-file ./packages/server/.env stop

.PHONY: down
down:
	docker-compose --env-file ./packages/server/.env down

.PHONY: logs
logs:
	docker-compose --env-file ./packages/server/.env logs

.PHONY: dev
dev:
	docker-compose --env-file ./packages/server/.env up -d

.PHONY: restart
restart:
	docker-compose --env-file ./packages/server/.env restart
	
.PHONY: rebuild
rebuild:
	docker-compose --env-file ./packages/server/.env up --build --force-recreate --no-deps -d

.PHONY: reset
reset:
	docker system prune -a