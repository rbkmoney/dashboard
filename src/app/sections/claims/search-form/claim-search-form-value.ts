import { StatusModificationUnit } from '../../../api-codegen/claim-management/swagger-codegen';

export interface ClaimSearchFormValue {
    claimID: number;
    claimStatus: StatusModificationUnit.StatusEnum[];
}
