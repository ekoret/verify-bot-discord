import 'dotenv/config'

const fs = require('node:fs');
const path = require('node:path');

// Require the necessary discord.js classes
import { Client, Collection, GatewayIntentBits } from 'discord.js';


const loadCommands = (client: CustomClient) => {
    // Handling commands
    const foldersPath = path.join(__dirname, 'commands');
    const commandFolders = fs.readdirSync(foldersPath);

    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs
            .readdirSync(commandsPath)
            .filter((file: string) => file.endsWith('.js'));
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            // Set a new item in the Collection with the key as the command name and the value as the exported module
            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
            } else {
                console.log(
                    `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
                );
            }
        }
    }
};

const handleEvents = (client: CustomClient) => {
    // Handling events
    const eventsPath = path.join(__dirname, 'events');
    const eventFiles = fs
        .readdirSync(eventsPath)
        .filter((file: string) => file.endsWith('.js'));

    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
};

const main = async () => {
    try {
        // Create main discord client
        const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] }) as CustomClient;
        const commands = new Collection();

        // Attach things to client to use within app
        client.commands = commands;

        // Load commands on to client
        loadCommands(client);

        // Listen and handle events
        handleEvents(client);

        // Log into discord
        client.login(process.env.BOT_TOKEN);
    } catch (error) {
        console.log('Failed to start bot:', error);
    }
};

main();