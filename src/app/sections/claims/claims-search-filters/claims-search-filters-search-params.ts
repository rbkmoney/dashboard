import { StatusModificationUnit } from '../../../api-codegen/claim-management/swagger-codegen';

export interface ClaimsSearchFiltersSearchParams {
    claimID?: number;
    claimStatuses?: StatusModificationUnit.StatusEnum[];
}
