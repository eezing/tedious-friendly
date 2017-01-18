'use strict';

const ConnectionPool = require('tedious-connection-pool');

module.exports = (connectionConfig, poolConfig = { min: 0, max: 4 }) => {
    return new ConnectionPool(poolConfig, connectionConfig);
};
