import { Watchdog } from "watchdog";

class WatchdogService {
    constructor(ctx) {
        this.logger = ctx.logger;
        this.config = ctx.config;
        this.blockchainModuleManager = ctx.blockchainModuleManager;
        this.dataService = ctx.dataService;
        this.networkModuleManager = ctx.networkModuleManager;
        this.services = ['blockchain', 'network', 'data'];
    }

    initialize() {
        this.food = { data: { initialFeed: true, msg: 'Watchdog started!' }, timeout: 2 * 60 * 1000 };
        this.dog = new Watchdog();

        this.dog.on('reset', async () => {
            const aliveServices = {};
            for (const service of this.services) {
                aliveServices[`${service}ServiceAlive`] = await this[`${service}Service`].healthCheck();
            }

            this.food.data = aliveServices;
            this.food.timeout = 5 * 1000;

            this.dog.feed(this.food);
        });

        this.dog.on('feed', (response) => {
            if (!response.data.initialFeed) {
                this.logger.info(`Service status:${JSON.stringify(response.data)}`);
                for (const service of this.services) {
                    if (!response.data[`${service}ServiceAlive`]) {
                        this[`${service}Service`].restartService();
                    }
                }
            } else {
                this.logger.info(`${response.data.msg}`);
            }
        });

        // Initial feeding
        this.dog.feed(this.food);
    }
}

export default WatchdogService;
