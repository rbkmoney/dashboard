import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { of, throwError } from 'rxjs';
import { anyString, anything, mock, objectContaining, verify, when } from 'ts-mockito';

import { BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import { ErrorService } from '@dsh/app/shared/services/error';
import { NotificationService } from '@dsh/app/shared/services/notification';
import { provideMockService } from '@dsh/app/shared/tests';

import { OrganizationManagementService } from '../../../services/organization-management/organization-management.service';
import { mockOrg } from '../../../tests/mock-org';
import { CreateOrganizationDialogComponent } from './create-organization-dialog.component';

describe('CreateOrganizationDialogComponent', () => {
    let component: CreateOrganizationDialogComponent;
    let fixture: ComponentFixture<CreateOrganizationDialogComponent>;
    let mockDialogRef: MatDialogRef<CreateOrganizationDialogComponent>;
    let mockOrganizationManagementService: OrganizationManagementService;
    let mockNotificationsService: NotificationService;
    let mockErrorService: ErrorService;

    beforeEach(() => {
        mockDialogRef = mock(MatDialogRef);
        mockOrganizationManagementService = mock(OrganizationManagementService);
        mockNotificationsService = mock(NotificationService);
        mockErrorService = mock(ErrorService);

        TestBed.configureTestingModule({
            imports: [
                TranslocoTestingModule.withLangs({}, { missingHandler: { logMissingKey: false } }),
                FormsModule,
                ReactiveFormsModule,
            ],
            declarations: [CreateOrganizationDialogComponent],
            providers: [
                provideMockService(MatDialogRef, mockDialogRef),
                provideMockService(OrganizationManagementService, mockOrganizationManagementService),
                provideMockService(NotificationService, mockNotificationsService),
                provideMockService(ErrorService, mockErrorService),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(CreateOrganizationDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('cancel', () => {
        it('should cancelled', () => {
            component.cancel();
            verify(mockDialogRef.close(BaseDialogResponseStatus.CANCELED)).once();
            expect().nothing();
        });
    });

    describe('create', () => {
        it('should create organization', () => {
            when(mockOrganizationManagementService.createOrganization(anything())).thenReturn(of(mockOrg));
            const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
            input.value = 'Test 2';
            input.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            component.create();
            verify(mockOrganizationManagementService.createOrganization(objectContaining({ name: 'Test 2' }))).once();
            verify(mockNotificationsService.success()).once();
            verify(mockDialogRef.close(BaseDialogResponseStatus.SUCCESS)).once();
            expect().nothing();
        });
        it("shouldn't create organization", () => {
            const error = new Error('Error 1');
            when(mockOrganizationManagementService.createOrganization(anything())).thenReturn(throwError(error));
            const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
            input.value = 'Test 2';
            input.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            component.create();
            verify(mockOrganizationManagementService.createOrganization(objectContaining({ name: 'Test 2' }))).once();
            verify(mockErrorService.error(error)).once();
            verify(mockDialogRef.close(anyString())).never();
            expect().nothing();
        });
    });
});
