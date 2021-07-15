import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck, publishReplay, refCount } from 'rxjs/operators';

import { PaymentInstitution } from '@dsh/api-codegen/capi';

import RealmEnum = PaymentInstitution.RealmEnum;

@Injectable()
export class PaymentInstitutionRealmService {
    realm$: Observable<RealmEnum> = this.route.params.pipe(
        pluck<unknown, RealmEnum>('realm'),
        publishReplay(1),
        refCount()
    );

    get realm(): RealmEnum {
        return this.route.snapshot.params?.realm;
    }

    constructor(private route: ActivatedRoute) {}
}
