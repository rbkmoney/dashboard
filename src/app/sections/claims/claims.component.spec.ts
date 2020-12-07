import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexModule } from '@angular/flex-layout';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { of } from 'rxjs';
import { instance, mock, verify, when } from 'ts-mockito';

import { LayoutModule } from '@dsh/components/layout';

import * as claims from '../../../assets/i18n/claims/ru.json';
import { ClaimsService } from '../../api/claims';
import { ClaimsListModule } from './claims-list';
import { ClaimsSearchFiltersModule } from './claims-search-filters';
import { ClaimsSearchFiltersStore } from './claims-search-filters-store.service';
import { ClaimsComponent } from './claims.component';
import { ClaimsExpandedIdManagerService } from './services/claims-expanded-id-manager/claims-expanded-id-manager.service';
import { FetchClaimsService } from './services/fetch-claims/fetch-claims.service';

describe('ClaimsComponent', () => {
    let component: ClaimsComponent;
    let fixture: ComponentFixture<ClaimsComponent>;
    let mockFetchClaimsService: FetchClaimsService;
    let mockClaimsExpandedIdManagerService: ClaimsExpandedIdManagerService;
    let mockActivatedRoute: ActivatedRoute;
    let mockClaimsSearchFiltersStore: ClaimsSearchFiltersStore;
    let mockSnackBar: MatSnackBar;
    let mockMatDialog: MatDialog;
    let mockRouter: Router;
    let mockClaimsService: ClaimsService;

    beforeEach(() => {
        mockFetchClaimsService = mock(FetchClaimsService);
        mockClaimsExpandedIdManagerService = mock(ClaimsExpandedIdManagerService);
        mockMatDialog = mock(MatDialog);
        mockActivatedRoute = mock(ActivatedRoute);
        mockClaimsSearchFiltersStore = mock(ClaimsSearchFiltersStore);
        mockSnackBar = mock(MatSnackBar);
        mockRouter = mock(Router);
        mockClaimsService = mock(ClaimsService);
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                LayoutModule,
                FlexModule,
                CommonModule,
                ClaimsListModule,
                ClaimsSearchFiltersModule,
                BrowserAnimationsModule,
                RouterTestingModule.withRoutes([]),
                TranslocoTestingModule.withLangs({
                    ru: claims,
                }),
            ],
            declarations: [ClaimsComponent],
            providers: [
                {
                    provide: MatSnackBar,
                    useFactory: () => instance(mockSnackBar),
                },
                {
                    provide: ClaimsService,
                    useFactory: () => instance(mockClaimsService),
                },
                {
                    provide: MatSnackBarModule,
                    useValue: null,
                },
                {
                    provide: ClaimsService,
                    useValue: null,
                },
                {
                    provide: ClaimsSearchFiltersStore,
                    useFactory: () => instance(mockClaimsSearchFiltersStore),
                },
                {
                    provide: FetchClaimsService,
                    useFactory: () => instance(mockFetchClaimsService),
                },
                {
                    provide: ClaimsExpandedIdManagerService,
                    useFactory: () => instance(mockClaimsExpandedIdManagerService),
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ClaimsComponent);
        component = fixture.componentInstance;
    });

    beforeEach(() => {
        when(mockClaimsExpandedIdManagerService.expandedId$).thenReturn(of(-1));
        when(mockActivatedRoute.queryParams).thenReturn(of({}));
        when(mockFetchClaimsService.errors$).thenReturn(of({}));
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('refreshData', () => {
        it('should call FetchClaimsService refresh', () => {
            fixture.detectChanges();
            component.refresh();

            verify(mockFetchClaimsService.refresh()).once();
            expect().nothing();
        });
    });

    describe('fetchMore', () => {
        it('should call FetchClaimsService fetchMore', () => {
            when(mockFetchClaimsService.fetchMore()).thenReturn();
            component.fetchMore();
            fixture.detectChanges();

            verify(mockFetchClaimsService.fetchMore()).once();
            expect().nothing();
        });
    });

    describe('search', () => {
        it('should call FetchClaimsService search', () => {
            fixture.detectChanges();
            component.search({});

            verify(mockFetchClaimsService.search({})).once();
            expect().nothing();
        });
    });

    describe('expandedIdChange', () => {
        it('should call ClaimsExpandedIdManagerService expandedIdChange', () => {
            fixture.detectChanges();
            component.expandedIdChange(1);

            verify(mockClaimsExpandedIdManagerService.expandedIdChange(1)).once();
            expect().nothing();
        });
    });

    describe('goToClaimDetails', () => {
        it('should call Router goToClaimDetails', () => {
            fixture.detectChanges();
            component.goToClaimDetails(1);

            verify(mockRouter.navigate(['claim', 1])).once();
            expect().nothing();
        });
    });
});
