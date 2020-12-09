import { StatusModificationUnit } from '@dsh/api-codegen/claim-management/swagger-codegen';

export interface ClaimsSearchFiltersSearchParams {
    claimID: number;
    claimStatuses: StatusModificationUnit.StatusEnum[];
}
