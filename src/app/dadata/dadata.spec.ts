import { Component, Type, Provider } from '@angular/core';
import { ComponentFixture, TestBed, ComponentFixtureAutoDetect, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DaDataModule } from './dadata.module';
import { DaDataService } from './dadata.service';
import { SuggestionType } from './model/type';
import { ConfigService } from '../config/config.service';
import { ConfigStubService } from '../config/config-stub.service';

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
    const suggestions = {
        suggestions: [
            {
                value: 'АО "ТЕСТПРИБОР"',
                unrestricted_value: 'АО "ТЕСТПРИБОР"',
                data: {}
            },
            {
                value: 'АО "ТЕСТРОН"',
                unrestricted_value: 'АО "ТЕСТРОН"',
                data: {}
            },
            {
                value: 'АО "ТЭСТ"',
                unrestricted_value: 'АО "ТЭСТ"',
                data: {}
            },
            {
                value: 'ЗАО "КДО-ТЕСТ"',
                unrestricted_value: 'ЗАО "КДО-ТЕСТ"',
                data: {}
            },
            {
                value: 'АО "НИИ "ТЕСТ"',
                unrestricted_value: 'АО "НИИ "ТЕСТ"',
                data: {}
            },
            {
                value: 'АО "ОЗ ТЕСТ"',
                unrestricted_value: 'АО "ОЗ ТЕСТ"',
                data: {}
            },
            {
                value: 'АО "ТЕСТ-3"',
                unrestricted_value: 'АО "ТЕСТ-3"',
                data: {}
            },
            {
                value: 'ЗАО "ТЕСТ-ОЙЛ"',
                unrestricted_value: 'ЗАО "ТЕСТ-ОЙЛ"',
                data: {}
            },
            {
                value: 'ЗАО "ТИЛИ-ТЕСТО"',
                unrestricted_value: 'ЗАО "ТИЛИ-ТЕСТО"',
                data: {}
            },
            {
                value: 'ЗАО "ТРАНССТРОЙ-ТЕСТ"',
                unrestricted_value: 'ЗАО "ТРАНССТРОЙ-ТЕСТ"',
                data: {}
            }
        ]
    };

    function createDaDataService() {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [DaDataService, { provide: ConfigService, useClass: ConfigStubService }]
        });
        const injector = getTestBed();
        const service: DaDataService = injector.get(DaDataService);
        const httpMock: HttpTestingController = injector.get(HttpTestingController);
        return { injector, service, httpMock };
    }

    function createComponent<T>(
        component: Type<T>,
        providers: Provider[] = [],
        declarations: any[] = []
    ): ComponentFixture<T> {
        TestBed.configureTestingModule({
            imports: [DaDataModule, MatFormFieldModule, ReactiveFormsModule, NoopAnimationsModule],
            declarations: [component, ...declarations],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true },
                { provide: ConfigService, useClass: ConfigStubService },
                ...providers
            ]
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
        it('should load suggestions', () => {
            const { service, httpMock } = createDaDataService();
            service.getSuggestions(SuggestionType.party, 'тест').subscribe(s => {
                expect(s).toEqual(suggestions.suggestions as any);
            });
            const req = httpMock.expectOne('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party');
            req.flush(suggestions);
            expect(req.request.method).toBe('POST');
        });
    });
});
