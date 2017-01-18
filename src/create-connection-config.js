'use strict';

module.exports = (connectionString, connectionConfig = {}) => {

    const out = Object.assign({
        userName: parseProperty('UID', connectionString),
        password: parseProperty('PWD', connectionString),
        server: parseProperty('Server', connectionString).split(':')[1].split(',')[0]
    }, connectionConfig);

    out.options = Object.assign({
        encrypt: true,
        database: parseProperty('Database', connectionString).replace('{', '').replace('}', '')
    }, out.options, { rowCollectionOnRequestCompletion: true });

    return out;
};

function parseProperty(propertyName, connectionString) {

    const split = connectionString.split(';');
    const rawProperty = split.filter(part => part.startsWith(propertyName + '='))[0];
    const value = rawProperty.replace(propertyName + '=', '');

    return value;
}
