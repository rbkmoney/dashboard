import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Deposit } from '@dsh/api-codegen/wallet-api';
import { ExpandedIdManager, Fragment } from '@dsh/app/shared/services';

import { DepositsService } from './deposits.service';

@Injectable()
export class DepositsExpandedIdManagerService extends ExpandedIdManager<Deposit> {
    constructor(protected route: ActivatedRoute, protected router: Router, private depositsService: DepositsService) {
        super(route, router);
    }

    protected toFragment(deposit: Deposit): Fragment {
        return deposit.id;
    }

    protected fragmentNotFound(): void {
        this.depositsService.loadMore();
    }

    protected get dataSet$(): Observable<Deposit[]> {
        return this.depositsService.list$;
    }
}
