import Command from '../command.js';
import { ERROR_TYPE } from '../../constants.js';

class StoreInitCommand extends Command {
    constructor(ctx) {
        super(ctx);
        this.logger = ctx.logger;
        this.config = ctx.config;
        this.networkModuleManager = ctx.networkModuleManager;
    }

    /**
     * Executes command and produces one or more events
     * @param command
     */
    async execute(command) {
        const { sessionId } = command.data;
        this.networkModuleManager.removeSession(sessionId);

        return Command.empty();
    }

    /**
     * Recover system from failure
     * @param command
     * @param err
     */
    async recover(command, err) {
        return Command.empty();
    }

    handleError(handlerId, error, msg) {
        this.logger.error({
            msg,
            Operation_name: 'Error',
            Event_name: ERROR_TYPE.REMOVE_SESSION_ERROR,
            Event_value1: error.message,
            Id_operation: handlerId,
        });
    }

    /**
     * Builds default removeSessionCommand
     * @param map
     * @returns {{add, data: *, delay: *, deadline: *}}
     */
    default(map) {
        const command = {
            name: 'removeSessionCommand',
            delay: 0,
            transactional: false,
        };
        Object.assign(command, map);
        return command;
    }
}

export default StoreInitCommand;
