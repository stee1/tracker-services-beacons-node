import { ObjectSchema } from 'pip-services-commons-node';
import { TypeCode } from 'pip-services-commons-node';

export class BeaconV1Schema extends ObjectSchema {

    public constructor() {
        super();

        this.withOptionalProperty('id', TypeCode.String);
        this.withRequiredProperty('site_id', TypeCode.String);
        this.withRequiredProperty('udi', TypeCode.String);
        this.withOptionalProperty('label', TypeCode.String);
        this.withOptionalProperty('center', null); //TypeCode.Object
        this.withOptionalProperty('radius', TypeCode.Float);
    }
}