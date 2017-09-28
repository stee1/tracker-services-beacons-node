let process = require('process');

import { ConfigParams } from 'pip-services-commons-node';

import { BeaconsMongoDbPersistence } from '../../src/persistence/BeaconsMongoDbPersistence';
import { BeaconsPersistenceFixture } from './BeaconsPersistenceFixture';

suite('BeaconsMongoDbPersistence', () => {
    let persistence: BeaconsMongoDbPersistence;
    let fixture: BeaconsPersistenceFixture;

    let mongoUri = process.env['MONGO_SERVICE_URI'];
    let mongoHost = process.env['MONGO_SERVICE_HOST'] || 'localhost';
    let mongoPort = process.env['MONGO_SERVICE_PORT'] || 27017;
    let mongoDatabase = process.env['MONGO_SERVICE_DB'] || 'test';
    if(mongoUri == '' && mongoHost == '')
        return;

    setup((done) => {
        persistence = new BeaconsMongoDbPersistence();
        persistence.configure(ConfigParams.fromTuples(
            'connection.url', mongoUri,
            'connection.host', mongoHost,
            'connection.port', mongoPort,
            'connection.database', mongoDatabase,
        ));

        fixture = new BeaconsPersistenceFixture(persistence);

        persistence.open(null, (err) => {
            if (err) {
                console.error(err);
                done(err);
                return;
            }
            persistence.clear(null, done);
        });
    });

    teardown((done) => {
        persistence.close(null, done);
    });

    test('CRUD operations', (done) => {
        fixture.testCrudOperations(done);
    });

    /*test('Get with filters', (done) => {
        fixture.testGetWithFilters(done);
    });*/
});