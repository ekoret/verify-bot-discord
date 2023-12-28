import { Events } from '../inc/common'

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client: CustomClient) {
        console.log(`Ready! Logged in as ${client.user?.tag}`);
    },
};