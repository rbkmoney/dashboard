import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { anyString, mock, verify, when } from 'ts-mockito';

import { OrganizationsService } from '@dsh/api';
import { provideMockService } from '@dsh/app/shared/tests';

import { MOCK_ORG } from '../organizations/tests/mock-org';
import { OrganizationDetailsComponent } from './organization-details.component';

describe('OrganizationDetailsComponent', () => {
    let component: OrganizationDetailsComponent;
    let fixture: ComponentFixture<OrganizationDetailsComponent>;
    let mockOrganizationsService: OrganizationsService;
    let mockActivatedRoute: ActivatedRoute;

    beforeEach(async () => {
        mockOrganizationsService = mock(OrganizationsService);
        mockActivatedRoute = mock(ActivatedRoute);

        when(mockOrganizationsService.getOrg(anyString())).thenReturn(of(MOCK_ORG));
        when(mockOrganizationsService.getOrg(MOCK_ORG.id)).thenReturn(of(MOCK_ORG));
        when(mockActivatedRoute.params).thenReturn(of({ orgId: MOCK_ORG.id }));
        when(mockActivatedRoute.snapshot).thenReturn({} as any);

        await TestBed.configureTestingModule({
            imports: [
                TranslocoTestingModule.withLangs({}, { missingHandler: { logMissingKey: false } }),
                RouterModule.forRoot([]),
            ],
            declarations: [OrganizationDetailsComponent],
            providers: [
                provideMockService(OrganizationsService, mockOrganizationsService),
                provideMockService(ActivatedRoute, mockActivatedRoute),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(OrganizationDetailsComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    describe('should be init', () => {
        it('organization$', () => {
            expect(component.organization$).toBeObservable(cold('(a|)', { a: MOCK_ORG }));
            verify(mockOrganizationsService.getOrg(MOCK_ORG.id)).once();
        });
    });
});
