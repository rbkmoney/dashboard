import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { distinctUntilChanged } from 'rxjs/operators';

import { PaymentInstitution } from '@dsh/api-codegen/capi';

import RealmEnum = PaymentInstitution.RealmEnum;

@UntilDestroy()
@Component({
    selector: 'dsh-toolbar-environment-selector',
    templateUrl: 'toolbar-environment-selector.component.html',
    styleUrls: ['toolbar-environment-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarEnvironmentSelectorComponent implements OnInit {
    formControl = this.fb.control(this.getRealmKey());

    constructor(private fb: FormBuilder, private router: Router) {}

    ngOnInit(): void {
        this.formControl.valueChanges.pipe(distinctUntilChanged(), untilDestroyed(this)).subscribe((value) => {
            void this.router.navigateByUrl(this.getNewRealmUrl(RealmEnum[value])).then(() => window.location.reload());
        });
    }

    private getRealmValue(): RealmEnum {
        return this.router.url
            .split('/')
            .filter((u: RealmEnum) => Object.values(RealmEnum).includes(u))[0] as RealmEnum;
    }

    private getRealmKey(): string {
        const realm = this.getRealmValue();
        return Object.keys(RealmEnum).find((key) => RealmEnum[key] === realm);
    }

    private getNewRealmUrl(realm: RealmEnum): string {
        return this.router.url.replace(`/${this.getRealmValue()}/`, `/${realm}/`);
    }
}
