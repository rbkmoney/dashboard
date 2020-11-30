import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingBankAccountComponent } from './existing-bank-account.component';

describe('ExistingBankAccountComponent', () => {
    let component: ExistingBankAccountComponent;
    let fixture: ComponentFixture<ExistingBankAccountComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ExistingBankAccountComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExistingBankAccountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
