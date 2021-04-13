import { RoleId } from '@dsh/api-codegen/organizations';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';

export type SelectRoleDialogResult = BaseDialogResponseStatus | { selectedRoleId: RoleId };
