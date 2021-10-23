import { CommandOptions, Command } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { Message, MessageEmbed } from "discord.js";

@ApplyOptions<CommandOptions>({
    name: "ping",
    description: "ping pong with the bot",
})

export class PingCommand extends Command {
    async messageRun(msg: Message) {
        msg.channel.send({
            embeds: [new MessageEmbed()
                .setDescription(`${this.container.client.ws.ping} ms`)
                .setColor(msg.guild?.me?.displayHexColor!)
            ]
        });
    }
}