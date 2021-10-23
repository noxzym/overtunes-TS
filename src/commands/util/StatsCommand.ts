import { CommandOptions, Command, Args } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { Message, MessageEmbed, MessageButton, MessageActionRow, User } from "discord.js";
import prettyMs from "pretty-ms";
import { helper } from "../../config.json";

@ApplyOptions<CommandOptions>({
    name: "aboutme",
    aliases: ["stats"]
})

export class StatsCommand extends Command {
    async messageRun(msg: Message) {
        let help: User[] = [];

        for (const helpers of helper) {
            let cache = this.container.client.users.cache.get(helpers);
            if (!cache) cache = await this.container.client.users.fetch(helpers);
            help.push(cache);
        }

        let embed = new MessageEmbed()
            .setAuthor(this.container.client.user?.username as string, undefined, "https://overtunes.netlify.app/docs/get-started/inviting-the-bot/")
            .setColor(msg.guild?.me?.displayHexColor!)
            .setTimestamp(this.container.client.readyTimestamp)
            .setFooter("Last update")
            .setDescription(`\`\`\`fix\n
Uptime          : ${prettyMs(this.container.client.uptime!, { compact: true })}
Total Members   : ${this.container.client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} Members
Total Guilds    : ${this.container.client.guilds.cache.size} Guilds
Total Channels  : ${this.container.client.channels.cache.size} Channels
Memory Usage    : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} Mb\`\`\`

**Special thanks 💖**\`\`\`md\n
${help.map(x => `${x.username}#${x.discriminator}`).join(", ")}\`\`\`\n
`)

        return msg.channel.send({ embeds: [embed] });
    }
}