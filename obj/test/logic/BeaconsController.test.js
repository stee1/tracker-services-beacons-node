"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const BeaconsMemoryPersistence_1 = require("../../src/persistence/BeaconsMemoryPersistence");
const BeaconsController_1 = require("../../src/logic/BeaconsController");
let BEACON1 = {
    id: '1',
    udi: '000001',
    site_id: '1',
    label: 'TestBeacon1',
    center: { type: 'Point', coordinates: [1, 1] },
    radius: 50
};
let BEACON2 = {
    id: '2',
    udi: '000002',
    site_id: '1',
    label: 'TestBeacon2',
    center: { type: 'Point', coordinates: [2, 2] },
    radius: 70
};
suite('BeaconsController', () => {
    let persistence;
    let controller;
    setup((done) => {
        persistence = new BeaconsMemoryPersistence_1.BeaconsMemoryPersistence();
        persistence.configure(new pip_services_commons_node_1.ConfigParams());
        controller = new BeaconsController_1.BeaconsController();
        let references = pip_services_commons_node_2.References.fromTuples(new pip_services_commons_node_3.Descriptor('tracker-services-beacons', 'persistence', 'memory', 'default', '1.0'), persistence, new pip_services_commons_node_3.Descriptor('tracker-services-beacons', 'controller', 'default', 'default', '1.0'), controller);
        controller.setReferences(references);
        persistence.open(null, done);
    });
    teardown((done) => {
        persistence.close(null, done);
    });
    test('CRUD operations', (done) => {
        async.series([
            // Create first beacon
            (callback) => {
                controller.createBeacon(null, BEACON1, (err, beacon) => {
                    assert.isNull(err);
                    assert.isObject(beacon);
                    assert.equal(beacon.udi, BEACON1.udi);
                    assert.equal(beacon.site_id, BEACON1.site_id);
                    assert.equal(beacon.label, BEACON1.label);
                    assert.isNotNull(beacon.center);
                    callback();
                });
            },
            // Create second beacon
            (callback) => {
                controller.createBeacon(null, BEACON2, (err, beacon) => {
                    assert.isNull(err);
                    assert.isObject(beacon);
                    assert.equal(beacon.udi, BEACON2.udi);
                    assert.equal(beacon.site_id, BEACON2.site_id);
                    assert.equal(beacon.label, BEACON2.label);
                    assert.isNotNull(beacon.center);
                    callback();
                });
            }
        ], done);
    });
    /*test('Get with filters', (done) => {
        fixture.testGetWithFilters(done);
    });*/
    test('CRUD operations', (done) => {
        async.series([
            // Create first beacon
            (callback) => {
                controller.createBeacon(null, BEACON1, (err, beacon) => {
                    assert.isNull(err);
                    assert.isObject(beacon);
                    assert.equal(beacon.udi, BEACON1.udi);
                    assert.equal(beacon.site_id, BEACON1.site_id);
                    assert.equal(beacon.label, BEACON1.label);
                    assert.isNotNull(beacon.center);
                    callback();
                });
            },
            // Create second beacon
            (callback) => {
                controller.createBeacon(null, BEACON2, (err, beacon) => {
                    assert.isNull(err);
                    assert.isObject(beacon);
                    assert.equal(beacon.udi, BEACON2.udi);
                    assert.equal(beacon.site_id, BEACON2.site_id);
                    assert.equal(beacon.label, BEACON2.label);
                    assert.isNotNull(beacon.center);
                    callback();
                });
            }
        ], done);
    });
    /*test('calculate positions', (done) => {
        
        async.series([
            // Create first beacon
            (callback) => {
                controller.createBeacon(
                    null,
                    BEACON1,
                    (err, beacon) => {
                        assert.isNull(err);

                        assert.isObject(beacon);
                        assert.equal(beacon.udi, BEACON1.udi);
                        assert.equal(beacon.site_id, BEACON1.site_id);
                        assert.equal(beacon.label, BEACON1.label);
                        assert.isNotNull(beacon.center);

                        callback();
                    }
                );
            },

            // Create second beacon
        (callback) => {
            controller.createBeacon(
                null,
                BEACON2,
                (err, beacon) => {
                    assert.isNull(err);

                    assert.isObject(beacon);
                    assert.equal(beacon.udi, BEACON2.udi);
                    assert.equal(beacon.site_id, BEACON2.site_id);
                    assert.equal(beacon.label, BEACON2.label);
                    assert.isNotNull(beacon.center);

                    callback();
                }
            );
        },

        // Calculate position for one beacon
        (callback) => {
            controller.calculatePosition(
                null,
                "1", ["000001"],
                (err, position) => {
                    assert.isNull(err);

                    assert.isObject(position);
                    assert.equal(position.type, "Point");
                    assert.equal(position.coordinates[0], 1);
                    assert.equal(position.coordinates[1], 1);

                    callback();
                }
            );
        },

      /*  //calculate position for two beacons
        (callback) => {
            controller.calculatePosition(
                null,
                "1", ["000001", "000002"],
                (err, position) => {
                    assert.isNull(err);

                    assert.isObject(position);
                    assert.equal(position.type, "Point");
                    assert.equal(position.coordinates[0], 1);
                    assert.equal(position.coordinates[1], 1);

                    callback();
                }
            );
        },

        //calculate position for unknow beacons
        (callback) => {
            controller.calculatePosition(
                null,
                "1", ["000003", "000004"],
                (err, position) => {
                    assert.isNull(err);

                    assert.isNull(position);

                    callback();
                }
            );
        },

        //calculate position for no beacons
        (callback) => {
            controller.calculatePosition(
                null,
                "1", [],
                (err, position) => {
                    assert.isNull(err);

                    assert.isNull(position);

                    callback();
                }
            );
        }


    ], done);

    });*/
});
//# sourceMappingURL=BeaconsController.test.js.map