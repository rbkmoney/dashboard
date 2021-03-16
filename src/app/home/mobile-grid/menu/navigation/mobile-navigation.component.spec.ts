import { CdkTreeModule } from '@angular/cdk/tree';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexModule } from '@angular/flex-layout';
import { MatIcon } from '@angular/material/icon';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { RouterModule } from '@angular/router';

import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';
import { ColoredIconModule } from '@dsh/components/indicators';

import { NavigationFlatNodeParent } from '../../types/navigation-flat-node-parent';
import { TreeNavChildPaddingDirective } from './directives/tree-nav-child-padding/tree-nav-child-padding.directive';
import { MobileNavigationComponent } from './mobile-navigation.component';

describe('MobileNavigationComponent', () => {
    let component: MobileNavigationComponent;
    let fixture: ComponentFixture<MobileNavigationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                CdkTreeModule,
                MatIconTestingModule,
                RouterModule,
                getTranslocoModule(),
                FlexModule,
                ColoredIconModule,
            ],
            declarations: [MobileNavigationComponent, TreeNavChildPaddingDirective, MatIcon],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MobileNavigationComponent);
        component = fixture.componentInstance;
        component.menu = [];

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('ngOnChanges', () => {
        it('should open level nodes that contains active node id', () => {
            component.menu = [
                { id: 'one', level: 0, isExpanded: false },
                { id: 'one one', level: 1, isExpanded: false },
                { id: 'one one one', level: 2, isExpanded: false },
                { id: 'one one one one', level: 3 },
                { id: 'two', level: 0, isExpanded: false },
                { id: 'two one', level: 1, isExpanded: false },
                { id: 'two one one', level: 2 },
            ];
            component.activeId = 'one one one one';

            fixture.detectChanges();
            component.ngOnChanges({
                menu: {
                    previousValue: [],
                    currentValue: component.menu,
                    isFirstChange(): boolean {
                        return false;
                    },
                    firstChange: false,
                },
                activeId: {
                    previousValue: undefined,
                    currentValue: component.activeId,
                    isFirstChange(): boolean {
                        return true;
                    },
                    firstChange: true,
                },
            });

            expect(component.menu).toEqual([
                { id: 'one', level: 0, isExpanded: true },
                { id: 'one one', level: 1, isExpanded: true },
                { id: 'one one one', level: 2, isExpanded: true },
                { id: 'one one one one', level: 3 },
                { id: 'two', level: 0, isExpanded: false },
                { id: 'two one', level: 1, isExpanded: false },
                { id: 'two one one', level: 2 },
            ]);
        });
    });

    describe('isExpandableNode', () => {
        it('should return true if node its own isExpanded property', () => {
            expect(component.isExpandableNode(0, { id: 'one one one', level: 2, isExpanded: true })).toBe(true);
        });

        it('should return false if node has no isExpanded property', () => {
            expect(component.isExpandableNode(0, { id: 'one one one', level: 2 })).toBe(false);
        });
    });

    describe('hasNodeIcon', () => {
        it('should return true if node has icon meta info', () => {
            expect(component.hasNodeIcon({ id: 'one one one', level: 2, meta: { path: '/', icon: 'pie_chart' } })).toBe(
                true
            );
        });

        it('should return false if node is expandable', () => {
            expect(component.hasNodeIcon({ id: 'one one one', level: 2, isExpanded: true })).toBe(false);
        });

        it('should return false if node has no meta information', () => {
            expect(component.hasNodeIcon({ id: 'one one one', level: 2 })).toBe(false);
        });

        it('should return false if node has not provided icon info', () => {
            expect(component.hasNodeIcon({ id: 'one one one', level: 2, meta: { path: '/' } })).toBe(false);
        });
    });

    describe('hasNodeLink', () => {
        it('should return true if node has path', () => {
            expect(component.hasNodeLink({ id: 'one one one', level: 2, meta: { path: '/' } })).toBe(true);
        });

        it('should return false if node is expandable', () => {
            expect(component.hasNodeLink({ id: 'one one one', level: 2, isExpanded: true })).toBe(false);
        });

        it('should return false if node has no meta information', () => {
            expect(component.hasNodeLink({ id: 'one one one', level: 2 })).toBe(false);
        });
    });

    describe('shouldDisplayNode', () => {
        beforeEach(() => {
            component.menu = [
                { id: 'one', level: 0, isExpanded: true },
                { id: 'one one', level: 1, isExpanded: true },
                { id: 'one one one', level: 2, isExpanded: true },
                { id: 'one one one one', level: 3 },
                { id: 'two', level: 0, isExpanded: false },
                { id: 'two one', level: 1, isExpanded: false },
                { id: 'two one one', level: 2 },
            ];
        });

        it('should return true if parent node isExpanded', () => {
            expect(component.shouldDisplayNode(component.menu[3])).toBe(true);
        });

        it('should return true if there is no parent of node', () => {
            expect(component.shouldDisplayNode(component.menu[4])).toBe(true);
        });

        it('should return false if parent node is not expanded', () => {
            expect(component.shouldDisplayNode(component.menu[5])).toBe(false);
        });
    });

    describe('toggleNode', () => {
        beforeEach(() => {
            component.menu = [
                { id: 'one', level: 0, isExpanded: true },
                { id: 'one one', level: 1, isExpanded: true },
                { id: 'one one one', level: 2, isExpanded: true },
                { id: 'one one one one', level: 3 },
                { id: 'two', level: 0, isExpanded: false },
                { id: 'two one', level: 1, isExpanded: false },
                { id: 'two one one', level: 2 },
            ];
        });

        it('should switch true to false', () => {
            component.toggleNode(component.menu[2]);
            expect((component.menu[2] as NavigationFlatNodeParent).isExpanded).toBe(false);
        });

        it('should switch false to true', () => {
            component.toggleNode(component.menu[4]);
            expect((component.menu[4] as NavigationFlatNodeParent).isExpanded).toBe(true);
        });

        it('should not toggle node that is not a parent', () => {
            component.toggleNode(component.menu[3]);
            expect(component.menu[3]).toEqual({ id: 'one one one one', level: 3 });
        });
    });

    describe('isNodeActive', () => {
        beforeEach(() => {
            component.menu = [
                { id: 'one', level: 0, isExpanded: true },
                { id: 'one one', level: 1, isExpanded: true },
                { id: 'one one one', level: 2, isExpanded: true },
                { id: 'one one one one', level: 3 },
                { id: 'two', level: 0, isExpanded: false },
                { id: 'two one', level: 1, isExpanded: false },
                { id: 'two one one', level: 2 },
            ];
            component.activeId = 'two one one';
        });

        it('should return true if active id equals to node id', () => {
            expect(component.isNodeActive(component.menu[6])).toBe(true);
        });

        it('should return false if active id does not match node id', () => {
            expect(component.isNodeActive(component.menu[3])).toBe(false);
        });
    });

    describe('navigated', () => {
        it('should emit navigationChanged event', () => {
            const spyOnNavigationChanged = spyOn(component.navigationChanged, 'emit');

            component.navigated();

            expect(spyOnNavigationChanged).toHaveBeenCalledTimes(1);
        });
    });
});
