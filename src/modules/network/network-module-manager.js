import { v4 as uuidv4 } from 'uuid';
import rank from './implementation/kad-identity-ranking.js';
import BaseModuleManager from '../base-module-manager.js';

class NetworkModuleManager extends BaseModuleManager {
    getName() {
        return 'network';
    }

    /**
     * Retrieve the closest peers to the given key.
     *
     * @param {String} key
     * @param {Number} limit
     * @returns Promise{Iterable<PeerId>}
     */
    async findNodes(key, protocol, limit) {
        if (this.initialized) {
            const Id_operation = uuidv4();
            this.logger.emit({
                msg: 'Started measuring execution of find nodes',
                Event_name: 'find_nodes_start',
                Operation_name: 'find_nodes',
                Id_operation,
            });
            this.logger.emit({
                msg: 'Started measuring execution of kad find nodes',
                Event_name: 'kad_find_nodes_start',
                Operation_name: 'find_nodes',
                Id_operation,
            });
            const nodes = await this.getImplementation().module.findNodes(key, protocol);
            this.logger.emit({
                msg: 'Finished measuring execution of kad find nodes ',
                Event_name: 'kad_find_nodes_end',
                Operation_name: 'find_nodes',
                Id_operation,
            });
            this.logger.emit({
                msg: 'Started measuring execution of rank nodes',
                Event_name: 'rank_nodes_start',
                Operation_name: 'find_nodes',
                Id_operation,
            });
            const rankedNodes = await rank(nodes, key, limit);
            this.logger.emit({
                msg: 'Finished measuring execution of rank nodes',
                Event_name: 'rank_nodes_end',
                Operation_name: 'find_nodes',
                Id_operation,
            });
            this.logger.emit({
                msg: 'Finished measuring execution of find nodes',
                Event_name: 'find_nodes_end',
                Operation_name: 'find_nodes',
                Id_operation,
            });
            return rankedNodes;
        }
    }

    getPeers() {
        if (this.initialized) {
            return this.getImplementation().module.getPeers();
        }
    }

    /**
     * Store the given key/value pair at the peer `target`.
     *
     * @param {String} key
     * @param {Object} object - value to be stored
     * @param {PeerId} target
     */
    store(peer, key, object) {
        if (this.initialized) {
            return this.getImplementation().module.store(peer, key, object);
        }
    }

    async sendMessage(protocol, remotePeerId, message, options) {
        if (this.initialized) {
            return this.getImplementation().module.sendMessage(
                protocol,
                remotePeerId,
                message,
                options,
            );
        }
    }

    async sendMessageResponse(protocol, remotePeerId, response, options) {
        if (this.initialized) {
            return this.getImplementation().module.sendMessageResponse(
                protocol,
                remotePeerId,
                response,
                options,
            );
        }
    }

    handleMessage(protocol, handler, options) {
        if (this.initialized) {
            this.getImplementation().module.handleMessage(protocol, handler, options);
        }
    }

    removeSession(sessionId) {
        if (this.initialized) {
            this.getImplementation().module.removeSession(sessionId);
        }
    }

    getPeerId() {
        if (this.initialized) {
            return this.getImplementation().module.getPeerId();
        }
    }

    getPrivateKey() {
        if (this.initialized) {
            return this.getImplementation().module.getPrivateKey();
        }
    }

    async healthCheck() {
        if (this.initialized) {
            return this.getImplementation().module.healthCheck();
        }
    }
}

export default NetworkModuleManager;
