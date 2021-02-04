import { Member, RoleId } from '@dsh/api-codegen/organizations';

import { mockMemberRole } from './mock-member-role';

export const mockMember: Member = {
    id: '574fff44-1b69-43fc-a93b-bfe415d72e81',
    userEmail: 'test@mail.com',
    roles: [...new Array(8).fill(mockMemberRole), ...new Array(5).fill({ ...mockMemberRole, roleId: RoleId.Manager })],
};
