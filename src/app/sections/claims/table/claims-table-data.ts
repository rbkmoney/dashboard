import { ClaimChangeset, StatusModificationUnit } from '../../../api-codegen/claim-management/swagger-codegen';

export interface ClaimsTableData {
    claimID: number;
    changeset: ClaimChangeset;
    status: StatusModificationUnit.StatusEnum[];
    updatedAt: string;
}
