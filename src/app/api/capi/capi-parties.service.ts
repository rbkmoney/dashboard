import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PartiesService, Party } from '@dsh/api-codegen/capi';

import { genXRequestID } from '../utils';

@Injectable()
export class CAPIPartiesService {
    constructor(private partiesService: PartiesService) {
    }

    /**
     * Create if not exist and return party
     */
    getMyParty(): Observable<Party> {
        return this.partiesService.getMyParty(genXRequestID());
    }
}
