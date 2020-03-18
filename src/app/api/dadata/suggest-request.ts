import { Mapping } from '../../../type-utils';
import {
    AddressQuery,
    BankQuery,
    DaDataRequest,
    FioQuery,
    FmsUnitQuery,
    OkvedQuery,
    PartyQuery
} from '../../api-codegen/aggr-proxy';

const RequestType = DaDataRequest.DaDataRequestTypeEnum;
type RequestType = DaDataRequest.DaDataRequestTypeEnum;

type FullParamsByRequestType = Mapping<
    RequestType,
    DaDataRequest,
    {
        AddressQuery: AddressQuery;
        BankQuery: BankQuery;
        FioQuery: FioQuery;
        FmsUnitQuery: FmsUnitQuery;
        OkvedQuery: OkvedQuery;
        PartyQuery: PartyQuery;
    }
>;

export type ParamsByRequestType = {
    [name in RequestType]: Omit<FullParamsByRequestType[name], 'daDataRequestType'>;
};
