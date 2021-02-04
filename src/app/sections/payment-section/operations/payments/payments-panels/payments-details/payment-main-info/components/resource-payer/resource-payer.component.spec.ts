import { ChangeDetectionStrategy, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { getTextContent } from '@dsh/app/shared/tests/get-text-content';
import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';

import { MockDetailsItemModule } from '../../../../../tests/mock-details-item-component';
import { ResourcePayerComponent } from './resource-payer.component';

describe('ResourcePayerComponent', () => {
    let component: ResourcePayerComponent;
    let fixture: ComponentFixture<ResourcePayerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [getTranslocoModule(), MockDetailsItemModule],
            declarations: [ResourcePayerComponent],
        })
            .overrideComponent(ResourcePayerComponent, {
                set: {
                    changeDetection: ChangeDetectionStrategy.Default,
                },
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResourcePayerComponent);
        component = fixture.componentInstance;
        component.payer = {
            payerType: 'PaymentResourcePayer',
            paymentToolToken: '',
            paymentSession: '',
            contactInfo: {},
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('template', () => {
        let item: DebugElement | null;

        it('should render nothing if contact info is empty', () => {
            component.payer = {
                payerType: 'PaymentResourcePayer',
                paymentToolToken: '',
                paymentSession: '',
                contactInfo: {},
            };

            fixture.detectChanges();

            item = fixture.debugElement.query(By.css('dsh-details-item'));
            expect(item).toBeNull();
        });

        it('should render contact email if contact email if it was provided', () => {
            component.payer = {
                payerType: 'PaymentResourcePayer',
                paymentToolToken: '',
                paymentSession: '',
                contactInfo: {
                    email: 'my@email.com',
                },
            };

            fixture.detectChanges();

            item = fixture.debugElement.query(By.css('dsh-details-item'));
            expect(getTextContent(item.nativeElement)).toBe('my@email.com');
        });

        it('should render contact number if contact phone number', () => {
            component.payer = {
                payerType: 'PaymentResourcePayer',
                paymentToolToken: '',
                paymentSession: '',
                contactInfo: {
                    phoneNumber: '8000000000',
                },
            };

            fixture.detectChanges();

            item = fixture.debugElement.query(By.css('dsh-details-item'));
            expect(getTextContent(item.nativeElement)).toBe('8000000000');
        });

        it('should render contact email if full contact info was provided', () => {
            component.payer = {
                payerType: 'PaymentResourcePayer',
                paymentToolToken: '',
                paymentSession: '',
                contactInfo: {
                    email: 'my@email.com',
                    phoneNumber: '8000000000',
                },
            };

            fixture.detectChanges();

            item = fixture.debugElement.query(By.css('dsh-details-item'));
            expect(getTextContent(item.nativeElement)).toBe('my@email.com');
        });
    });
});
