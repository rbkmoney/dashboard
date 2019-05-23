import { Component, Type, Provider } from '@angular/core';
import { ComponentFixture, TestBed, ComponentFixtureAutoDetect, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { StateNavItemComponent, StateNavModule } from '.';
import { Validation } from './state-nav-item';

@Component({
    template: `
        <dsh-state-nav (select)="selectItem($event)">
            <dsh-state-nav-item active>first</dsh-state-nav-item>
            <dsh-state-nav-item validation="warn">second</dsh-state-nav-item>
            <dsh-state-nav-item validation="success">third</dsh-state-nav-item>
            <dsh-state-nav-item>last</dsh-state-nav-item>
        </dsh-state-nav>
    `
})
class SimpleStateNavComponent {
    idx: number;

    selectItem({ idx }) {
        this.idx = idx;
    }
}

describe('DshStateNav', () => {
    function createComponent<T>(
        component: Type<T>,
        providers: Provider[] = [],
        declarations: any[] = []
    ): ComponentFixture<T> {
        TestBed.configureTestingModule({
            imports: [StateNavModule],
            declarations: [component, ...declarations],
            providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }, ...providers]
        }).compileComponents();

        return TestBed.createComponent<T>(component);
    }

    function getAllItems<T>(fixture: ComponentFixture<T>) {
        return fixture.debugElement.queryAll(By.directive(StateNavItemComponent));
    }

    it('should render with text-content', () => {
        const fixture = createComponent(SimpleStateNavComponent);
        const item: HTMLElement = getAllItems(fixture)[1].nativeElement;
        expect(item.textContent).toBe('second');
    });

    it('should be selected', () => {
        const fixture = createComponent(SimpleStateNavComponent);
        const item: StateNavItemComponent = getAllItems(fixture)[0].componentInstance;
        expect(item.active$.value).toBe(true);
    });

    it('should be unselected', () => {
        const fixture = createComponent(SimpleStateNavComponent);
        const item: StateNavItemComponent = getAllItems(fixture)[1].componentInstance;
        expect(item.active$.value).toBe(false);
    });

    it('should be validation=warn', () => {
        const fixture = createComponent(SimpleStateNavComponent);
        const item: StateNavItemComponent = getAllItems(fixture)[1].componentInstance;
        expect(item.validation).toBe(Validation.warn);
    });

    it('should be validation=success', () => {
        const fixture = createComponent(SimpleStateNavComponent);
        const item: StateNavItemComponent = getAllItems(fixture)[2].componentInstance;
        expect(item.validation).toBe(Validation.success);
    });

    it('should be without validation', () => {
        const fixture = createComponent(SimpleStateNavComponent);
        const item: StateNavItemComponent = getAllItems(fixture)[3].componentInstance;
        expect(item.validation).toBeUndefined();
    });

    it('should be event handler called', () => {
        const fixture = createComponent(SimpleStateNavComponent);
        const item = getAllItems(fixture)[3];
        spyOn(fixture.componentInstance, 'selectItem');
        item.query(By.css('*')).nativeElement.click();
        fixture.detectChanges();
        expect(fixture.componentInstance.selectItem).toHaveBeenCalled();
    });

    it('should be selected after click', () => {
        const fixture = createComponent(SimpleStateNavComponent);
        const item = getAllItems(fixture)[3];
        spyOn(fixture.componentInstance, 'selectItem');
        item.query(By.css('*')).nativeElement.click();
        fixture.detectChanges();
        expect(item.componentInstance.active$.value).toBe(true);
    });

    it('should be others unselected after click', () => {
        const fixture = createComponent(SimpleStateNavComponent);
        const [item, ...other] = getAllItems(fixture);
        spyOn(fixture.componentInstance, 'selectItem');
        item.query(By.css('*')).nativeElement.click();
        fixture.detectChanges();
        for (const i of other) {
            expect(i.componentInstance.active$.value).toBe(false);
        }
    });
});
