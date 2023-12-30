import { EmbedBuilder, ColorResolvable } from 'discord.js'

class DiscordEmbed {
    private title: string;
    private description: string;
    private author: string;
    private color: ColorResolvable;
    private footerText: string;

    constructor(
        title: string,
        description: string,
        author: string,
        color: ColorResolvable,
        footerText: string = "Need help? Message any administrator or support.",
    ) {
        this.title = title;
        this.description = description;
        this.author = author;
        this.color = color;
        this.footerText = footerText;
    }

    getEmbed() {
        return new EmbedBuilder()
            .setColor(this.color)
            .setTitle(this.title)
            .setAuthor({
                name: this.author,
            })
            .setDescription(this.description)
            .setTimestamp()
            .setFooter({
                text: this.footerText,
            });
    }

}

export default DiscordEmbed;