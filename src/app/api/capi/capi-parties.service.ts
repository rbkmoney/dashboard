import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PartiesService, Party } from '../../api-codegen/capi';
import { genXRequestID } from '../utils';

@Injectable()
export class CAPIPartiesService {
    constructor(private partiesService: PartiesService) {}

    getMyParty(): Observable<Party> {
        return this.partiesService.getMyParty(genXRequestID());
    }
}
