import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { of, throwError } from 'rxjs';
import { anyString, anything, instance, mock, objectContaining, verify, when } from 'ts-mockito';

import { OrganizationsService } from '@dsh/api';
import { BaseDialogModule, BaseDialogResponseStatus } from '@dsh/app/shared/components/dialog/base-dialog';
import { ErrorService } from '@dsh/app/shared/services/error';
import { NotificationService } from '@dsh/app/shared/services/notification';

import { mockOrg } from '../../../tests/mock-org';
import { RenameOrganizationDialogComponent } from './rename-organization-dialog.component';

describe('RenameOrganizationDialogComponent', () => {
    let component: RenameOrganizationDialogComponent;
    let fixture: ComponentFixture<RenameOrganizationDialogComponent>;
    let mockDialogRef: MatDialogRef<RenameOrganizationDialogComponent>;
    let mockOrganizationsService: OrganizationsService;
    let mockErrorService: ErrorService;
    let mockNotificationsService: NotificationService;

    beforeEach(() => {
        mockDialogRef = mock(MatDialogRef);
        mockOrganizationsService = mock(OrganizationsService);
        mockErrorService = mock(ErrorService);
        mockNotificationsService = mock(NotificationService);

        TestBed.configureTestingModule({
            imports: [
                TranslocoTestingModule.withLangs({}, { missingHandler: { logMissingKey: false } }),
                FormsModule,
                ReactiveFormsModule,
                BaseDialogModule,
                MatFormFieldModule,
                MatInputModule,
                NoopAnimationsModule,
            ],
            declarations: [RenameOrganizationDialogComponent],
            providers: [
                {
                    provide: MatDialogRef,
                    useFactory: () => instance(mockDialogRef),
                },
                {
                    provide: OrganizationsService,
                    useFactory: () => instance(mockOrganizationsService),
                },
                {
                    provide: NotificationService,
                    useValue: instance(mockNotificationsService),
                },
                {
                    provide: ErrorService,
                    useValue: instance(mockErrorService),
                },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: { organization: mockOrg },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(RenameOrganizationDialogComponent);
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

    describe('update', () => {
        it('should update organization', () => {
            when(mockOrganizationsService.patchOrg(anyString(), anything())).thenReturn(of(mockOrg));
            const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
            input.value = 'Test 2';
            input.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            component.update();
            verify(mockOrganizationsService.patchOrg(mockOrg.id, objectContaining({ name: 'Test 2' }))).once();
            verify(mockNotificationsService.success()).once();
            verify(mockDialogRef.close(BaseDialogResponseStatus.SUCCESS)).once();
            expect().nothing();
        });
        it("shouldn't update organization", () => {
            when(mockOrganizationsService.patchOrg(anyString(), anything())).thenReturn(throwError('Error'));
            const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
            input.value = 'Test 2';
            input.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            component.update();
            verify(mockOrganizationsService.patchOrg(mockOrg.id, objectContaining({ name: 'Test 2' }))).once();
            verify(mockErrorService.error(anything())).once();
            verify(mockDialogRef.close(anyString())).never();
            expect().nothing();
        });
    });
});
