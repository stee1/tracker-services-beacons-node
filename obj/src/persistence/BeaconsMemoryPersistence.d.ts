import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services-data-node';
import { BeaconV1 } from '../data/version1/BeaconV1';
import { IBeaconsPersistence } from './IBeaconsPersistence';
export declare class BeaconsMemoryPersistence extends IdentifiableMemoryPersistence<BeaconV1, string> implements IBeaconsPersistence {
    constructor();
    private matchString(value, search);
    private matchSearch(item, search);
    private composeFilter(filter);
    getPageByFilter(correlationudi: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<BeaconV1>) => void): void;
}
