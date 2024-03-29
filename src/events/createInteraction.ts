import { Events, CommandInteraction } from '../inc/common'

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction: CommandInteraction) {
        if (!interaction.isChatInputCommand()) return;

        const customClient = interaction.client as CustomClient;

        const command = customClient.commands.get(interaction.commandName);

        if (!command) {
            console.error(
                `No command matching ${interaction.commandName} was found.`
            );
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: 'There was an error while executing this command!',
                    ephemeral: true,
                });
            } else {
                await interaction.reply({
                    content: 'There was an error while executing this command!',
                    ephemeral: true,
                });
            }
        }
    },
};