import { Organization } from '../../../api-codegen/organizations';

export const mockOrg: Organization = {
    id: '9d560cdb-ce17-4ba5-b5c6-cc9c0eb1ad19',
    createdAt: '2020-10-30T19:30:57Z',
    name: 'Organization name #3',
    owner: '0d560cdb-ce17-4ba5-b5c6-cc9c0eb1ad19' as never, // UserID
};
