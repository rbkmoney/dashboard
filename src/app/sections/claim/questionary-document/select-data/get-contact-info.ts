import get from 'lodash.get';

import { ContactInfo } from '../../../../api-codegen/questionary';

export function getContactInfo(contactInfo: ContactInfo): string {
    return [get(contactInfo, 'phoneNumber'), get(contactInfo, 'email')].filter(i => !!i).join(', ');
}
