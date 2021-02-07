import { InvitationListResult } from '@dsh/api-codegen/organizations';

import { mockInvitation } from './mock-invitation';

export const mockInvitationsResult: InvitationListResult = {
    result: new Array(5).fill(mockInvitation),
};
