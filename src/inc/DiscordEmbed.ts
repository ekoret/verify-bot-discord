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
        footer_text: string,
    ) {
        this.title = title;
        this.description = description;
        this.author = author;
        this.color = color;
        this.footerText = footer_text;
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