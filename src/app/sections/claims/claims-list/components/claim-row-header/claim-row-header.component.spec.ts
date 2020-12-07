import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslocoTestingModule } from '@ngneat/transloco';

import { RowModule } from '@dsh/components/layout';

import * as claims from '../../../../../../assets/i18n/claims/ru.json';
import { ClaimRowHeaderComponent } from './claim-row-header.component';

const translationConfig = {
    ru: claims,
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

    describe('template', () => {
        it('should render columns with names from translation config', () => {
            const columns = fixture.debugElement.queryAll(By.css('dsh-row dsh-row-header-label'));

            expect(columns[0].nativeElement.textContent.trim()).toBe(translationConfig.ru.panel.status);
            expect(columns[1].nativeElement.textContent.trim()).toBe(translationConfig.ru.panel.createdAt);
            expect(columns[2].nativeElement.textContent.trim()).toBe(translationConfig.ru.panel.updatedAt);
        });
    });
});
