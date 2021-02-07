import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { of, throwError } from 'rxjs';
import { anyString, anything, deepEqual, mock, verify, when } from 'ts-mockito';

import { ApiShopsService, OrganizationsService } from '@dsh/api';
import { Shop } from '@dsh/api-codegen/capi';
import { InviteeContact, ResourceScopeId, RoleId } from '@dsh/api-codegen/organizations';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import { ErrorService } from '@dsh/app/shared/services/error';
import { NotificationService } from '@dsh/app/shared/services/notification';
import { provideMockService, provideMockToken } from '@dsh/app/shared/tests';

import { mockInvitation } from '../../../../tests/mock-invitation';
import { mockOrg } from '../../../../tests/mock-org';
import { CreateInvitationDialogComponent } from './create-invitation-dialog.component';

describe('CreateInvitationDialogComponent', () => {
    let component: CreateInvitationDialogComponent;
    let fixture: ComponentFixture<CreateInvitationDialogComponent>;
    let mockDialogRef: MatDialogRef<CreateInvitationDialogComponent>;
    let mockOrganizationsService: OrganizationsService;
    let mockNotificationsService: NotificationService;
    let mockErrorService: ErrorService;
    let mockShopsService: ApiShopsService;

    const SHOP_ID = 'shop_id';
    const SOME_EMAIL = 'some@ema.il';

    beforeEach(() => {
        mockDialogRef = mock(MatDialogRef);
        mockOrganizationsService = mock(OrganizationsService);
        mockNotificationsService = mock(NotificationService);
        mockErrorService = mock(ErrorService);
        mockShopsService = mock(ApiShopsService);

        when(mockShopsService.shops$).thenReturn(of([{ id: SHOP_ID } as Shop]));
        when(mockOrganizationsService.createInvitation(mockOrg.id, anything())).thenReturn(of(mockInvitation));

        TestBed.configureTestingModule({
            imports: [
                TranslocoTestingModule.withLangs({}, { missingHandler: { logMissingKey: false } }),
                FormsModule,
                ReactiveFormsModule,
            ],
            declarations: [CreateInvitationDialogComponent],
            providers: [
                provideMockService(MatDialogRef, mockDialogRef),
                provideMockService(ApiShopsService, mockShopsService),
                provideMockService(OrganizationsService, mockOrganizationsService),
                provideMockService(NotificationService, mockNotificationsService),
                provideMockService(ErrorService, mockErrorService),
                provideMockToken(MAT_DIALOG_DATA, { orgId: mockOrg.id }),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(CreateInvitationDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    describe('cancel', () => {
        it('should be cancelled', () => {
            component.cancel();
            verify(mockDialogRef.close(BaseDialogResponseStatus.CANCELED)).once();
            expect().nothing();
        });
    });

    describe('create', () => {
        it('should be created', () => {
            component.form.patchValue({ email: SOME_EMAIL });
            component.create();
            verify(
                mockOrganizationsService.createInvitation(
                    mockOrg.id,
                    deepEqual({
                        invitee: {
                            contact: {
                                type: InviteeContact.TypeEnum.EMail,
                                email: SOME_EMAIL,
                            },
                            roles: [
                                {
                                    roleId: RoleId.Administrator,
                                    scope: {
                                        id: ResourceScopeId.Shop,
                                        resourceId: SHOP_ID,
                                    },
                                },
                            ],
                        },
                    })
                )
            ).once();
            verify(mockNotificationsService.success()).once();
            verify(mockDialogRef.close(BaseDialogResponseStatus.SUCCESS)).once();
            expect().nothing();
        });
        it("shouldn't create", () => {
            const error = new Error('Error 1');
            component.form.patchValue({ email: SOME_EMAIL });
            when(mockOrganizationsService.createInvitation(mockOrg.id, anything())).thenReturn(throwError(error));
            component.create();
            verify(mockErrorService.error(error)).once();
            verify(mockDialogRef.close(anyString())).never();
            expect().nothing();
        });
    });
});
