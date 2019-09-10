import { ContactInfo } from '../../../api-codegen/questionary';

export function getLegalOwnerContactInfo(contactInfo: ContactInfo): string {
    return [contactInfo.phoneNumber, contactInfo.email].filter(i => !!i).join(', ');
}
