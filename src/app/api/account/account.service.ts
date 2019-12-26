import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { genXRequestID } from '../utils';
import { Account, AccountsService } from '../../api-codegen/capi/swagger-codegen';

@Injectable()
export class AccountService {
    constructor(private accountsService: AccountsService) {}

    getAccountByID(accountID: number): Observable<Account> {
        return this.accountsService.getAccountByID(genXRequestID(), accountID);
    }
}
