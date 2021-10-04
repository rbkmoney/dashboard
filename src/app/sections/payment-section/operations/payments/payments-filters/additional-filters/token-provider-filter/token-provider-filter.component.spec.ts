import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIcon } from '@angular/material/icon';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { FormControl } from '@ngneat/reactive-forms';

import { BankCardTokenProvider } from '@dsh/api-codegen/anapi';
import { ExpandableRadioGroupModule } from '@dsh/app/shared/components/radio-buttons/expandable-radio-group';
import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';

import { TokenProviderFilterComponent } from './token-provider-filter.component';

describe('TokenProviderFilterComponent', () => {
    let component: TokenProviderFilterComponent;
    let fixture: ComponentFixture<TokenProviderFilterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [getTranslocoModule(), ExpandableRadioGroupModule, MatIconTestingModule],
            declarations: [TokenProviderFilterComponent, MatIcon],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TokenProviderFilterComponent);

        component = fixture.componentInstance;
        component.formControl = new FormControl<BankCardTokenProvider>(null);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
