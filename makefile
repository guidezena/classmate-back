up:
	docker-compose stop 
	docker-compose up --remove-orphans -d

logs:
	docker-compose logs -f pi-api

install-package:
	yarn add $(package)
	docker-compose exec pi-api yarn add $(package)


remove-package:
	yarn remove $(package)
	
