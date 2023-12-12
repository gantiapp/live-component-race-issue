DOCKER_COMP=docker compose
DOCKER_EXEC=$(DOCKER_COMP) exec ganti

.PHONY: start stop exec

start:
	$(DOCKER_COMP) up -d --build
	$(DOCKER_EXEC) npm i
	$(DOCKER_COMP) exec -e CAPTAINHOOK_DISABLE=true ganti composer install
	$(DOCKER_EXEC) npm run dev
	$(DOCKER_EXEC) bin/console d:m:m --no-interaction

stop:
	$(DOCKER_COMP) down

exec:
	$(DOCKER_EXEC) bash
