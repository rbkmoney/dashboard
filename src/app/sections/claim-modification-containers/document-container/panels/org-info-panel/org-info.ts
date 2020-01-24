import { AdditionalInfo, RegistrationInfo } from '../../../../../api-codegen/questionary';

export interface OrgInfo {
    additionalInfo: AdditionalInfo;
    name: string;
    inn: string;
    registrationInfo: RegistrationInfo;
}
