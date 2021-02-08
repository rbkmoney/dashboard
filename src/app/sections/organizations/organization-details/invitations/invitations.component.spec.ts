import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { anything, mock, verify, when } from 'ts-mockito';

import { OrganizationsService } from '@dsh/api';
import { DIALOG_CONFIG } from '@dsh/app/sections/tokens';
import { ErrorService } from '@dsh/app/shared';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import { provideMockService, provideMockToken } from '@dsh/app/shared/tests';

import { mockInvitationsResult } from '../../tests/mock-invitations-result';
import { mockOrg } from '../../tests/mock-org';
import { InvitationsComponent } from './invitations.component';

describe('InvitationsComponent', () => {
    let component: InvitationsComponent;
    let fixture: ComponentFixture<InvitationsComponent>;
    let mockRoute: ActivatedRoute;
    let mockOrganizationsService: OrganizationsService;
    let mockDialog: MatDialog;

    beforeEach(async () => {
        mockRoute = mock(ActivatedRoute);
        mockOrganizationsService = mock(OrganizationsService);
        mockDialog = mock(MatDialog);

        await TestBed.configureTestingModule({
            declarations: [InvitationsComponent],
            providers: [
                provideMockToken(DIALOG_CONFIG, { small: {}, medium: {}, large: {} }),
                provideMockService(OrganizationsService, mockOrganizationsService),
                provideMockService(ErrorService),
                provideMockService(ActivatedRoute, mockRoute),
                provideMockService(MatDialog, mockDialog),
            ],
        }).compileComponents();

        when(mockRoute.params).thenReturn(of({ orgId: mockOrg.id }));
        when(mockOrganizationsService.getOrg(mockOrg.id)).thenReturn(of(mockOrg));
        when(mockOrganizationsService.listInvitations(mockOrg.id)).thenReturn(of(mockInvitationsResult));

        fixture = TestBed.createComponent(InvitationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('init', () => {
        it('should load organization$', () => {
            const expected$ = cold('(a|)', { a: mockOrg });
            component.organization$.subscribe();
            verify(mockOrganizationsService.getOrg(mockOrg.id)).once();
            expect(component.organization$).toBeObservable(expected$);
        });
        it('should load invitations$', () => {
            const expected$ = cold('(a)', { a: mockInvitationsResult.result });
            expect(component.invitations$).toBeObservable(expected$);
        });
        it('should load invitations$', () => {
            const expected$ = cold('(a)', { a: false });
            expect(component.isLoading$).toBeObservable(expected$);
        });
    });

    describe('refresh', () => {
        it('should load invitations$', () => {
            component.invitations$.subscribe();
            component.refresh();
            verify(mockOrganizationsService.listInvitations(mockOrg.id)).twice();
            const expected$ = cold('(a)', { a: mockInvitationsResult.result });
            expect(component.invitations$).toBeObservable(expected$);
        });
    });

    describe('createInvitation', () => {
        it('should be created', () => {
            when(mockDialog.open(anything(), anything())).thenReturn({
                afterClosed: () => of(BaseDialogResponseStatus.SUCCESS),
            } as any);
            component.invitations$.subscribe();
            component.createInvitation();
            verify(mockOrganizationsService.listInvitations(mockOrg.id)).twice();
            expect().nothing();
        });
    });
});
