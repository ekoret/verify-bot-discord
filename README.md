## verify-bot-discord

Verifier Bot is a Discord bot created to automate user verification with a backend system. For example, this bot is currently implemented to make requests to a backend that handles querying data from the WooCommerce REST API v3. The bots primary function is to authenticate and verify users on the Discord server by cross-referencing a unique ID that users can only obtain by registering on the WordPress site.

### Environment Variables

BOT_TOKEN
BOT_CLIENT_ID
SERVER_ID
DB_API_KEY

VERIFY_USER_ENDPOINT

DB_HOST
DB_PORT
DB_USER
DB_PASSWORD
DB_NAME

SITE_NAME
SITE_URL

### To Do

- do we need admin commands?
- refactor
- update readme
- look over error handling again
- make embeds more pretty
