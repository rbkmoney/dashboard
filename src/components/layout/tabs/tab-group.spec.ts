import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';

import { DshTabGroupComponent, DshTabHeaderPosition } from './tab-group.component';
import { DshTabComponent } from './tab.component';
import { DshTabsModule } from './tabs.module';

@Component({
    template: `
        <dsh-tab-group
            class="tab-group"
            [(selectedIndex)]="selectedIndex"
            [headerPosition]="headerPosition"
            (selectedTabChange)="handleSelection($event)"
        >
            <dsh-tab>
                <ng-template dsh-tab-label>Tab One</ng-template>
                Tab one content
            </dsh-tab>
            <dsh-tab>
                <ng-template dsh-tab-label>Tab Two</ng-template>
                <span>Tab </span><span>two</span><span>content</span>
            </dsh-tab>
            <dsh-tab>
                <ng-template dsh-tab-label>Tab Three</ng-template>
                Tab three content
            </dsh-tab>
        </dsh-tab-group>
    `
})
class SimpleTabsTestAppComponent {
    @ViewChildren(DshTabComponent) tabs: QueryList<DshTabComponent>;
    selectedIndex = 1;
    selectEvent: any;
    headerPosition: DshTabHeaderPosition = 'above';

    handleSelection(event: any) {
        this.selectEvent = event;
    }
}

@Component({
    template: `
        <dsh-tab-group
            class="tab-group"
            [(selectedIndex)]="selectedIndex"
            (selectedTabChange)="handleSelection($event)"
        >
            <dsh-tab *ngFor="let tab of tabs">
                <ng-template dsh-tab-label>{{ tab.label }}</ng-template>
                {{ tab.content }}
            </dsh-tab>
        </dsh-tab-group>
    `
})
class SimpleDynamicTabsTestAppComponent {
    tabs = [
        { label: 'Label 1', content: 'Content 1' },
        { label: 'Label 2', content: 'Content 2' },
        { label: 'Label 3', content: 'Content 3' }
    ];
    selectedIndex = 1;
    selectEvent: any;

    handleSelection(event: any) {
        this.selectEvent = event;
    }
}

@Component({
    template: `
        <dsh-tab-group class="tab-group" [(selectedIndex)]="selectedIndex">
            <dsh-tab *ngFor="let tab of tabs" label="{{ tab.label }}">
                {{ tab.content }}
            </dsh-tab>
        </dsh-tab-group>
    `
})
class BindedTabsTestAppComponent {
    tabs = [{ label: 'one', content: 'one' }, { label: 'two', content: 'two' }];
    selectedIndex = 0;
}

@Component({
    selector: 'dsh-test-app',
    template: `
        <dsh-tab-group class="tab-group">
            <dsh-tab>
                <ng-template dsh-tab-label>Tab One</ng-template>
                Tab one content
            </dsh-tab>
            <dsh-tab disabled>
                <ng-template dsh-tab-label>Tab Two</ng-template>
                Tab two content
            </dsh-tab>
            <dsh-tab [disabled]="isDisabled">
                <ng-template dsh-tab-label>Tab Three</ng-template>
                Tab three content
            </dsh-tab>
        </dsh-tab-group>
    `
})
class DisabledTabsTestAppComponent {
    @ViewChildren(DshTabComponent) tabs: QueryList<DshTabComponent>;
    isDisabled = false;
}

@Component({
    template: `
        <dsh-tab-group class="tab-group">
            <dsh-tab *ngFor="let tab of tabs | async">
                <ng-template dsh-tab-label>{{ tab.label }}</ng-template>
                {{ tab.content }}
            </dsh-tab>
        </dsh-tab-group>
    `
})
class AsyncTabsTestAppComponent implements OnInit {
    private _tabs = [{ label: 'one', content: 'one' }, { label: 'two', content: 'two' }];

    tabs: Observable<any>;

    ngOnInit() {
        // Use ngOnInit because there is some issue with scheduling the async task in the constructor.
        this.tabs = new Observable((observer: any) => {
            setTimeout(() => observer.next(this._tabs));
        });
    }
}

