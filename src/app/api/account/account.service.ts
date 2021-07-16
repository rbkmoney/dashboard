import { Injectable } from '@angular/core';
import { IdGeneratorService } from '@rbkmoney/id-generator';
import { Observable } from 'rxjs';

import { Account, AccountsService } from '@dsh/api-codegen/capi/swagger-codegen';

@Injectable()
export class AccountService {
    constructor(private accountsService: AccountsService, private idGenerator: IdGeneratorService) {}

    getAccountByID(accountID: number): Observable<Account> {
        return this.accountsService.getAccountByID(this.idGenerator.shortUuid(), accountID);
    }
}
