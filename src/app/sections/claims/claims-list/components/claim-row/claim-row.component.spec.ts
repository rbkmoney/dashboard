import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslocoTestingModule } from '@ngneat/transloco';
import * as moment from 'moment';

import { ClaimStatusColorPipe } from '@dsh/app/shared/pipes/api-model-types/claim-status-color.pipe';
import { StatusModule } from '@dsh/components/indicators';
import { RowModule } from '@dsh/components/layout';

import * as ru from '../../../../../../assets/i18n/ru.json';
import { generateMockClaim } from '../../../tests/generate-mock-claim';
import { ClaimRowComponent } from './claim-row.component';

const TRANSLATION_CONFIG = {
    ru,
};

describe('ClaimRowComponent', () => {
    let fixture: ComponentFixture<ClaimRowComponent>;
    let component: ClaimRowComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RowModule,
                TranslocoTestingModule.withLangs(TRANSLATION_CONFIG, {
                    availableLangs: ['ru'],
                    defaultLang: 'ru',
                }),
                StatusModule,
            ],
            declarations: [ClaimRowComponent, ClaimStatusColorPipe],
        })
            .overrideComponent(ClaimRowComponent, {
                set: {
                    changeDetection: ChangeDetectionStrategy.Default,
                },
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ClaimRowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('template', () => {
        it('should show loading value if claim was not provided', () => {
            const labels = fixture.debugElement.queryAll(By.css('dsh-row dsh-row-label'));

            expect(labels.length).toBe(1);
            expect(labels[0].nativeElement.textContent.trim()).toBe('Loading ...');
        });

        it('should show row component if claim was provided', () => {
            const claim = generateMockClaim();
            const { createdAt } = claim;
            component.claim = claim;

            fixture.detectChanges();

            const labels = fixture.debugElement.queryAll(By.css('dsh-row dsh-row-label'));

            expect(labels[0].nativeElement.textContent.trim()).toBe('1');
            expect(labels[1].nativeElement.textContent.trim()).toBe('claimStatus.pending');
            expect(labels[2].nativeElement.children[0].textContent.trim()).toBe(
                moment(createdAt).format('DD MMMM YYYY, HH:mm')
            );
        });
    });
});