@Component({
    template: `
        <dsh-tab-group>
            <dsh-tab label="Junk food"> Pizza, fries</dsh-tab>
            <dsh-tab label="Vegetables"> Broccoli, spinach</dsh-tab>
            <dsh-tab [label]="otherLabel"> {{ otherContent }} </dsh-tab>
            <dsh-tab label="Legumes"><p #legumes>Peanuts</p></dsh-tab>
        </dsh-tab-group>
    `
})
class TabGroupWithSimpleApiComponent {
    otherLabel = 'Fruit';
    otherContent = 'Apples, grapes';
    @ViewChild('legumes') legumes: any;
}

@Component({
    selector: 'dsh-template-tabs',
    template: `
        <dsh-tab-group>
            <dsh-tab label="One">
                Eager
            </dsh-tab>
            <dsh-tab label="Two">
                <ng-template matTabContent>
                    <div class="child">Hi</div>
                </ng-template>
            </dsh-tab>
        </dsh-tab-group>
    `
})
class TemplateTabsComponent {}

@Component({
    template: `
        <dsh-tab-group>
            <dsh-tab [aria-label]="ariaLabel" [aria-labelledby]="ariaLabelledby"></dsh-tab>
        </dsh-tab-group>
    `
})
class TabGroupWithAriaInputsComponent {
    ariaLabel: string;
    ariaLabelledby: string;
}

