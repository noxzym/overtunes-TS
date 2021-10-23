import { ApplyOptions } from "@sapphire/decorators";
import { Listener, ListenerOptions } from "@sapphire/framework";
import chalk from "chalk";
import * as config from "../config.json";

@ApplyOptions<ListenerOptions>({
    name: "ready",
    once: true
})

export class readyEvent extends Listener {
    run() {
        this.container.client.user?.setActivity({
            name: `${config.prefix}play`,
            type: "LISTENING"
        })

        this.container.client.manager.init(this.container.client.user?.id);
        this.container.logger.info(chalk.green(`👋 Logged in as ${chalk.white(this.container.client.user?.username)}`));
    }
}

