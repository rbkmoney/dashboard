import { Component, Type, Provider, ViewChild } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayContainer, FullscreenOverlayContainer } from '@angular/cdk/overlay';
import { By } from '@angular/platform-browser';

import { FloatPanelModule } from './float-panel.module';
import { FloatPanelComponent } from './float-panel.component';

@Component({
    template: `
        <dsh-float-panel [pinned]="pinned" [expanded]="expanded" #floatPanel>
            Базовый фильтр
            <dsh-float-panel-actions>
                <button>Сбросить</button>
            </dsh-float-panel-actions>
            <dsh-float-panel-more>
                Фильтр
            </dsh-float-panel-more>
        </dsh-float-panel>
    `
})
class SimpleFloatPanelComponent {
    @ViewChild('floatPanel') floatPanel: FloatPanelComponent;
    pinned = true;
    expanded = true;
}

describe('FloatPanelComponent', () => {
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    function createComponent<T>(
        component: Type<T>,
        providers: Provider[] = [],
        declarations: any[] = []
    ): ComponentFixture<T> {
        TestBed.configureTestingModule({
            imports: [FloatPanelModule, NoopAnimationsModule],
            declarations: [component, ...declarations],
            providers
        }).compileComponents();

        inject([OverlayContainer], (oc: FullscreenOverlayContainer) => {
            overlayContainer = oc;
            overlayContainerElement = oc.getContainerElement();
        })();

        return TestBed.createComponent<T>(component);
    }

    afterEach(inject([OverlayContainer], (currentOverlayContainer: OverlayContainer) => {
        currentOverlayContainer.ngOnDestroy();
        overlayContainer.ngOnDestroy();
    }));

    describe('Pin/unpin', () => {
        it('should pinned', () => {
            createComponent(SimpleFloatPanelComponent);
            expect(overlayContainerElement.textContent).toBe('');
        });

        it('should float', () => {
            const fixture = createComponent(SimpleFloatPanelComponent);
            fixture.componentInstance.pinned = false;
            fixture.detectChanges();
            expect(overlayContainerElement.textContent).not.toBe('');
        });
    });

    describe('Expand/collapse', () => {
        it('should expanded', () => {
            const fixture = createComponent(SimpleFloatPanelComponent);
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('.dsh-float-panel-more-wrapper'))).toBeDefined();
        });

        it('should collapsed', () => {
            const fixture = createComponent(SimpleFloatPanelComponent);
            fixture.componentInstance.expanded = false;
            fixture.detectChanges();
            expect(fixture.debugElement.query(By.css('.dsh-float-panel-more-wrapper'))).toBeNull();
        });
    });
});
