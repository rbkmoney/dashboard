import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { anyString, instance, mock, verify, when } from 'ts-mockito';

import { MessagesService } from '@dsh/api/sender';
import { ErrorModule, ErrorService, NotificationService } from '@dsh/app/shared/services';

import { FeedbackDialogComponent } from './feedback-dialog.component';

describe('FeedbackDialogComponent', () => {
    let fixture: ComponentFixture<FeedbackDialogComponent>;
    let debugElement: DebugElement;
    let component: FeedbackDialogComponent;

    let mockMessagesService: MessagesService;
    let mockMatDialogRef: MatDialogRef<FeedbackDialogComponent>;
    let mockErrorService: ErrorService;
    let mockNotificationService: NotificationService;

    beforeEach(async () => {
        mockMessagesService = mock(MessagesService);
        mockMatDialogRef = mock(MatDialogRef);
        mockErrorService = mock(ErrorService);
        mockNotificationService = mock(NotificationService);

        await TestBed.configureTestingModule({
            imports: [MatDialogModule, ErrorModule, NoopAnimationsModule],
            declarations: [FeedbackDialogComponent],
            providers: [
                {
                    provide: MessagesService,
                    useFactory: () => instance(mockMessagesService),
                },
                {
                    provide: MatDialogRef,
                    useFactory: () => instance(mockMatDialogRef),
                },
                {
                    provide: ErrorService,
                    useFactory: () => instance(mockErrorService),
                },
                {
                    provide: NotificationService,
                    useFactory: () => instance(mockNotificationService),
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(FeedbackDialogComponent);
        debugElement = fixture.debugElement;
        component = debugElement.componentInstance;

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    describe('methods', () => {
        it('should send message', () => {
            when(mockMessagesService.sendFeedbackEmailMsg(anyString())).thenReturn(of(null));
            component.send();
            verify(mockMessagesService.sendFeedbackEmailMsg('')).once();
            verify(mockNotificationService.success(anyString())).once();
            verify(mockMatDialogRef.close()).once();
            expect().nothing();
        });

        it("shouldn't send message", () => {
            when(mockMessagesService.sendFeedbackEmailMsg(anyString())).thenReturn(throwError('Test error'));
            component.send();
            verify(mockMessagesService.sendFeedbackEmailMsg('')).once();
            verify(mockErrorService.error('Test error')).once();
            verify(mockMatDialogRef.close()).never();
            expect().nothing();
        });

        it('should close', () => {
            component.cancel();
            verify(mockMatDialogRef.close()).once();
            expect().nothing();
        });
    });
});