describe('DshTabGroupComponentComponent', () => {
    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [DshTabsModule, NoopAnimationsModule],
            declarations: [
                SimpleTabsTestAppComponent,
                SimpleDynamicTabsTestAppComponent,
                BindedTabsTestAppComponent,
                AsyncTabsTestAppComponent,
                DisabledTabsTestAppComponent,
                TabGroupWithSimpleApiComponent,
                TemplateTabsComponent,
                TabGroupWithAriaInputsComponent
            ]
        });

        TestBed.compileComponents();
    }));

    describe('basic', () => {
        let fixture: ComponentFixture<SimpleTabsTestAppComponent>;

        beforeEach(() => {
            fixture = TestBed.createComponent(SimpleTabsTestAppComponent);
        });

        it('should default to the second tab', () => {
            checkSelectedIndex(1, fixture);
        });

        it('should change selected index on click', () => {
            const component = fixture.debugElement.componentInstance;
            component.selectedIndex = 0;
            checkSelectedIndex(0, fixture);

            let tabLabel = fixture.debugElement.queryAll(By.css('.dsh-tab-label'))[1];
            tabLabel.nativeElement.click();
            checkSelectedIndex(1, fixture);

            tabLabel = fixture.debugElement.queryAll(By.css('.dsh-tab-label'))[2];
            tabLabel.nativeElement.click();
            checkSelectedIndex(2, fixture);
        });

        it('should update tab positions when selected index is changed', () => {
            fixture.detectChanges();
            const component: DshTabGroupComponent = fixture.debugElement.query(By.css('dsh-tab-group'))
                .componentInstance;
            const tabs: DshTabComponent[] = component._tabs.toArray();

            expect(tabs[0].position).toBeLessThan(0);
            expect(tabs[1].position).toBe(0);
            expect(tabs[2].position).toBeGreaterThan(0);

            component.selectedIndex = 2;
            fixture.detectChanges();
            expect(tabs[0].position).toBeLessThan(0);
            expect(tabs[1].position).toBeLessThan(0);
            expect(tabs[2].position).toBe(0);

            component.selectedIndex = 0;
            fixture.detectChanges();
            expect(tabs[0].position).toBe(0);
            expect(tabs[1].position).toBeGreaterThan(0);
            expect(tabs[2].position).toBeGreaterThan(0);
        });

        it('should clamp the selected index to the size of the number of tabs', () => {
            fixture.detectChanges();
            const component: DshTabGroupComponent = fixture.debugElement.query(By.css('dsh-tab-group'))
                .componentInstance;

            fixture.componentInstance.selectedIndex = -1;
            fixture.detectChanges();
            expect(component.selectedIndex).toBe(0);

            fixture.componentInstance.selectedIndex = fixture.componentInstance.tabs.length;
            fixture.detectChanges();
            expect(component.selectedIndex).toBe(2);
        });

        it('should not crash when setting the selected index to NaN', () => {
            const component = fixture.debugElement.componentInstance;

            expect(() => {
                component.selectedIndex = NaN;
                fixture.detectChanges();
            }).not.toThrow();
        });
    });

    describe('disable tabs', () => {
        let fixture: ComponentFixture<DisabledTabsTestAppComponent>;
        beforeEach(() => {
            fixture = TestBed.createComponent(DisabledTabsTestAppComponent);
        });

        it('should have one disabled tab', () => {
            fixture.detectChanges();
            const labels = fixture.debugElement.queryAll(By.css('.dsh-tab-label-disabled'));

            expect(labels.length).toBe(1);
        });
    });

    describe('dynamic binding tabs', () => {
        let fixture: ComponentFixture<SimpleDynamicTabsTestAppComponent>;

        beforeEach(fakeAsync(() => {
            fixture = TestBed.createComponent(SimpleDynamicTabsTestAppComponent);
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
        }));

        it('should be able to add a new tab, select it, and have correct origin position', fakeAsync(() => {
            const component: DshTabGroupComponent = fixture.debugElement.query(By.css('dsh-tab-group'))
                .componentInstance;

            let tabs: DshTabComponent[] = component._tabs.toArray();
            expect(tabs[0].origin).toBe(null);
            expect(tabs[1].origin).toBe(0);
            expect(tabs[2].origin).toBe(null);

            fixture.componentInstance.tabs.push({ label: 'New tab', content: 'to right of index' });
            fixture.componentInstance.selectedIndex = 4;
            fixture.detectChanges();
            tick();

            tabs = component._tabs.toArray();
            expect(tabs[3].origin).toBeGreaterThanOrEqual(0);

            fixture.componentInstance.selectedIndex = 0;
            fixture.detectChanges();
            tick();

            fixture.componentInstance.tabs.push({ label: 'New tab', content: 'to left of index' });
            fixture.detectChanges();
            tick();

            tabs = component._tabs.toArray();
            expect(tabs[0].origin).toBeLessThan(0);
        }));

        it('should update selected index if the last tab removed while selected', fakeAsync(() => {
            const component: DshTabGroupComponent = fixture.debugElement.query(By.css('dsh-tab-group'))
                .componentInstance;

            const numberOfTabs = component._tabs.length;
            fixture.componentInstance.selectedIndex = numberOfTabs - 1;
            fixture.detectChanges();
            tick();

            fixture.componentInstance.tabs.pop();
            fixture.detectChanges();
            tick();

            expect(component.selectedIndex).toBe(numberOfTabs - 2);
        }));

        it('should be able to select a new tab after creation', fakeAsync(() => {
            fixture.detectChanges();
            const component: DshTabGroupComponent = fixture.debugElement.query(By.css('dsh-tab-group'))
                .componentInstance;

            fixture.componentInstance.tabs.push({ label: 'Last tab', content: 'at the end' });
            fixture.componentInstance.selectedIndex = 3;

            fixture.detectChanges();
            tick();

            expect(component.selectedIndex).toBe(3);
            expect(component._tabs.toArray()[3].isActive).toBe(true);
        }));
    });

    function checkSelectedIndex(expectedIndex: number, fixture: ComponentFixture<any>) {
        fixture.detectChanges();

        const tabComponent: DshTabGroupComponent = fixture.debugElement.query(By.css('dsh-tab-group'))
            .componentInstance;
        expect(tabComponent.selectedIndex).toBe(expectedIndex);

        const tabLabelElement = fixture.debugElement.query(By.css(`.dsh-tab-label:nth-of-type(${expectedIndex + 1})`))
            .nativeElement;
        expect(tabLabelElement.classList.contains('dsh-tab-label-active')).toBe(true);

        const tabContentElement = fixture.debugElement.query(By.css(`dsh-tab-body:nth-of-type(${expectedIndex + 1})`))
            .nativeElement;
        expect(tabContentElement.classList.contains('dsh-tab-body-active')).toBe(true);
    }
});
