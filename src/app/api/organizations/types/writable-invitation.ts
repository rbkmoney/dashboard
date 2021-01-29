import { Invitation } from '@dsh/api-codegen/organizations';

export type WritableInvitation = Omit<Invitation, 'id' | 'createdAt'>;
