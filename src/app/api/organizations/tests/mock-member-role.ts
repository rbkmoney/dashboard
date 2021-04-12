import { MemberRole, ResourceScopeId, RoleId } from '@dsh/api-codegen/organizations';

export const MOCK_MEMBER_ROLE: MemberRole = {
    id: '6b24fe4b-f9a4-4b2a-9895-a464c098f59b',
    roleId: RoleId.Administrator,
    scope: {
        id: ResourceScopeId.Shop,
        resourceId: '2548f3bd-b426-4f2f-a375-50270d617f48',
    },
};
