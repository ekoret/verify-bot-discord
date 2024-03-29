import 'dotenv/config'

import { REST, Routes } from 'discord.js';

import fs from 'node:fs';
import path from 'node:path';

if (!process.env.BOT_TOKEN) {
    console.log('BOT_TOKEN not defined in environment variables while deploying commands.Exiting...')
    process.exit(1)
}

const commands = [];
// Grab all the command folders from the commands directory you created earlier
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    // Grab all the command files from the commands directory you created earlier
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file: string) => file.endsWith('.js'));
    // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log(
                `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
            );
        }
    }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.BOT_TOKEN);

// and deploy your commands!
(async () => {
    try {
        if (!process.env.BOT_CLIENT_ID || !process.env.SERVER_ID) {
            console.log('BOT_CLIENT_ID or SERVER_ID not defined in environment variables while deploying commands.Exiting...')
            process.exit(1)
        }
        console.log(
            `Started refreshing ${commands.length} application (/) commands.`
        );

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationGuildCommands(
                process.env.BOT_CLIENT_ID,
                process.env.SERVER_ID
            ),
            { body: commands }
        ) as any;

        console.log(
            `Successfully reloaded ${data.length} application (/) commands.`
        );
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();