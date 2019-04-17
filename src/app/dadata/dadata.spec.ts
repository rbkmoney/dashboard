import { Component, Type, Provider } from '@angular/core';
import { ComponentFixture, TestBed, ComponentFixtureAutoDetect, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DaDataModule } from './dadata.module';
import { DaDataService } from './dadata.service';

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

describe('DshDadata', () => {
    function createDaDataService() {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [DaDataService]
        });
        const injector = getTestBed();
        return {
            injector,
            service: injector.get(DaDataService),
            httpMock: injector.get(HttpTestingController)
        };
    }

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

    describe('Component', () => {
        it('should init value', () => {
            const fixture = createComponent(SimpleDaDataAutocompleteComponent);
            expect(fixture.componentInstance.suggestions.value).toBe('test');
        });
    });

    describe('Service', () => {
        it('should load config', () => {
            const { service, httpMock } = createDaDataService();
            const config = {
                token: 'Token AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                suggestionsAPIUrl: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest'
            };
            service.config$.subscribe(c => {
                expect(c).toEqual(config);
            });
            const req = httpMock.expectOne('/assets/dadata-config.json');
            expect(req.request.method).toBe('GET');
            req.flush(config);
        });
    });
});
