import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Account, AccountsService } from '../api/capi/swagger-codegen';
import { genXRequestID } from '../api/gen-x-request-id';

@Injectable()
export class AccountService {

    constructor(private accountsService: AccountsService) {}

    getAccountByID(accountID: number): Observable<Account> {
        return this.accountsService.getAccountByID(genXRequestID(), accountID);
    }
}
