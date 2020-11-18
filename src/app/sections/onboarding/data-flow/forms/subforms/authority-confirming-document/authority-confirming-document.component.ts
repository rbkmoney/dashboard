import { Component, Inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, startWith, switchMap } from 'rxjs/operators';

import { AuthorityConfirmingDocumentType } from '../../../../../../api';
import { SHARE_REPLAY_CONF } from '../../../../../../custom-operators';
import { LAYOUT_GAP } from '../../../../../constants';
import { AuthorityConfirmingDocumentService } from './authority-confirming-document.service';

@Component({
    selector: 'dsh-authority-confirming-document',
    templateUrl: 'authority-confirming-document.component.html',
})
export class AuthorityConfirmingDocumentComponent {
    form$ = new BehaviorSubject<FormGroup>(null);
    @Input() set form(form: FormGroup) {
        this.form$.next(form);
    }

    readonly selectOptionTypes = Object.values(AuthorityConfirmingDocumentType);

    customType = AuthorityConfirmingDocumentService.CustomType;

    isCustom$ = this.form$.pipe(
        switchMap((form) =>
            form
                ? form.valueChanges.pipe(
                      // TODO: add form types
                      startWith<any, any>(form.value),
                      map((v) => v.type === this.customType)
                  )
                : of(false)
        ),
        distinctUntilChanged(),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string) {
        combineLatest([this.form$, this.isCustom$])
            .pipe(filter(([f]) => !!f))
            .subscribe(([form, isCustom]) => {
                if (isCustom) {
                    form.controls.customType.enable();
                    form.controls.number.enable();
                    form.controls.date.enable();
                } else {
                    form.controls.customType.disable();
                    form.controls.number.disable();
                    form.controls.date.disable();
                }
            });
    }
}
