## verify-bot-discord

Discord bot made with ts-discord-bot repository.

### MySQL Container

A docker compose is provided for a simple MySQL container. If you only provide the mandatory environment variables, the container will work right out of the box.

### Mandatory environment variables

BOT_TOKEN=  
BOT_CLIENT_ID=  
SERVER_ID=

#### Optional environment variables

You don't need to specify these environment variables in development. These default values will work right out of the box with the `compose.yaml` config.

DB_HOST=localhost  
DB_PORT=3306  
DB_USER=root  
DB_PASSWORD=password  
DB_NAME=botdb
