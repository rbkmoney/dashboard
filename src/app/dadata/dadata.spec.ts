import { Component, Type, Provider } from '@angular/core';
import { ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DaDataModule } from './dadata.module';

@Component({
    template: `
        <mat-form-field>
            <mat-label>Название</mat-label>
            <dsh-dadata-autocomplete
                [formControl]="suggestions"
                type="party"
                (optionSelected)="suggestionSelected($event)"
            ></dsh-dadata-autocomplete>
        </mat-form-field>
    `
})
class SimpleDaDataAutocompleteComponent {
    suggestions = new FormControl('test');

    suggestionSelected(e) {
        console.log(e);
    }
}

describe('DshDadataAutocomplete', () => {
    function createComponent<T>(
        component: Type<T>,
        providers: Provider[] = [],
        declarations: any[] = []
    ): ComponentFixture<T> {
        TestBed.configureTestingModule({
            imports: [DaDataModule, MatFormFieldModule, ReactiveFormsModule, NoopAnimationsModule],
            declarations: [component, ...declarations],
            providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }, ...providers]
        }).compileComponents();

        return TestBed.createComponent<T>(component);
    }

    it('init value', () => {
        const fixture = createComponent(SimpleDaDataAutocompleteComponent);
        expect(fixture.componentInstance.suggestions.value).toBe('test');
    });
});
