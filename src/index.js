'use strict';

const tedious = require('tedious');
const createConnectionConfig = require('./create-connection-config');
const Pool = require('./create-connection-pool');
const rowsToData = require('./rows-to-data');

exports.tedious = tedious;

exports.create = function({ connectionString, connectionConfig, poolConfig }) {

    const pool = Pool(createConnectionConfig(connectionString, connectionConfig), poolConfig);

    function query(sql, params, callback) {

        if (typeof params === 'function' && callback === undefined) {
            callback = params;
            params = undefined;
        }

        pool.acquire((err, connection) => {

            if (err) {
                return callback(err);
            }

            const request = new tedious.Request(sql, (err, rowCount, rows) => {

                if (err) {
                    return callback(err);
                }

                connection.release();

                callback(null, rowsToData(rows));
            });

            if (params) {
                Object.keys(params).forEach(key => {
                    request.addParameter(key, params[key][0], params[key][1]);
                });
            }

            connection.execSql(request);
        });
    }

    return {
        query
    };
};
