import { Member, MemberRole } from '../../../api-codegen/organizations';

export const mockMemeber: Member = {
    id: '8d560cdb-ce17-4ba5-b5c6-cc9c0eb1ad19',
    userEmail: 'test@mail.com',
    roles: [
        ...new Array(8).fill({
            roleId: 'Integrator',
            scope: {
                id: 'Shop',
                resourceId: '7d560cdb-ce17-4ba5-b5c6-cc9c0eb1ad19',
            },
        } as MemberRole),
        ...new Array(5).fill({
            roleId: 'Manager',
            scope: {
                id: 'Shop',
                resourceId: '9d560cdb-ce17-4ba5-b5c6-cc9c0eb1ad19',
            },
        } as MemberRole),
    ],
};
