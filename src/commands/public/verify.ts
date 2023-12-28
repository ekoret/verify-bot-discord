import { CommandInteraction, SlashCommandBuilder } from '../../inc/common'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('verify')
		.setDescription('Start the verification process'),
	async execute(interaction: typeof CommandInteraction) {

		/**
		 * Add verification process here
		 * 
		 * The verification process should include:
		 * - checking the unique id of the user
		 * - if the user exists, add them to the database and give them the verified role
		 * - if the user does not exist, send back a message they need to register
		 */

		try {
			const result = await fetch(process.env.VERIFY_USER_ENDPOINT as string, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'API-Key': process.env.DB_API_KEY as string
				},
				body: JSON.stringify({
					username: 'ekoret',
					updates: {
						email: 'fromds'
					}
				})
			});

			const json = await result.json();

			console.log(json);

		} catch (err) {
			console.log(err)
		}

		await interaction.reply("Verifying..")
	},
};
