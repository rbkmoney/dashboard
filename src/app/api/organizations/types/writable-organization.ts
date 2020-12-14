import { Organization } from '../../../api-codegen/organizations';

export type WritableOrganization = Omit<Organization, 'id' | 'createdAt'>;
