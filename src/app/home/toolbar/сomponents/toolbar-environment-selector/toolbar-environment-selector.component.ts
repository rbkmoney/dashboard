import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

import { PaymentInstitution } from '@dsh/api-codegen/capi';
import { DropdownTriggerDirective } from '@dsh/components/layout';

import RealmEnum = PaymentInstitution.RealmEnum;

@UntilDestroy()
@Component({
    selector: 'dsh-toolbar-environment-selector',
    templateUrl: 'toolbar-environment-selector.component.html',
    styleUrls: ['toolbar-environment-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarEnvironmentSelectorComponent implements OnInit {
    @ViewChild(DropdownTriggerDirective, { static: true }) trigger: DropdownTriggerDirective;

    formControl = this.fb.control(this.getRealmFromUrl());

    constructor(private fb: FormBuilder, private router: Router) {}

    ngOnInit(): void {
        this.formControl.valueChanges
            .pipe(distinctUntilChanged(), untilDestroyed(this))
            .subscribe((realm: RealmEnum) => {
                if (this.getRealmFromUrl()) {
                    void this.router.navigateByUrl(this.getNewRealmUrl(realm)).then(() => window.location.reload());
                } else {
                    void this.router.navigateByUrl(`/payment-section/realm/${realm}/operations/payments`);
                }
                this.closeDropdown();
            });
        this.router.events
            .pipe(
                map(() => this.getRealmFromUrl()),
                filter((r) => !!r),
                distinctUntilChanged(),
                untilDestroyed(this)
            )
            .subscribe((realm) => {
                this.formControl.patchValue(realm, { emitEvent: false });
            });
    }

    closeDropdown(): void {
        this.trigger.close();
    }

    private getRealmFromUrl(): RealmEnum {
        const urlPart = this.router.url.split('/')[3];
        return Object.values(RealmEnum).includes(urlPart as never) ? (urlPart as RealmEnum) : null;
    }

    private getNewRealmUrl(realm: RealmEnum): string {
        return this.router.url.replace(`/${this.getRealmFromUrl()}/`, `/${realm}/`);
    }
}
