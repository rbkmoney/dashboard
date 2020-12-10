import {
    AddressQuery,
    BankQuery,
    DaDataRequest,
    FioQuery,
    FmsUnitQuery,
    OkvedQuery,
    PartyQuery,
} from '@dsh/api-codegen/aggr-proxy';

import { Mapping } from '../../../type-utils';

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
