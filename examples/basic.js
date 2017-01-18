'use strict';

const friendly = require('tedious-friendly');
const TYPES = friendly.tedious.TYPES;


// configuration
const connectionString = 'Driver={SQL Server Native Client 11.0};Server=tcp:app.database.windows.net,1433;UID=db_user;PWD=db_password;Database={user-accounts};';
const connectionConfig = { options: { useUTC: true } };
const poolConfig = { min: 2, max: 4, log: true };

// create connection pool
const db = friendly.create({ connectionString, connectionConfig, poolConfig });

// define params for query request
const params = {
    id: [TYPES.UniqueIdentifier, '8F41C105-1D24-E511-80C8-000C2927F443']
};

// run query request
db.query('select * from users where id = @id', params, (err, data) => {

    if (err) {
        console.error(err); // --> unmodified error from tedious
    }

    console.log(data); // --> [{ id: '8F41C105-1D24-E511-80C8-000C2927F443', email: 'bart@hotmail.com' }]
});
