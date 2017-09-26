let BeaconProcess = require('../obj/src/container/BeaconsProcess').BeaconsProcess;

try {
    new BeaconProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}