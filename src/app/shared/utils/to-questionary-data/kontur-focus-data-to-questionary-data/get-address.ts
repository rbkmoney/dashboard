import { ParsedAddressRF, Toponim } from '@dsh/api-codegen/aggr-proxy';

function getAddressPart(toponim: Toponim): string {
    return [toponim?.topoShortName, toponim?.topoValue].filter(Boolean).join(' ');
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
