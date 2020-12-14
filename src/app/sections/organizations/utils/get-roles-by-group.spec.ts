import { mockMember } from '../tests/mock-member';
import { RoleGroup } from '../types/role-group';
import { getRolesByGroup } from './get-roles-by-group';

describe('getRolesByGroup', () => {
    const expected: RoleGroup[] = [
        {
            id: 'Integrator',
            scopes: [
                {
                    id: 'Shop',
                    resourcesIds: [
                        '7d560cdb-ce17-4ba5-b5c6-cc9c0eb1ad19',
                        '7d560cdb-ce17-4ba5-b5c6-cc9c0eb1ad19',
                        '7d560cdb-ce17-4ba5-b5c6-cc9c0eb1ad19',
                        '7d560cdb-ce17-4ba5-b5c6-cc9c0eb1ad19',
                        '7d560cdb-ce17-4ba5-b5c6-cc9c0eb1ad19',
                        '7d560cdb-ce17-4ba5-b5c6-cc9c0eb1ad19',
                        '7d560cdb-ce17-4ba5-b5c6-cc9c0eb1ad19',
                        '7d560cdb-ce17-4ba5-b5c6-cc9c0eb1ad19',
                    ],
                },
            ],
        },
        {
            id: 'Manager',
            scopes: [
                {
                    id: 'Shop',
                    resourcesIds: [
                        '9d560cdb-ce17-4ba5-b5c6-cc9c0eb1ad19',
                        '9d560cdb-ce17-4ba5-b5c6-cc9c0eb1ad19',
                        '9d560cdb-ce17-4ba5-b5c6-cc9c0eb1ad19',
                        '9d560cdb-ce17-4ba5-b5c6-cc9c0eb1ad19',
                        '9d560cdb-ce17-4ba5-b5c6-cc9c0eb1ad19',
                    ],
                },
            ],
        },
    ];

    it('should convert to roles by group', () => {
        const actual = getRolesByGroup(mockMember.roles);
        expect(actual).toEqual(expected);
    });

    it('should sort', () => {
        const actual = getRolesByGroup(mockMember.roles.reverse());
        expect(actual).toEqual(expected);
    });

    it('empty array', () => {
        const actual = getRolesByGroup([]);
        expect(actual).toEqual([]);
    });
});
