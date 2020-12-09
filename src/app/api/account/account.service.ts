import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Account, AccountsService } from '@dsh/api-codegen/capi/swagger-codegen';

import { genXRequestID } from '../utils';

@Injectable()
export class AccountService {
    constructor(private accountsService: AccountsService) {}

    getAccountByID(accountID: number): Observable<Account> {
        return this.accountsService.getAccountByID(genXRequestID(), accountID);
    }
}
