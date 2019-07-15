import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, filter, tap } from 'rxjs/operators';
import * as moment from 'moment';

import { ClaimsService } from '../../../claims';

@Injectable()
export class ClaimService {
    claim$ = this.route.paramMap.pipe(
        filter(params => !!params.get('id')),
        switchMap(params => this.claimsService.getClaim(Number(params.get('id'))))
    );

    constructor(private route: ActivatedRoute, private claimsService: ClaimsService) {}
}
