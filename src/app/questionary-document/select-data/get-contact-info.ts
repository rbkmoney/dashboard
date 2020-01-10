import { ContactInfo } from '../../api-codegen/questionary';
import { toOptional } from '../../../utils';

export function getContactInfo(contactInfo: ContactInfo): string {
    const { phoneNumber, email } = toOptional(contactInfo);
    return [phoneNumber, email].filter(i => i).join(', ');
}
