import { OrganizationSearchResult } from '@dsh/api-codegen/organizations';

import { mockOrg } from './mock-org';

export const mockOrgs: OrganizationSearchResult = {
    result: new Array(5).fill(mockOrg),
};
