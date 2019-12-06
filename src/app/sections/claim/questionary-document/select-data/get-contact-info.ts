import { ContactInfo } from '../../../../api-codegen/questionary';

export function getContactInfo(contactInfo: ContactInfo): string {
    return [contactInfo.phoneNumber, contactInfo.email].filter(i => !!i).join(', ');
}
