import { Injectable } from '@angular/core';
import { IdGeneratorService } from '@rbkmoney/id-generator';
import { Observable } from 'rxjs';

import { PartiesService, Party } from '@dsh/api-codegen/capi';

@Injectable()
export class CapiPartiesService {
    constructor(private partiesService: PartiesService, private idGenerator: IdGeneratorService) {}

    /**
     * Create if not exist and return party
     */
    getMyParty(): Observable<Party> {
        return this.partiesService.getMyParty(this.idGenerator.shortUuid());
    }
}
