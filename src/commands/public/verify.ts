import DiscordEmbed from '../../inc/DiscordEmbed'
import { ChatInputCommandInteraction, SlashCommandBuilder } from '../../inc/common'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('verify')
		.setDescription('Start the verification process')
		.addStringOption((option) =>
			option.setName('unique_id')
				.setDescription(`Your unique ID from ${process.env.SITE_NAME}`)
				.setRequired(true)
				.setMaxLength(20)
		),
	async execute(interaction: ChatInputCommandInteraction) {

		/**
		 * Add verification process here
		 * 
		 * The verification process should include:
		 * - checking the unique id of the user
		 * - if the user exists, add them to the database and give them the verified role
		 * - if the user does not exist, send back a message they need to register
		 */

		const uniqueId = interaction.options.getString('unique_id');
		const id = interaction.user.id
		const username = interaction.user.username

		console.log({ id, username, uniqueId })

		try {
			const result = await fetch(process.env.VERIFY_USER_ENDPOINT as string, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'API-Key': process.env.DB_API_KEY as string
				},
				body: JSON.stringify({
					id,
					username,
					uniqueId
				})
			});

			const json = await result.json();

			console.log(json);

		} catch (err) {
			console.log(err)
		}

		const embed = new DiscordEmbed('Verifying..', 'Please wait while I verify your account.', 'Author', 'Red', 'Footer').getEmbed()

		await interaction.reply({
			embeds: [embed],
			ephemeral: true
		});
	},
};
