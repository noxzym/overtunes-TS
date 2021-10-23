import { CommandOptions, Command, Args } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { Message, MessageEmbed, MessageButton, MessageActionRow } from "discord.js";

@ApplyOptions<CommandOptions>({
    name: "help",
    aliases: ["h", "?"]
})

export class HelpCommand extends Command {
    async messageRun(msg: Message, args: Args) {

        const argument = await args.restResult("string");

        if (argument.success) {
            const commands = this.container.client.stores.get("commands").get(argument.value);
            if (!commands) return msg.channel.send(`❌ ${argument.value} is not my command`);
            return msg.channel.send({
                embeds: [new MessageEmbed()
                    .setAuthor(`${commands.name.toUpperCase()}`, undefined, "https://overtunes.netlify.app/docs/get-started/inviting-the-bot/")
                    .addField(`Description:`, commands.description as string)
                    .setColor(msg.guild?.me?.displayHexColor!)
                    .addField(`Usage:`, commands.detailedDescription as string)
                    .setTimestamp()
                ]
            })
        } else {
            let embed = new MessageEmbed()
                .setAuthor(this.container.client.user?.username as string + ' Help menu', this.container.client.user?.displayAvatarURL(), "https://overtunes.netlify.app/docs/get-started/inviting-the-bot/")
                .setColor(msg.guild?.me?.displayHexColor!)
                .setFooter(`Loaded: ${this.container.client.stores.get("commands").size} Commands`)

            const categories = [...new Set(this.container.stores.get("commands").map(x => x.fullCategory[x.fullCategory.length - 1]))];

            for (const category of categories) {
                const commands = this.container.stores.get("commands").filter(x => x.fullCategory[x.fullCategory.length - 1] === category);
                embed.fields.push({
                    name: `${category.toUpperCase()}`,
                    value: commands.map(x => `\`${x.name}\``).join(", "),
                    inline: false
                });
            }

            return msg.channel.send({
                embeds: [embed],
                components: [new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setStyle('LINK')
                            .setURL('https://overtunes.netlify.app/docs/get-started/playing-music')
                            .setLabel('Get Started')
                    )
                    .addComponents(
                        new MessageButton()
                            .setStyle('LINK')
                            .setLabel('Commands')
                            .setURL('https://overtunes.netlify.app/docs/basic-use/commands')
                    )
                    .addComponents(
                        new MessageButton()
                            .setStyle('LINK')
                            .setLabel('FAQ')
                            .setURL('https://overtunes.netlify.app/docs/basic-use/faq')
                    )
                    .addComponents(
                        new MessageButton()
                            .setStyle('LINK')
                            .setLabel('Filters')
                            .setURL('https://overtunes.netlify.app/docs/basic-use/filters')
                    )
                ]
            })
        }
    }
}