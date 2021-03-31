import { Member, RoleId } from '@dsh/api-codegen/organizations';

import { MOCK_MEMBER_ROLE } from './mock-member-role';

export const MOCK_MEMBER: Member = {
    id: '574fff44-1b69-43fc-a93b-bfe415d72e81',
    userEmail: 'test@mail.com',
    roles: [
        ...new Array(8).fill(MOCK_MEMBER_ROLE),
        ...new Array(5).fill({ ...MOCK_MEMBER_ROLE, roleId: RoleId.Manager }),
    ],
};
