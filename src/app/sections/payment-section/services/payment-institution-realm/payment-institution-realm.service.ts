import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { PaymentInstitution } from '@dsh/api-codegen/capi';
import { publishReplayRefCount } from '@dsh/operators';

import RealmEnum = PaymentInstitution.RealmEnum;

@Injectable()
export class PaymentInstitutionRealmService {
    realm$: Observable<RealmEnum> = this.route.params.pipe(pluck<unknown, RealmEnum>('realm'), publishReplayRefCount());

    get realm(): RealmEnum {
        return this.route.snapshot.params?.realm as RealmEnum;
    }

    constructor(private route: ActivatedRoute) {}
}
