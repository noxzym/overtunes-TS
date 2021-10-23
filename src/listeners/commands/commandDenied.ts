import { CommandDeniedPayload, Events, Listener, ListenerOptions, UserError } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { MessageEmbed } from "discord.js";
import { isGuildBasedChannel } from "@sapphire/discord.js-utilities";

@ApplyOptions<ListenerOptions>({
    name: Events.CommandDenied
})

export class clientListener extends Listener {
    async run(error: Error, context: CommandDeniedPayload) {
        if (isGuildBasedChannel(context.message.channel) && !context.message.channel.permissionsFor(context.message.guild?.me!).has(["SEND_MESSAGES"] || !context.message.channel.permissionsFor(context.message.guild?.me!).has(["EMBED_LINKS"]))) {
            return context.message.author.send({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`I do not have permission to **SEND MESSAGES** in ${context.message.channel.name}.\nMake sure you give me **SEND_MESSAGES AND EMBED_LINKS** Permissions`)
                        .setColor("RED")
                ]
            });
        }
    }
}