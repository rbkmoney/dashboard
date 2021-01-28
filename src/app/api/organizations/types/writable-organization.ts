import { Organization } from '@dsh/api-codegen/organizations';

export type WritableOrganization = Omit<Organization, 'id' | 'createdAt'>;
