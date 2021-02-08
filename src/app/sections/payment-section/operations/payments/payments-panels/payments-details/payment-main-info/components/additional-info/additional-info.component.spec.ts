import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { By } from '@angular/platform-browser';

import { getTextContent } from '@dsh/app/shared/tests/get-text-content';
import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';

import { MockDetailsItemModule } from '../../../../../tests/mock-details-item-component';
import { AdditionalInfoComponent } from './additional-info.component';

@Component({
    selector: 'dsh-collapse',
    template: '<ng-content></ng-content>',
})
class MockCollapseComponent {
    @Input() title: string;
}

describe('AdditionalInfoComponent', () => {
    let component: AdditionalInfoComponent;
    let fixture: ComponentFixture<AdditionalInfoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [getTranslocoModule(), FlexLayoutModule, MockDetailsItemModule],
            declarations: [AdditionalInfoComponent, MockCollapseComponent],
        })
            .overrideComponent(AdditionalInfoComponent, {
                set: {
                    changeDetection: ChangeDetectionStrategy.Default,
                },
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AdditionalInfoComponent);
        component = fixture.componentInstance;
        component.info = { externalID: null };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('template', () => {
        it('should render nothing if there is no additional info', () => {
            component.info = { externalID: null };

            fixture.detectChanges();

            expect(getTextContent(fixture.debugElement.nativeElement)).toBe('');
        });

        it('should render rrn and approvalCode and externalId if there is all additional info', () => {
            component.info = {
                transactionInfo: {
                    rrn: 'my_rrn',
                    approvalCode: 'my_approvalCode',
                },
                externalID: 'my_external_id',
            };

            fixture.detectChanges();

            const items = fixture.debugElement.queryAll(By.css('dsh-details-item'));

            expect(items.length).toBe(3);
            expect(getTextContent(items[0].nativeElement)).toBe('my_rrn');
            expect(getTextContent(items[1].nativeElement)).toBe('my_approvalCode');
            expect(getTextContent(items[2].nativeElement)).toBe('my_external_id');
        });

        it('should render rrn and approvalCode if there is only transactionInfo exist', () => {
            component.info = {
                transactionInfo: {
                    rrn: 'my_rrn',
                    approvalCode: 'my_approvalCode',
                },
            };

            fixture.detectChanges();

            const items = fixture.debugElement.queryAll(By.css('dsh-details-item'));

            expect(items.length).toBe(2);
            expect(getTextContent(items[0].nativeElement)).toBe('my_rrn');
            expect(getTextContent(items[1].nativeElement)).toBe('my_approvalCode');
        });

        it('should render externalId if there is only externalId exist', () => {
            component.info = {
                externalID: 'my_external_id',
            };

            fixture.detectChanges();

            const items = fixture.debugElement.queryAll(By.css('dsh-details-item'));

            expect(items.length).toBe(1);
            expect(getTextContent(items[0].nativeElement)).toBe('my_external_id');
        });
    });
});
