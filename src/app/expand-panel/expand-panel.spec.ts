import { Component, Type, Provider } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

import { ExpandPanelModule } from './expand-panel.module';

@Component({
    template: `
        <dsh-expand-panel [expanded]="expanded">
            Hello world
            <dsh-expand-panel-content>
                Content
            </dsh-expand-panel-content>
        </dsh-expand-panel>
    `
})
class SampleExpandPanelComponent {
    expanded = false;
}

describe('ExpandPanel', () => {
    function createComponent<T>(
        component: Type<T>,
        providers: Provider[] = [],
        declarations: any[] = []
    ): ComponentFixture<T> {
        TestBed.configureTestingModule({
            imports: [ExpandPanelModule, NoopAnimationsModule],
            declarations: [component, ...declarations],
            providers
        }).compileComponents();
        return TestBed.createComponent<T>(component);
    }

    it('should render content', () => {
        const fixture = createComponent(SampleExpandPanelComponent);
        expect(fixture.debugElement.query(By.css('*')).nativeElement.textContent.trim()).toBe('Hello world');
    });

    it('should expanded', () => {
        const fixture = createComponent(SampleExpandPanelComponent);
        fixture.componentInstance.expanded = true;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.dsh-expand-panel-content')).nativeElement.textContent.trim()).toBe(
            'Content'
        );
    });
});
