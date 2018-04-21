
module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('bids', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        bid_index: {
            type: Sequelize.INTEGER,
        },
        price: {
            type: Sequelize.INTEGER,
        },
        data_id: {
            type: Sequelize.INTEGER,
        },
        dc_wallet: {
            type: Sequelize.STRING,
        },
        hash: {
            type: Sequelize.STRING,
        },
        dc_id: {
            type: Sequelize.STRING,
        },
        total_escrow_time: {
            type: Sequelize.INTEGER,
        },
        stake: {
            type: Sequelize.INTEGER,
        },
        data_size_bytes: {
            type: Sequelize.INTEGER,
        },
    }),
    down: (queryInterface, Sequelize) => queryInterface.dropTable('bids'),
};
