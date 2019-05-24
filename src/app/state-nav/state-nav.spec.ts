import { Component, Type, Provider } from '@angular/core';
import { ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { StateNavItemComponent, StateNavModule } from '.';
import { Color } from './state-nav-item';

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

    describe('Active', () => {
        it('should be init active/selected', () => {
            const fixture = createComponent(SimpleStateNavComponent);
            const item: StateNavItemComponent = getAllItems(fixture)[0].componentInstance;
            expect(item.active$.value).toBe(true);
        });

        it('should be init unactive/unselected', () => {
            const fixture = createComponent(SimpleStateNavComponent);
            const item: StateNavItemComponent = getAllItems(fixture)[1].componentInstance;
            expect(item.active$.value).toBe(false);
        });
    });

    describe('Validation', () => {
        it('should be validation=warn', () => {
            const fixture = createComponent(SimpleStateNavComponent);
            const item: StateNavItemComponent = getAllItems(fixture)[1].componentInstance;
            expect(item.color).toBe(Color.warn);
        });

        it('should has warn class', () => {
            const fixture = createComponent(SimpleStateNavComponent);
            const itemContent: HTMLElement = getAllItems(fixture)[1].query(By.css('*')).nativeElement;
            expect(itemContent.classList.contains('warn')).toBeTruthy();
        });

        it('should be validation=success', () => {
            const fixture = createComponent(SimpleStateNavComponent);
            const item: StateNavItemComponent = getAllItems(fixture)[2].componentInstance;
            expect(item.color).toBe(Color.success);
        });

        it('should has success class', () => {
            const fixture = createComponent(SimpleStateNavComponent);
            const itemContent: HTMLElement = getAllItems(fixture)[2].query(By.css('*')).nativeElement;
            expect(itemContent.classList.contains('success')).toBeTruthy();
        });

        it('should be without validation', () => {
            const fixture = createComponent(SimpleStateNavComponent);
            const item: StateNavItemComponent = getAllItems(fixture)[3].componentInstance;
            expect(item.color).toBeUndefined();
        });
    });

    describe('Item selection', () => {
        function createAndSelect() {
            const fixture = createComponent(SimpleStateNavComponent);
            const [item, ...others] = getAllItems(fixture);
            spyOn(fixture.componentInstance, 'selectItem');
            item.query(By.css('*')).nativeElement.click();
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
