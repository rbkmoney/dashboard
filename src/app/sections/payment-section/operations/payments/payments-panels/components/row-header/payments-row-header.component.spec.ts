import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslocoTestingModule } from '@ngneat/transloco';

import { RowModule } from '@dsh/components/layout';

import { PaymentsRowHeaderComponent } from './payments-row-header.component';

const TRANSLATION_CONFIG = {
    ru: {
        operations: {
            payments: {
                table: {
                    amount: 'Сумма списания',
                    status: 'Статус',
                    statusChanged: 'Статус изменен',
                    invoice: 'Инвойс',
                    shop: 'Магазин',
                },
            },
        },
    },
};

describe('PaymentsRowHeaderComponent', () => {
    let fixture: ComponentFixture<PaymentsRowHeaderComponent>;
    let component: PaymentsRowHeaderComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RowModule,
                TranslocoTestingModule.withLangs(TRANSLATION_CONFIG, {
                    availableLangs: ['ru'],
                    defaultLang: 'ru',
                }),
            ],
            declarations: [PaymentsRowHeaderComponent],
        })
            .overrideComponent(PaymentsRowHeaderComponent, {
                set: {
                    changeDetection: ChangeDetectionStrategy.Default,
                },
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PaymentsRowHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('template', () => {
        it('should render columns with names from translation config', () => {
            const columns = fixture.debugElement.queryAll(By.css('dsh-row dsh-row-header-label'));

            expect(columns.length).toBe(4);
            expect(columns[0].nativeElement.textContent.trim()).toBe('Сумма списания');
            expect(columns[1].nativeElement.textContent.trim()).toBe('Статус');
            expect(columns[2].nativeElement.textContent.trim()).toBe('Статус изменен');
            expect(columns[3].nativeElement.textContent.trim()).toBe('Магазин');
        });
    });
});
