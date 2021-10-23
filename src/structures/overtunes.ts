// Dependecies
import { SapphireClient, SapphireClientOptions } from "@sapphire/framework";
import { Intents } from "discord.js";
import { Manager } from "erela.js";
import { join, resolve } from "path";

// Config
import * as config from "../config.json";
import lavalink from "../lavalink";


class Overtunes extends SapphireClient {

    constructor(clientOptions?: SapphireClientOptions) {
        super({
            allowedMentions: {
                users: [],
                repliedUser: false,
                roles: [],
            },
            intents: [
                Intents.FLAGS.GUILD_VOICE_STATES,
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
                Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
            ],
            partials: [
                'MESSAGE',
                'REACTION',
                'CHANNEL',
            ],
            shards: "auto",
            defaultCooldown: {
                delay: 2000,
                limit: 3
            },
            defaultPrefix: config.prefix,
            typing: false,
            failIfNotExists: true,
            baseUserDirectory: resolve(join(__dirname, "..")),
            caseInsensitivePrefixes: true
        })
    }

    public manager = new Manager({
        nodes: lavalink,
        send: (id, payload) => {
            const guild = this.guilds.cache.get(id);
            if (guild) guild.shard.send(payload);
        },
        autoPlay: true,
        plugins: []
    });
}

declare module "@sapphire/framework" {
    export interface SapphireClient {
        manager: Manager,
    }
}

export = new Overtunes().login()