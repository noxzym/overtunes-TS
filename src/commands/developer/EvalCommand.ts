import { CommandOptions, Command, Args } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { Message, MessageEmbed } from "discord.js";
import util from "util";
import { codeBlock } from "@discordjs/builders";
import hastebin from "hastebin-gen";

@ApplyOptions<CommandOptions>({
    name: "eval",
    quotes: [],
    description: "owo whats this",
    preconditions: ["ownerOnly"],
    aliases: ["ev"],
    requiredClientPermissions: ["SEND_MESSAGES"],
})

export class EvalCommand extends Command {
    async messageRun(message: Message, args: Args) {
        const msg = message;
        const userArgument = await args.restResult("string");
        if (!userArgument.success) return;
        const code = userArgument.value

        try {
            let { evaled } = await this.parseEval(eval(code)) /* eslint-disable-line */
            if (typeof evaled !== "string") evaled = util.inspect(evaled);
            msg.channel.send({
                content: codeBlock("js", evaled)
            });
        } catch (e) {
            msg.channel.send({
                content: codeBlock("js", e as string)
            });
        }
    }

    public parseType(input: any) {
        if (input instanceof Buffer) {
            let length = Math.round(input.length / 1024 / 1024);
            let ic = "MB";
            if (!length) {
                length = Math.round(input.length / 1024);
                ic = "KB";
            }
            if (!length) {
                length = Math.round(input.length);
                ic = "Bytes";
            }
            return `Buffer (${length} ${ic})`;
        }
        return input === null || input === undefined ? "Void" : input.constructor.name;
    }

    public async parseEval(input: any) {
        const isPromise =
            input instanceof Promise &&
            typeof input.then === "function" &&
            typeof input.catch === "function";
        if (isPromise) {
            input = await input;
            return {
                evaled: input,
                type: `Promise<${this.parseType(input)}>`
            };
        }
        return {
            evaled: input,
            type: this.parseType(input)
        };
    }
}