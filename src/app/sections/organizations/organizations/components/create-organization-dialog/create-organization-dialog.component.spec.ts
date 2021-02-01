import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslocoTestingModule } from '@ngneat/transloco';
import { instance, mock } from 'ts-mockito';

import { ErrorService } from '@dsh/app/shared/services/error';
import { NotificationService } from '@dsh/app/shared/services/notification';

import { OrganizationManagementService } from '../../../services/organization-management/organization-management.service';
import { CreateOrganizationDialogComponent } from './create-organization-dialog.component';

describe('CreateOrganizationDialogComponent', () => {
    let component: CreateOrganizationDialogComponent;
    let fixture: ComponentFixture<CreateOrganizationDialogComponent>;
    let mockDialogRef: MatDialogRef<CreateOrganizationDialogComponent>;
    let mockOrganizationManagementService: OrganizationManagementService;

    beforeEach(() => {
        mockDialogRef = mock(MatDialogRef);
        mockOrganizationManagementService = mock(OrganizationManagementService);

        TestBed.configureTestingModule({
            imports: [
                TranslocoTestingModule.withLangs({}, { missingHandler: { logMissingKey: false } }),
                FormsModule,
                ReactiveFormsModule,
            ],
            declarations: [CreateOrganizationDialogComponent],
            providers: [
                {
                    provide: MatDialogRef,
                    useFactory: () => instance(mockDialogRef),
                },
                {
                    provide: OrganizationManagementService,
                    useFactory: () => instance(mockOrganizationManagementService),
                },
                {
                    provide: NotificationService,
                    useValue: instance(mock(NotificationService)),
                },
                {
                    provide: ErrorService,
                    useValue: instance(mock(ErrorService)),
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(CreateOrganizationDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // TODO
    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });

    // describe('methods', () => {
    //     it('should cancel', () => {
    //         component.cancel();
    //         verify(mockDialogRef.close()).once();
    //         expect().nothing();
    //     });
    // });
    //
    // describe('template', () => {
    //     it('should create org', () => {
    //         const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    //         input.value = 'Test';
    //         input.dispatchEvent(new Event('input'));
    //         fixture.detectChanges();
    //         fixture.debugElement.queryAll(By.css('button'))[1].nativeElement.click();
    //         verify(mockOrganizationManagementService.createOrganization(objectContaining({ name: 'Test' }))).once();
    //         expect().nothing();
    //     });
    // });
});
