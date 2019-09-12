import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import moment from 'moment';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';

import { LocaleDictionaryService } from '../../../locale/locale-dictionary';
import { PaymentFlowHold } from '../../../api-codegen/capi/swagger-codegen';
import { HoldDetailsComponent } from './hold-details.component';
import { CardModule } from '../../../layout/card';
import { LocalePipe } from '../../../locale/locale.pipe';
import { HumanizedDurationPipe } from '../../../humanize-duration/humanized-duration.pipe';
import { LAYOUT_GAP } from '../../constants';
import { HumanizeDurationService } from '../../../humanize-duration';
import { Language, LanguageService } from '../../../locale/language';
import { SettingsService } from '../../../settings';

describe('HoldDetailsComponent', () => {
    let component: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, FlexLayoutModule, CardModule],
            declarations: [HoldDetailsComponent, TestHoldDetailsComponent, LocalePipe, HumanizedDurationPipe],
            providers: [
                { provide: LAYOUT_GAP, useValue: '20px' },
                { provide: LocaleDictionaryService, useValue: { mapDictionaryKey: value => value } },
                HumanizeDurationService,
                { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
                { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
                SettingsService,
                LanguageService,
                {
                    provide: MAT_DATE_LOCALE,
                    deps: [LanguageService],
                    useFactory: Language.ru
                }
            ]
        });

        const fixture = TestBed.createComponent(TestHoldDetailsComponent);
        fixture.detectChanges();
        component = fixture.nativeElement;
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });
});

@Component({
    template: '<dsh-hold-details [flowHold]="flowHold"></dsh-hold-details>'
})
class TestHoldDetailsComponent {
    flowHold: PaymentFlowHold = {
        type: 'PaymentFlowHold',
        onHoldExpiration: 'capture',
        heldUntil: moment()
            .utc()
            .format() as any
    };
}
