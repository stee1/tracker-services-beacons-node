"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let Mixed = mongoose_1.Schema.Types.Mixed;
exports.BeaconsMongoDbSchema = function (collection) {
    collection = collection || "beacons";
    let schema = new mongoose_1.Schema({
        _id: { type: String, unique: true },
        site_id: { type: String, required: true },
        udi: { type: String, required: true },
        label: { type: String, required: false },
        center: { type: Mixed, required: false },
        radius: { type: Number, required: false }
    }, {
        collection: collection,
        autoIndex: true
    });
    schema.set('toJSON', {
        transform: function (doc, ret) {
            ret.id = ret.id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });
    return schema;
};
//# sourceMappingURL=BeaconsMongoDbSchema.js.map