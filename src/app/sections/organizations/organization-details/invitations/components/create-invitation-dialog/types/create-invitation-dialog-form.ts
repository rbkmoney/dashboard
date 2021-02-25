import { RoleId } from '@dsh/api-codegen/organizations';

export interface CreateInvitationDialogForm {
    email: string;
    roles: { id: RoleId; shopIds: string[] }[];
}
