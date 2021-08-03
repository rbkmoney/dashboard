import { Claim, StatusModificationUnit } from '../../../../api-codegen/claim-management/swagger-codegen';

export const generateMockClaim = (
    id: number = 1,
    status: StatusModificationUnit.StatusEnum | string = StatusModificationUnit.StatusEnum.Pending,
    revision: number = 1,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
): Claim => ({
    id,
    status,
    changeset: [],
    revision,
    createdAt,
    updatedAt,
});
