import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';

import { PaymentTerminalComponent } from './payment-terminal.component';

describe('PaymentTerminalComponent', () => {
    let fixture: ComponentFixture<PaymentTerminalComponent>;
    let component: PaymentTerminalComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [getTranslocoModule()],
            declarations: [PaymentTerminalComponent],
        })
            .overrideComponent(PaymentTerminalComponent, {
                set: {
                    changeDetection: ChangeDetectionStrategy.Default,
                },
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PaymentTerminalComponent);
        component = fixture.componentInstance;
        component.paymentTerminal = {
            provider: 'euroset',
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
