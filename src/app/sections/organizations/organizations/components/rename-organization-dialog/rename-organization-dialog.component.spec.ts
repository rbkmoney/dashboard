import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { instance, mock, objectContaining, verify } from 'ts-mockito';

import { OrganizationsService } from '@dsh/api';
import { ErrorService } from '@dsh/app/shared/services/error';
import { NotificationService } from '@dsh/app/shared/services/notification';

import { mockOrg } from '../../../tests/mock-org';
import { RenameOrganizationDialogComponent } from './rename-organization-dialog.component';

describe('RenameOrganizationDialogComponent', () => {
    let component: RenameOrganizationDialogComponent;
    let fixture: ComponentFixture<RenameOrganizationDialogComponent>;
    let mockDialogRef: MatDialogRef<RenameOrganizationDialogComponent>;
    let mockOrganizationsService: OrganizationsService;

    beforeEach(() => {
        mockDialogRef = mock(MatDialogRef);
        mockOrganizationsService = mock(OrganizationsService);

        TestBed.configureTestingModule({
            imports: [
                TranslocoTestingModule.withLangs({}, { missingHandler: { logMissingKey: false } }),
                FormsModule,
                ReactiveFormsModule,
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
                    useValue: instance(mock(NotificationService)),
                },
                {
                    provide: ErrorService,
                    useValue: instance(mock(ErrorService)),
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

    it('should cancel', () => {
        component.cancel();
        verify(mockDialogRef.close()).once();
        expect().nothing();
    });

    it('should rename org', () => {
        const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
        input.value = 'Test 2';
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        fixture.debugElement.queryAll(By.css('button'))[1].nativeElement.click();
        verify(mockOrganizationsService.patchOrganization(mockOrg.id, objectContaining({ name: 'Test 2' }))).once();
        expect().nothing();
    });
});
