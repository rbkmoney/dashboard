import { MemberOrgListResult } from '@dsh/api-codegen/organizations';

import { mockMember } from './mock-member';

export const mockMembers: MemberOrgListResult = {
    result: new Array(11).fill(mockMember),
};
