import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { anything, deepEqual, mock, verify, when } from 'ts-mockito';

import { OrganizationsService } from '@dsh/api';
import { ErrorService } from '@dsh/app/shared';
import { provideMockService } from '@dsh/app/shared/tests';

import { AcceptInvitationComponent } from './accept-invitation.component';

describe('AcceptInvitationComponent', () => {
    let fixture: ComponentFixture<AcceptInvitationComponent>;
    let component: AcceptInvitationComponent;
    let mockRoute: ActivatedRoute;
    let mockRouter: Router;
    let mockOrganizationsService: OrganizationsService;

    beforeEach(async () => {
        mockRouter = mock(Router);

        mockRoute = mock(ActivatedRoute);
        when(mockRoute.snapshot).thenReturn({ params: { token: '123' } } as any);

        mockOrganizationsService = mock(OrganizationsService);
        when(mockOrganizationsService.joinOrg(anything())).thenReturn(of({} as any));

        await TestBed.configureTestingModule({
            imports: [CommonModule, RouterTestingModule.withRoutes([])],
            declarations: [AcceptInvitationComponent],
            providers: [
                provideMockService(OrganizationsService, mockOrganizationsService),
                provideMockService(ErrorService),
                provideMockService(ActivatedRoute, mockRoute),
                provideMockService(Router, mockRouter),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(AcceptInvitationComponent);
        component = fixture.debugElement.componentInstance;

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should be init', () => {
        verify(mockOrganizationsService.joinOrg(deepEqual({ invitation: '123' }))).once();
        verify(mockRouter.navigate(deepEqual(['organizations']))).once();
        expect().nothing();
    });
});
