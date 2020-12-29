import { ChangeDetectionStrategy, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';

import { getTextContent } from '@dsh/app/shared/tests/get-text-content';

import { BankCardComponent } from './bank-card.component';

@Pipe({
    name: 'bankCard',
})
class MockBankCardPipe implements PipeTransform {
    transform(value: string): string {
        return value;
    }
}

describe('BankCardComponent', () => {
    let fixture: ComponentFixture<BankCardComponent>;
    let component: BankCardComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatIconModule],
            declarations: [BankCardComponent, MockBankCardPipe],
        })
            .overrideComponent(BankCardComponent, {
                set: {
                    changeDetection: ChangeDetectionStrategy.Default,
                },
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BankCardComponent);
        component = fixture.componentInstance;
        component.bankCard = {
            cardNumberMask: '55** **** **** **22',
            paymentSystem: 'mastercard',
            tokenProvider: 'googlepay',
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('template', () => {
        it('should render card num mask', () => {
            component.bankCard = {
                cardNumberMask: '55** **** **** **22',
                paymentSystem: 'mastercard',
                tokenProvider: 'googlepay',
            };

            fixture.detectChanges();

            const element = fixture.debugElement.query(By.css('.mat-body-1'));

            expect(element).toBeTruthy();
            expect(getTextContent(element.nativeElement)).toBe('55** **** **** **22');
        });

        it('should render visa icon if it was a visa card', () => {
            component.bankCard = {
                cardNumberMask: '55** **** **** **22',
                paymentSystem: 'visa',
                tokenProvider: 'googlepay',
            };

            fixture.detectChanges();

            const element = fixture.debugElement.query(By.css('mat-icon'));

            expect(element).toBeTruthy();
            expect(element.nativeElement.attributes.svgicon.value).toBe('visa');
        });

        it('should render googlepay icon if payment was provided using googlepay', () => {
            component.bankCard = {
                cardNumberMask: '55** **** **** **22',
                paymentSystem: 'visa',
                tokenProvider: 'googlepay',
            };

            fixture.detectChanges();

            const element = fixture.debugElement.query(By.css('mat-icon + mat-icon'));

            expect(element).toBeTruthy();
            expect(element.nativeElement.attributes.svgicon.value).toBe('google_pay');
        });
    });
});
