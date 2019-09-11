import { Component, Type, Provider } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

import { TimelineModule } from '.';
import { TimelineItemBadgeComponent } from './timeline-item/timeline-item-badge';
import { TimelineItemContentComponent } from './timeline-item/timeline-item-content';
import { TimelineItemTitleComponent } from './timeline-item/timeline-item-title';
import { TimelineItemComponent } from './timeline-item';
import { StatusColor } from '../theme-manager';

@Component({
    template: `
        <dsh-timeline>
            <dsh-timeline-item [color]="color">
                <dsh-timeline-item-badge>Badge</dsh-timeline-item-badge>
                <dsh-timeline-item-title>Title</dsh-timeline-item-title>
                <dsh-timeline-item-content>Content</dsh-timeline-item-content>
            </dsh-timeline-item>
        </dsh-timeline>
    `
})
class SampleTimelineComponent {
    color: StatusColor;
}

describe('Timeline', () => {
    function createComponent<T>(
        component: Type<T>,
        providers: Provider[] = [],
        declarations: any[] = []
    ): ComponentFixture<T> {
        TestBed.configureTestingModule({
            imports: [TimelineModule, NoopAnimationsModule],
            declarations: [component, ...declarations],
            providers
        }).compileComponents();
        const fixture = TestBed.createComponent<T>(component);
        fixture.detectChanges();
        return fixture;
    }

    describe('TimelineItem', () => {
        it('should have badge', () => {
            const fixture = createComponent(SampleTimelineComponent);
            expect(
                fixture.debugElement.query(By.directive(TimelineItemBadgeComponent)).nativeElement.textContent.trim()
            ).toBe('Badge');
        });

        it('should have title', () => {
            const fixture = createComponent(SampleTimelineComponent);
            expect(
                fixture.debugElement.query(By.directive(TimelineItemTitleComponent)).nativeElement.textContent.trim()
            ).toBe('Title');
        });

        it('should have content', () => {
            const fixture = createComponent(SampleTimelineComponent);
            expect(
                fixture.debugElement.query(By.directive(TimelineItemContentComponent)).nativeElement.textContent.trim()
            ).toBe('Content');
        });

        it('should change class when setting color', () => {
            const fixture = createComponent(SampleTimelineComponent);
            const baseClass = fixture.debugElement.query(By.directive(TimelineItemComponent)).query(By.css('*'))
                .nativeElement.className;
            fixture.componentInstance.color = StatusColor.warn;
            fixture.detectChanges();
            const newClass = fixture.debugElement.query(By.directive(TimelineItemComponent)).query(By.css('*'))
                .nativeElement.className;
            expect(baseClass).not.toBe(newClass);
        });
    });
});
