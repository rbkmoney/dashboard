import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { of, throwError } from 'rxjs';
import { anyString, anything, deepEqual, mock, verify, when } from 'ts-mockito';

import { ApiShopsService, OrganizationsService } from '@dsh/api';
import { Shop } from '@dsh/api-codegen/capi';
import { InviteeContact } from '@dsh/api-codegen/organizations';
import { MOCK_INVITATION } from '@dsh/api/organizations/tests/mock-invitation';
import { MOCK_ORG } from '@dsh/api/organizations/tests/mock-org';
import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import { ErrorService } from '@dsh/app/shared/services/error';
import { NotificationService } from '@dsh/app/shared/services/notification';
import { provideMockService, provideMockToken } from '@dsh/app/shared/tests';

import { CreateInvitationDialogComponent } from './create-invitation-dialog.component';

describe('CreateInvitationDialogComponent', () => {
    let component: CreateInvitationDialogComponent;
    let fixture: ComponentFixture<CreateInvitationDialogComponent>;
    let mockDialogRef: MatDialogRef<CreateInvitationDialogComponent>;
    let mockOrganizationsService: OrganizationsService;
    let mockNotificationsService: NotificationService;
    let mockErrorService: ErrorService;
    let mockShopsService: ApiShopsService;

    const shopId = 'shop_id';
    const someEmail = 'some@ema.il';

    beforeEach(() => {
        mockDialogRef = mock<MatDialogRef<CreateInvitationDialogComponent>>(MatDialogRef);
        mockOrganizationsService = mock(OrganizationsService);
        mockNotificationsService = mock(NotificationService);
        mockErrorService = mock(ErrorService);
        mockShopsService = mock(ApiShopsService);

        when(mockShopsService.shops$).thenReturn(of([{ id: shopId } as Shop]));
        when(mockOrganizationsService.createInvitation(MOCK_ORG.id, anything())).thenReturn(of(MOCK_INVITATION));

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
                provideMockToken(MAT_DIALOG_DATA, { orgId: MOCK_ORG.id }),
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
            verify(mockDialogRef.close(BaseDialogResponseStatus.Cancelled)).once();
            expect().nothing();
        });
    });

    describe('create', () => {
        it('should be created', () => {
            component.emailControl.patchValue(someEmail);
            component.create();
            verify(
                mockOrganizationsService.createInvitation(
                    MOCK_ORG.id,
                    deepEqual({
                        invitee: {
                            contact: {
                                type: InviteeContact.TypeEnum.EMail,
                                email: someEmail,
                            },
                            roles: [],
                        },
                    })
                )
            ).once();
            verify(mockNotificationsService.success()).once();
            verify(mockDialogRef.close(BaseDialogResponseStatus.Success)).once();
            expect().nothing();
        });

        it("shouldn't create", () => {
            const error = new Error('Error 1');
            component.emailControl.patchValue(someEmail);
            when(mockOrganizationsService.createInvitation(MOCK_ORG.id, anything())).thenReturn(throwError(error));
            component.create();
            verify(mockErrorService.error(error)).once();
            verify(mockDialogRef.close(anyString())).never();
            expect().nothing();
        });
    });
});
