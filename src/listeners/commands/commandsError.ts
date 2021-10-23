import { ApplyOptions } from "@sapphire/decorators";
import { CommandErrorPayload, Events, Listener, ListenerOptions, UserError } from "@sapphire/framework";
import { MessageEmbed } from "discord.js";

@ApplyOptions<ListenerOptions>({
    name: Events.CommandError
})

export class clientListener extends Listener {
    run({ context, message: content }: UserError, { message }: CommandErrorPayload) {
        if (Reflect.get(Object(context), "silent")) return;

        return message.channel.send({
            embeds: [
                new MessageEmbed()
                    .setAuthor("Something wrong when running the command", undefined, "https://discord.gg/hM8U8cHtwu")
                    .setDescription(`\`\`\`${content}\`\`\``)
                    .setColor("RED")
            ]
        });
    }
}