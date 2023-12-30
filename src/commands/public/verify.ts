import DiscordEmbed from '../../inc/DiscordEmbed'
import { ChatInputCommandInteraction, SlashCommandBuilder } from '../../inc/common'
const wait = require('node:timers/promises').setTimeout;
import { Role, GuildMember } from 'discord.js'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('verify')
		.setDescription('Start the verification process')
		.addStringOption((option) =>
			option.setName('email')
				.setDescription(`Your email used to login at ${process.env.SITE_NAME}`)
				.setRequired(true)
				.setMaxLength(100)
		)
		.addStringOption((option) =>
			option.setName('unique_id')
				.setDescription(`Your unique ID from ${process.env.SITE_NAME}`)
				.setRequired(true)
				.setMaxLength(32)
		),
	async execute(interaction: ChatInputCommandInteraction) {


		const embedAuthor = interaction.client.user.username

		/**
		 * Add verification process here
		 * 
		 * The verification process should include:
		 * - checking the unique id of the user
		 * - if the user exists, add them to the database and give them the verified role
		 * - if the user does not exist, send back a message they need to register
		 */
		const embed = new DiscordEmbed('Verification process started', 'Please wait while I verify your account.', embedAuthor, 'Yellow').getEmbed()
		await interaction.reply({
			embeds: [embed],
			ephemeral: true
		});

		await wait(3000)

		const email = interaction.options.getString('email');
		const uniqueId = interaction.options.getString('unique_id');
		const id = interaction.user.id
		const username = interaction.user.username

		try {
			const result = await fetch(process.env.VERIFY_USER_ENDPOINT as string, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'API-Key': process.env.DB_API_KEY as string
				},
				body: JSON.stringify({
					id,
					email,
					username,
					uniqueId
				})
			});

			const json = await result.json();

			if (result.status > 400) {
				let message = '';
				if (json.message.includes('Invalid email format')) {
					message = "Please ensure that you typed in your email correctly with the correct formatting.\nFor example: example@gmail.com"
				} else if (json.message.includes("Customer not found.")) {
					message = `Please ensure that you are using the email address you used to register at ${process.env.SITE_NAME}.`
				} else if (json.message.includes("Unique ID not found for customer.")) {
					message = `Please ensure that you have logged in at least once on ${process.env.SITE_NAME}. When logging in, you will automatically be generated a unique ID.`
				} else if (json.message.includes("Verification failed")) {
					message = `The email address and unique Id provided do not match. Please try again.`
				}
				const unverifiedEmbed = new DiscordEmbed('Verification process failed', message, embedAuthor, 'Red').getEmbed()
				await interaction.followUp({
					embeds: [unverifiedEmbed],
					ephemeral: true
				});
			} else {
				const successEmbed = new DiscordEmbed('You\'ve been successfully verified!', 'You can now take advantage of all the perks of being a verified member of Discord server!', embedAuthor, 'Green').getEmbed()

				// Here we will add the verified role to the user
				const role = interaction.guild!.roles.cache.find(r => r.name === "Verified");

				await (interaction.member as GuildMember).roles.add(role as Role)

				await interaction.followUp({
					embeds: [successEmbed],
					ephemeral: true
				});


			}

		} catch (err) {
			console.log(err)

			const errorEmbed = new DiscordEmbed('There was an error trying to complete verification!', 'Please try again. If the issue continues, please contact a server administrator.', embedAuthor, 'Red').getEmbed()
			await interaction.followUp({
				embeds: [errorEmbed],
				ephemeral: true
			});
		}



	},
};
