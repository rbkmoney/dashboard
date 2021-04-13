import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@ngneat/transloco';

import { RowModule } from '@dsh/components/layout';

import * as ru from '../../../../../../assets/i18n/ru.json';
import { ClaimRowHeaderComponent } from './claim-row-header.component';

const translationConfig = {
    ru,
};

describe('ClaimRowHeaderComponent', () => {
    let fixture: ComponentFixture<ClaimRowHeaderComponent>;
    let component: ClaimRowHeaderComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RowModule,
                TranslocoTestingModule.withLangs(translationConfig, {
                    availableLangs: ['ru'],
                    defaultLang: 'ru',
                }),
            ],
            declarations: [ClaimRowHeaderComponent],
        })
            .overrideComponent(ClaimRowHeaderComponent, {
                set: {
                    changeDetection: ChangeDetectionStrategy.Default,
                },
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ClaimRowHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
