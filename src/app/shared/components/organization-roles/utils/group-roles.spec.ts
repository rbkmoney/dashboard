import { ResourceScopeId, RoleId } from '@dsh/api-codegen/organizations';
import { MOCK_MEMBER } from '@dsh/api/organizations/tests/mock-member';
import { MOCK_MEMBER_ROLE } from '@dsh/api/organizations/tests/mock-member-role';

import { RoleGroup } from '../types/role-group';
import { groupRoles } from './group-roles';

describe('getRolesByGroup', () => {
    const expected: RoleGroup[] = [
        {
            id: RoleId.Administrator,
            scopes: [
                {
                    id: ResourceScopeId.Shop,
                    resourcesIds: new Array(8).fill(MOCK_MEMBER_ROLE.scope.resourceId),
                },
            ],
        },
        {
            id: RoleId.Manager,
            scopes: [
                {
                    id: ResourceScopeId.Shop,
                    resourcesIds: new Array(5).fill(MOCK_MEMBER_ROLE.scope.resourceId),
                },
            ],
        },
    ];

    it('should convert to roles by group', () => {
        const actual = groupRoles(MOCK_MEMBER.roles);
        expect(actual).toEqual(expected);
    });

    it('should sort', () => {
        const actual = groupRoles(Array.from(MOCK_MEMBER.roles).reverse());
        expect(actual).toEqual(expected);
    });

    it('empty array', () => {
        const actual = groupRoles([]);
        expect(actual).toEqual([]);
    });
});
