import { CommandOptions, Command, Args } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { Message, MessageEmbed, MessageButton, MessageActionRow } from "discord.js";
import prettyMs from "pretty-ms";

@ApplyOptions<CommandOptions>({
    name: "aboutme",
    aliases: ["stats"]
})

export class StatsCommand extends Command {
    async messageRun(msg: Message) {
        let embed = new MessageEmbed()
            .setColor(msg.guild?.me?.displayHexColor!)
            .setDescription(`\`\`\`fix\n
Uptime          : ${prettyMs(this.container.client.uptime!)}
Total Members   : ${this.container.client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} Members
Total Guilds    : ${this.container.client.guilds.cache.size} Guilds
Total Channels  : ${this.container.client.channels.cache.size} Channels
Memory Usage    : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} Mb\`\`\`\n\n
Ready Since        : <t:${Math.round(this.container.client.readyTimestamp! / 1000)}>
`)

        return msg.channel.send({ embeds: [embed] });
    }
}