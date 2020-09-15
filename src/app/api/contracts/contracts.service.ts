import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Contract, ContractsService as ContractsAPIService } from '../../api-codegen/capi/swagger-codegen';
import { genXRequestID } from '../utils';

@Injectable()
export class ContractsService {
    constructor(private contractsService: ContractsAPIService) {}

    getContractByID(contractID: string): Observable<Contract> {
        return this.contractsService.getContractByID(genXRequestID(), contractID);
    }
}
