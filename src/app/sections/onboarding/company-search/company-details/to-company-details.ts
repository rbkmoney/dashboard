import { PartyContent } from '../../../../api-codegen/aggr-proxy';
import { CompanyDetails } from './company-details';

export const toCompanyDetails = ({ value, address, ogrn, inn, kpp }: PartyContent): CompanyDetails => ({
    name: value,
    address: address.value,
    ogrn,
    inn,
    kpp
});
