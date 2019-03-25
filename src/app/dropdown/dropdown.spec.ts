import { Component, Type, Provider, ViewChild } from '@angular/core';
import { ComponentFixture, inject, TestBed, tick, fakeAsync, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { DropdownModule } from './dropdown.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayContainer, FullscreenOverlayContainer } from '@angular/cdk/overlay';

import { DropdownTriggerDirective } from './dropdown-trigger.directive';

describe('DshDropdown', () => {
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    function createComponent<T>(
        component: Type<T>,
        providers: Provider[] = [],
        declarations: any[] = []
    ): ComponentFixture<T> {
        TestBed.configureTestingModule({
            imports: [DropdownModule, NoopAnimationsModule],
            declarations: [component, ...declarations],
            providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }, ...providers]
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

    it('should open the dropdown', () => {
        const fixture = createComponent(SimpleDropdownComponent);
        expect(overlayContainerElement.textContent).toBe('');
        fixture.componentInstance.trigger.open();
        expect(overlayContainerElement.textContent).toContain('Text');
    });

    it('should close the dropdown', fakeAsync(() => {
        const fixture = createComponent(SimpleDropdownComponent);
        fixture.componentInstance.trigger.open();
        fixture.componentInstance.trigger.close();
        tick(500);
        expect(overlayContainerElement.textContent).toBe('');
    }));

    it('should toggle the dropdown', fakeAsync(() => {
        const fixture = createComponent(SimpleDropdownComponent);
        fixture.componentInstance.trigger.toggle();
        expect(overlayContainerElement.textContent).toContain('Text');
        fixture.componentInstance.trigger.toggle();
        tick(500);
        expect(overlayContainerElement.textContent).toBe('');
    }));
});

@Component({
    template: `
        <button [dshDropdownTriggerFor]="dropdown">Toggle</button>
        <dsh-dropdown width="400px" #dropdown="dshDropdown">Text</dsh-dropdown>
    `
})
class SimpleDropdownComponent {
    @ViewChild(DropdownTriggerDirective) trigger: DropdownTriggerDirective;
}
