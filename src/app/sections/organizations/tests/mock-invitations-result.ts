import {
    Invitation,
    InvitationListResult,
    InvitationStatusName,
    Invitee,
    InviteeContact,
} from '@dsh/api-codegen/organizations';

import { mockMemberRole } from './mock-member-role';

const mockInviteeContact: InviteeContact = {
    type: InviteeContact.TypeEnum.EMail,
    email: 'user@rbkmoney.com',
};

const mockInvitee: Invitee = {
    contact: mockInviteeContact,
    roles: [mockMemberRole],
};

const mockInvitation: Invitation = {
    id: 'acc87d05-3884-4789-bacc-5da299667409',
    createdAt: '2019-11-21T18:43:00.000000Z',
    expiresAt: '2020-11-21T18:43:00.000000Z',
    invitee: mockInvitee,
    acceptToken: 'token',
    metadata: { metameta: 'postpost' },
    status: InvitationStatusName.Pending,
};

export const mockInvitationsResult: InvitationListResult = {
    result: new Array(5).fill(mockInvitation),
};
