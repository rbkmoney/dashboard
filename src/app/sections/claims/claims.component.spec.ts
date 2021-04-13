import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { deepEqual, instance, mock, verify, when } from 'ts-mockito';

import { Claim } from '@dsh/api-codegen/claim-management';
import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';
import { LastUpdatedModule } from '@dsh/components/indicators/last-updated/last-updated.module';

import { ClaimsSearchFiltersStore } from './claims-search-filters-store.service';
import { ClaimsSearchFiltersSearchParams } from './claims-search-filters/claims-search-filters-search-params';
import { ClaimsComponent } from './claims.component';
import { FetchClaimsService } from './services/fetch-claims/fetch-claims.service';
import { generateMockClaim } from './tests/generate-mock-claim';

@Component({
    selector: 'dsh-claims-search-filters',
    template: '',
})
class MockClaimsSearchFiltersComponent {
    @Input() initParams: ClaimsSearchFiltersSearchParams;

    @Output()
    searchParamsChanges = new EventEmitter<ClaimsSearchFiltersSearchParams>();
}

@Component({
    selector: 'dsh-claims-list',
    template: '',
})
class MockClaimsListComponent {
    @Input() claimList: Claim[];
    @Input() lastUpdated: string;
    @Input() isLoading: boolean;
    @Input() hasMore: boolean;
    @Input() expandedId: number;

    @Output() refresh = new EventEmitter<void>();
    @Output() showMore = new EventEmitter<void>();
    @Output() goToClaimDetails: EventEmitter<number> = new EventEmitter();
}

describe('ClaimsComponent', () => {
    let component: ClaimsComponent;
    let fixture: ComponentFixture<ClaimsComponent>;
    let mockFetchClaimsService: FetchClaimsService;
    let mockRouter: Router;
    let mockMockClaimsSearchFiltersStore: ClaimsSearchFiltersStore;

    beforeEach(() => {
        mockRouter = mock(Router);
        mockFetchClaimsService = mock(FetchClaimsService);
        mockMockClaimsSearchFiltersStore = mock(ClaimsSearchFiltersStore);
    });

    beforeEach(() => {
        when(mockFetchClaimsService.searchResult$).thenReturn(of([generateMockClaim(1), generateMockClaim(2)]));
        when(mockFetchClaimsService.isLoading$).thenReturn(of(false));
        when(mockFetchClaimsService.hasMore$).thenReturn(of(false));
        when(mockFetchClaimsService.lastUpdated$).thenReturn(of());
    });

    async function configureTestingModule() {
        await TestBed.configureTestingModule({
            imports: [
                getTranslocoModule(),
                NoopAnimationsModule,
                LastUpdatedModule,
                FlexLayoutModule,
                HttpClientTestingModule,
            ],
            declarations: [ClaimsComponent, MockClaimsSearchFiltersComponent, MockClaimsListComponent],
            providers: [
                {
                    provide: FetchClaimsService,
                    useFactory: () => instance(mockFetchClaimsService),
                },
                {
                    provide: Router,
                    useFactory: () => instance(mockRouter),
                },
                {
                    provide: ClaimsSearchFiltersStore,
                    useValue: instance(mockMockClaimsSearchFiltersStore),
                },
            ],
        })
            .overrideComponent(ClaimsComponent, {
                set: {
                    providers: [],
                },
            })
            .compileComponents();
    }

    async function createComponent() {
        await configureTestingModule();

        fixture = TestBed.createComponent(ClaimsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }

    beforeEach(() => {
        when(mockMockClaimsSearchFiltersStore.data$).thenReturn(of());
    });

    describe('creation', () => {
        beforeEach(async () => {
            await createComponent();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });
    });

    describe('refreshList', () => {
        beforeEach(async () => {
            await createComponent();
        });

        it('should call refresh data', () => {
            when(mockFetchClaimsService.refresh()).thenReturn();

            component.refresh();

            verify(mockFetchClaimsService.refresh()).once();
            expect().nothing();
        });
    });

    describe('requestNextPage', () => {
        beforeEach(async () => {
            await createComponent();
        });

        it('should call fetch more data', () => {
            when(mockFetchClaimsService.fetchMore()).thenReturn();

            component.fetchMore();

            verify(mockFetchClaimsService.fetchMore()).once();
            expect().nothing();
        });
    });

    describe('filtersChanged', () => {
        beforeEach(async () => {
            await createComponent();
        });

        it('should request list using filters data', () => {
            const filtersData = {
                claimID: 1,
            };

            component.search(filtersData);

            verify(
                mockFetchClaimsService.search(
                    deepEqual({
                        claimID: filtersData.claimID,
                    })
                )
            );
            expect().nothing();
        });
    });
});
