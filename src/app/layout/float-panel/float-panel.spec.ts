import { Component, Type, Provider } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayContainer, FullscreenOverlayContainer } from '@angular/cdk/overlay';

import { FloatPanelModule } from './float-panel.module';

@Component({
    template: `
        <dsh-float-panel [pinned]="pinned">
            Базовый фильтр
            <dsh-float-panel-actions>
                <button dsh-button>
                    Сбросить
                </button>
            </dsh-float-panel-actions>
            <dsh-float-panel-more>
                Фильтр
            </dsh-float-panel-more>
        </dsh-float-panel>
    `
})
class SimpleFloatPanelComponent {
    pinned = true;
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
});
