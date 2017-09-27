let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;
let restify = require('restify');

import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';

import { ConfigParams } from 'pip-services-commons-node';
import { BeaconsMemoryPersistence } from '../../src/persistence/BeaconsMemoryPersistence';
import { BeaconsController } from '../../src/logic/BeaconsController';
import { References } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';

import { BeaconV1 } from '../../src/data/version1/BeaconV1';
import { BeaconsLambdaFunction } from '../../src/container/BeaconsLambdaFunction';

let BEACON1: BeaconV1 = {
    id: '1',
    site_id: '1',
    udi: '000001',
    label: 'TestBeacon1',
    center: { type: 'Point', coordinates: [0, 0] },
    radius: 50
}

let BEACON2: BeaconV1 = {
    id: '2',
    site_id: '1',
    udi: '000002',
    label: 'TestBeacon2',
    center: { type: 'Point', coordinates: [2, 2] },
    radius: 70
}

suite('BeaconsLambdaFunction', () => {
    let lambda: BeaconsLambdaFunction;

    suiteSetup((done) => {
        lambda = new BeaconsLambdaFunction();
        lambda.configure(ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services-commons:logger:console:default:1.0',
            'persistence.descriptor', 'tracker-services-beacons:persistence:memory:default:1.0',
            'controller.descriptor', 'tracker-services-beacons:controller:default:default:1.0'
        ));

        lambda.open(null, done);

    });

    suiteTeardown((done) => {
        lambda.close(null, done);
    });

    test('Calculate position', (done) => {
        async.series([
            (callback) => {
                lambda.act(
                    {
                        role: 'beacons',
                        cmd: 'create_beacon',
                        beacon: BEACON1
                    },
                    (err, beacon) => {
                    assert.isNull(err);

                    assert.isObject(beacon);
                    assert.equal(beacon.udi, BEACON1.udi);
                    assert.equal(beacon.label, BEACON1.label);
                    assert.equal(beacon.site_id, BEACON1.site_id);
                    // assert.equal(beacon.center, BEACON1.center);

                    callback();
                })
            },
            (callback) => {
                lambda.act(
                    {
                        role: 'beacons',
                        cmd: 'calculate_position',
                        site_id: "1",
                        udis: ["000001"]
                    },
                    (err, position) => {
                    assert.isNull(err || null);

                    assert.equal(position.type, "Point");
                   /* assert.equal(position.coordinates[0], 0);
                    assert.equal(position.coordinates[1], 0);*/

                    callback();
                })
            }
         ], done);
        });

            /*
            (callback) => {
                controller.createBeacon(null, BEACON2, (err, beacon) => {
                    assert.isNull(err);

                    assert.isObject(beacon);
                    assert.equal(beacon.udi, BEACON2.udi);
                    assert.equal(beacon.label, BEACON2.label);
                    assert.equal(beacon.site_id, BEACON2.site_id);
                    // assert.equal(beacon.center, BEACON2.center);

                    callback();
                })
            },
            (callback) => {
                controller.calculatePosition(null, '1', ['000001'], (err, position) => {
                    assert.isNull(err);

                    assert.equal(position.coordinates[0], 0);
                    assert.equal(position.coordinates[1], 0);

                    callback();
                })
            },
            (callback) => {
                controller.calculatePosition(null, '1', ['000001', '000002'], (err, position) => {
                    assert.isNull(err);

                    assert.equal(position.coordinates[0], 1);
                    assert.equal(position.coordinates[1], 1);

                    callback();
                })
            }
        ], done);

    });*/
});