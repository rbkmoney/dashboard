import { ClaimStatusesEnum } from '@dsh/app/shared/components/inputs/claim-statuses-field/types/claim-statuses-enum';

export interface ClaimsSearchFiltersSearchParams {
    claimID?: number;
    claimStatuses?: ClaimStatusesEnum[];
}
