import { ConfigParams } from 'pip-services-commons-node';

import { BeaconsMemoryPersistence } from '../../src/persistence/BeaconsMemoryPersistence';
import { BeaconsPersistenceFixture } from './BeaconsPersistenceFixture';

suite('BeaconsMemoryPersistence', () => {
    let persistence: BeaconsMemoryPersistence;
    let fixture: BeaconsPersistenceFixture;

    setup((done) => {
        persistence = new BeaconsMemoryPersistence();
        persistence.configure(new ConfigParams());

        fixture = new BeaconsPersistenceFixture(persistence);

        persistence.open(null, done);
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