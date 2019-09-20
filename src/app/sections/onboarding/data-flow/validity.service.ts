import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class ValidityService {
    isActiveStepValid$: Observable<boolean> = of(false);
    isFlowValid$: Observable<boolean> = of(false);

    setUpValidity(isValid: boolean) {
        console.log(isValid);
    }
}
