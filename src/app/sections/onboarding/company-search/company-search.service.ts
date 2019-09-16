import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ContractorType } from './contractor-type';
import { SuggestionData } from '../../../dadata/model/suggestions';
import { SuggestionType } from '../../../dadata/model/type';

@Injectable()
export class CompanySearchService {
    suggestionToContractorType(suggestion: SuggestionData<SuggestionType.party>): ContractorType {
        console.log(suggestion);
        return ContractorType.IndividualEntity;
    }

    createInitialClaim(type: ContractorType): Observable<number> {
        console.log(type);
        return of(1);
    }
}
