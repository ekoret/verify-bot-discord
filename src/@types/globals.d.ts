import { Client, Collection } from 'discord.js';
import { ConnectionOptions } from 'mysql2'
import DiscordDatabaseCRUD from '../inc/DiscordDatabaseCRUD'


declare global {
    interface CustomClient extends Client {
        commands: Collection<unknown, unknown>;
        discordCRUD: DiscordDatabaseCRUD;
    }

    type CustomConnectionOptions = Omit<
        ConnectionOptions,
        'host' | 'port' | 'user' | 'password' | 'database'
    > & {
        host: string | 'localhost';
        port: number | 3306;
        user: string | 'root';
        password: string | 'password';
        database: string | 'DevDatabase';
    };
}

