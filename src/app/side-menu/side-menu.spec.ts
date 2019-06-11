import { Component, Type, Provider } from '@angular/core';
import { ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SideMenuItemComponent, SideMenuModule } from '.';

@Component({
    template: `
        <dsh-side-menu (selectedIndexChange)="selectItem($event)">
            <dsh-side-menu-item active>first</dsh-side-menu-item>
            <dsh-side-menu-item>second</dsh-side-menu-item>
            <dsh-side-menu-item>third</dsh-side-menu-item>
            <dsh-side-menu-item>last</dsh-side-menu-item>
        </dsh-side-menu>
    `
})
class SimpleSideMenuComponent {
    idx: number;

    selectItem(idx: number) {
        this.idx = idx;
    }
}

describe('SideMenu', () => {
    function createComponent<T>(
        component: Type<T>,
        providers: Provider[] = [],
        declarations: any[] = []
    ): ComponentFixture<T> {
        TestBed.configureTestingModule({
            imports: [SideMenuModule],
            declarations: [component, ...declarations],
            providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }, ...providers]
        }).compileComponents();

        return TestBed.createComponent<T>(component);
    }

    function getAllItems<T>(fixture: ComponentFixture<T>) {
        return fixture.debugElement.queryAll(By.directive(SideMenuItemComponent));
    }

    it('should render with text-content', () => {
        const fixture = createComponent(SimpleSideMenuComponent);
        const item: HTMLElement = getAllItems(fixture)[1].nativeElement;
        expect(item.textContent).toBe('second');
    });

    describe('Active', () => {
        it('should be init active/selected', () => {
            const fixture = createComponent(SimpleSideMenuComponent);
            const item: SideMenuItemComponent = getAllItems(fixture)[0].componentInstance;
            expect(item.active$.value).toBe(true);
        });

        it('should be init unactive/unselected', () => {
            const fixture = createComponent(SimpleSideMenuComponent);
            const item: SideMenuItemComponent = getAllItems(fixture)[1].componentInstance;
            expect(item.active$.value).toBe(false);
        });
    });

    describe('Item selection', () => {
        function createAndSelect() {
            const fixture = createComponent(SimpleSideMenuComponent);
            const [item, ...others] = getAllItems(fixture);
            spyOn(fixture.componentInstance, 'selectItem');
            item.nativeElement.click();
            fixture.detectChanges();
            return { fixture, item, others };
        }

        it('should be event handler called after click', () => {
            const { fixture } = createAndSelect();
            expect(fixture.componentInstance.selectItem).toHaveBeenCalled();
        });

        it('should be selected after click', () => {
            const { item } = createAndSelect();
            expect(item.componentInstance.active$.value).toBe(true);
        });

        it('should be others unselected after click', () => {
            const { others } = createAndSelect();
            for (const item of others) {
                expect(item.componentInstance.active$.value).toBe(false);
            }
        });
    });
});
