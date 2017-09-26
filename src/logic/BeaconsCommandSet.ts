import { CommandSet } from 'pip-services-commons-node';
import { ICommand } from 'pip-services-commons-node';
import { Command } from 'pip-services-commons-node';
import { Schema } from 'pip-services-commons-node';
import { Parameters } from 'pip-services-commons-node';
import { ObjectSchema } from 'pip-services-commons-node';
import { ArraySchema } from 'pip-services-commons-node';
import { TypeCode } from 'pip-services-commons-node';
import { FilterParamsSchema } from 'pip-services-commons-node';
import { PagingParamsSchema } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';

import { BeaconV1 } from '../data/version1/BeaconV1';
import { BeaconV1Schema} from '../data/version1/BeaconV1Schema';
import { IBeaconsController } from './IBeaconsController';

export class BeaconsCommandSet extends CommandSet {
    private _controller: IBeaconsController;

    constructor(controller: IBeaconsController) {
        super();

        this._controller = controller;

        this.addCommand(this.makeGetBeaconsCommand());
        this.addCommand(this.makeGetBeaconByIdCommand());
        this.addCommand(this.makeCalculatePositionCommand());
        this.addCommand(this.makeCreateBeaconCommand());
        this.addCommand(this.makeUpdateBeaconCommand());
        this.addCommand(this.makeDeleteBeaconByIdCommand());
    }

    private makeGetBeaconsCommand(): ICommand {
        return new Command(
            'get_beacons',
            new ObjectSchema(true)
                .withOptionalProperty('filter', new FilterParamsSchema())
                .withOptionalProperty('paging', new PagingParamsSchema()),
            (correlationId:string, args: Parameters, callback: (err: any, result: any) => void) => {
                let filter = FilterParams.fromValue(args.get('filter'));
                let paging = PagingParams.fromValue(args.get('paging'));
                this._controller.getBeacons(correlationId, filter, paging, callback);
            }
        );
    }

    private makeGetBeaconByIdCommand(): ICommand {
        return new Command(
            'get_beacon_by_id',
            new ObjectSchema(true)
                .withOptionalProperty('beacon_id', TypeCode.String),
            (correlationId:string, args: Parameters, callback: (err: any, result: any) => void) => {
                let beaconId = args.getAsString('beacon_id');
                this._controller.getBeaconById(correlationId, beaconId, callback);
            }
        );
    }

    private makeCalculatePositionCommand(): ICommand {
        return new Command(
            'calculate_position',
            new ObjectSchema(true)
                .withOptionalProperty('site_id', TypeCode.String)
                .withOptionalProperty('udis', new ArraySchema(TypeCode.String)),

            (correlationId:string, args: Parameters, callback: (err: any, result: any) => void) => {
                let siteId = args.getAsString('site_id');
                let udis = args.getAsObject('udis');
                this._controller.calculatePosition(correlationId, siteId, udis, callback);
            }
        );
    }

    private makeCreateBeaconCommand(): ICommand {
        return new Command(
            'create_beacon',
            new ObjectSchema(true)
                .withOptionalProperty('beacon', new BeaconV1Schema()),
            (correlationId:string, args: Parameters, callback: (err: any, result: any) => void) => {
                let beacon = args.getAsObject('beacon');
                this._controller.createBeacon(correlationId, beacon, callback);
            }
        );
    }

    private makeUpdateBeaconCommand(): ICommand {
        return new Command(
            'update_beacon',
            new ObjectSchema(true)
                .withOptionalProperty('beacon', new BeaconV1Schema),
            (correlationId:string, args: Parameters, callback: (err: any, result: any) => void) => {
                let beacon = args.getAsObject('beacon');
                this._controller.updateBeacon(correlationId, beacon, callback);
            }
        );
    }

    private makeDeleteBeaconByIdCommand(): ICommand {
        return new Command(
            'delete_beacon_by_id',
            new ObjectSchema(true)
                .withOptionalProperty('beacon_id', TypeCode.String),
            (correlationId:string, args: Parameters, callback: (err: any, result: any) => void) => {
                let beaconId = args.getAsString('beacon_id');
                this._controller.deleteBeaconById(correlationId, beaconId, callback);
            }
        );
    }
}