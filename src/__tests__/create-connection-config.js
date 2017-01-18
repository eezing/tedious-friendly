
const create = require('../create-connection-config');

describe('create-connection-config', function() {

    var connectionString;

    beforeEach(function() {
        connectionString = 'Driver={SQL Server Native Client 11.0};Server=tcp:some-databases-west.database.windows.net,1433;UID=DbUserName;PWD=d0!fxy@D9lxmin4;Database={some-Crazy-West};';
    });

    describe('default config', function() {

        it('should return object as expected', function() {

            const result = create(connectionString);

            const expected = {
                userName: 'DbUserName',
                password: 'd0!fxy@D9lxmin4',
                server: 'some-databases-west.database.windows.net',
                options: {
                    database: 'some-Crazy-West',
                    rowCollectionOnRequestCompletion: true,
                    encrypt: true
                }
            };

            expect(result).toEqual(expected);
        });
    });

    describe('custom config', function() {

        it('should return object as expected when given custom config with options', function() {

            const result = create(connectionString, { userName: 'jamesGates', options: { encrypt: false } });

            const expected = {
                userName: 'jamesGates',
                password: 'd0!fxy@D9lxmin4',
                server: 'some-databases-west.database.windows.net',
                options: {
                    database: 'some-Crazy-West',
                    rowCollectionOnRequestCompletion: true,
                    encrypt: false
                }
            };

            expect(result).toEqual(expected);
        });

        it('should return object as expected when given custom config without options', function() {

            const result = create(connectionString, { userName: 'jamesGates' });

            const expected = {
                userName: 'jamesGates',
                password: 'd0!fxy@D9lxmin4',
                server: 'some-databases-west.database.windows.net',
                options: {
                    database: 'some-Crazy-West',
                    rowCollectionOnRequestCompletion: true,
                    encrypt: true
                }
            };

            expect(result).toEqual(expected);
        });

        it('should return object as expected with options.rowCollectionOnRequestCompletion = true regardless of custom value', function() {

            const result = create(connectionString, { options: { rowCollectionOnRequestCompletion: false } });

            const expected = {
                userName: 'DbUserName',
                password: 'd0!fxy@D9lxmin4',
                server: 'some-databases-west.database.windows.net',
                options: {
                    database: 'some-Crazy-West',
                    rowCollectionOnRequestCompletion: true,
                    encrypt: true
                }
            };

            expect(result).toEqual(expected);
        });
    });
});
