import { Injectable } from '@angular/core';
import { IdGeneratorService } from '@rbkmoney/id-generator';
import { Observable } from 'rxjs';

import { Contract, ContractsService as ContractsAPIService } from '@dsh/api-codegen/capi/swagger-codegen';

@Injectable()
export class ContractsService {
    constructor(private contractsService: ContractsAPIService, private idGenerator: IdGeneratorService) {}

    getContractByID(contractID: string): Observable<Contract> {
        return this.contractsService.getContractByID(this.idGenerator.shortUuid(), contractID);
    }
}
