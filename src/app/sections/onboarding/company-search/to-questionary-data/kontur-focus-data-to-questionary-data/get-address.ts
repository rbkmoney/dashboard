import { ParsedAddressRF, Toponim } from '../../../../../api-codegen/aggr-proxy';

function getAddressPart(toponim: Toponim, isFullName = false): string {
    return toponim ? `${isFullName ? toponim.topoFullName : toponim.topoShortName} ${toponim.topoValue}` : null;
}

export function getAddress(address: ParsedAddressRF): string {
    return [
        getAddressPart(address.regionName),
        getAddressPart(address.district),
        getAddressPart(address.city),
        getAddressPart(address.settlement),
        getAddressPart(address.street),
        getAddressPart(address.bulk),
        getAddressPart(address.house),
        getAddressPart(address.flat),
    ]
        .filter((v) => !!v)
        .join(', ');
}
