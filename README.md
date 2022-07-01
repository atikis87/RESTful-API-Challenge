# Installation

1. Run `docker-compose up` and wait until the images are built and installed
2. Visit http://localhost:8080/ and verify that you can see a message with MySQL version string, for example "MySQL version: 8.0.28"

# Useful commands

- To start: `docker-compose up` (optionally use `-d` flag to start in the daemon mode)
- To stop: `docker-compose stop`
- To reset:
  - `docker-compose down --remove-orphans`
  - remove db folder created next to docker-compose.yml
  - `docker-compose up`
- To enter the application server shell: `docker exec -ti backend-challenge_app bash`

# Environment

After running the environment locally:

- backend http://localhost:8080/
    - path: `./app/`
- accessing the database from the code
    - technology: `MySQL`
    - host: `backend-challenge_db`
    - port: `3306`
    - database: `backendChallenge`
    - user: `dbuser`
    - password: `dbpass`

# Bonus
- accessing the database from your IDE (different **host** and **port**)
    - technology: `MySQL`
    - host: `localhost`
    - port: `33066`
    - database: `backendChallenge`
    - user: `dbuser`
    - password: `dbpass`

