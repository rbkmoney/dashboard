import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Claim, StatusModificationUnit } from '../../api-codegen/claim-management/swagger-codegen';
import { ClaimsTableData } from './table';

const toClaimTableData = ({ id, changeset, status, updatedAt }: Claim): ClaimsTableData | null => ({
    claimID: id,
    changeset,
    status: status as StatusModificationUnit.StatusEnum,
    updatedAt: updatedAt.toString(),
});

const claimsToTableData = (searchResult: Claim[]) => searchResult.map((r) => toClaimTableData(r));

export const mapToClaimsTableData = (s: Observable<Claim[]>) =>
    s.pipe(map((searchResult) => claimsToTableData(searchResult)));
