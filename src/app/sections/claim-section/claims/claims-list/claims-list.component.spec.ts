import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslocoTestingModule } from '@ngneat/transloco';

import { Claim } from '@dsh/api-codegen/claim-management';
import { EmptySearchResultModule } from '@dsh/components/empty-search-result';
import { SpinnerModule } from '@dsh/components/indicators';
import { AccordionModule, CardModule } from '@dsh/components/layout';
import { ShowMorePanelModule } from '@dsh/components/show-more-panel';

import { generateMockClaim } from '../tests/generate-mock-claim';
import { ClaimsListComponent } from './claims-list.component';

@Component({
    selector: 'dsh-claim-row-header',
    template: '',
})
class MockRowHeaderComponent {}

@Component({
    selector: 'dsh-claim-row',
    template: '',
})
class MockRowComponent {
    @Input() claim: Claim;

    @Output() goToClaimDetails: EventEmitter<number> = new EventEmitter();
}

describe('ClaimsListComponent', () => {
    let component: ClaimsListComponent;
    let fixture: ComponentFixture<ClaimsListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                FlexLayoutModule,
                SpinnerModule,
                EmptySearchResultModule,
                AccordionModule,
                CardModule,
                ShowMorePanelModule,
                NoopAnimationsModule,
                HttpClientTestingModule,
                TranslocoTestingModule.withLangs(
                    {
                        ru: {
                            emptySearchResult: 'Данные за указанный период отсутствуют',
                        },
                    },
                    {
                        availableLangs: ['ru'],
                        defaultLang: 'ru',
                    }
                ),
            ],
            declarations: [ClaimsListComponent, MockRowHeaderComponent, MockRowComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ClaimsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('isEmptyList', () => {
        it('should be false if list was not provided', () => {
            expect(component.isEmptyList).toBe(false);
        });

        it('should be true if list is empty', () => {
            component.claimList = [];

            fixture.detectChanges();

            expect(component.isEmptyList).toBe(true);
        });

        it('should be false if list contains at least one element', () => {
            component.claimList = new Array(1).fill(generateMockClaim(1));

            fixture.detectChanges();

            expect(component.isEmptyList).toBe(false);

            component.claimList = new Array(15).fill(generateMockClaim(1));

            fixture.detectChanges();

            expect(component.isEmptyList).toBe(false);
        });
    });

    describe('showMoreElements', () => {
        it('should emit output event showMore', () => {
            const spyOnShowMore = spyOn(component.showMore, 'emit');

            component.showMoreElements();

            expect(spyOnShowMore).toHaveBeenCalledTimes(1);
        });
    });
});
