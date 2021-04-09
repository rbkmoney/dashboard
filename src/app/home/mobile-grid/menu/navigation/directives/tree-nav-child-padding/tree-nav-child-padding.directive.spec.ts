import { CdkTreeModule, FlatTreeControl } from '@angular/cdk/tree';
import { Component, DebugElement, Input, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { isParentFlatNode } from '../../../../types/is-parent-flat-node';
import { NavigationFlatNode } from '../../../../types/navigation-flat-node';
import { TreeNavChildPaddingDirective } from './tree-nav-child-padding.directive';

abstract class BaseMockComponent {
    directive: TreeNavChildPaddingDirective;
    treeData: NavigationFlatNode[];

    treeControl = new FlatTreeControl<NavigationFlatNode>(
        (node: NavigationFlatNode) => node.level,
        (node: NavigationFlatNode) => isParentFlatNode(node)
    );
}

function configureModule(mockComponent: Type<BaseMockComponent>) {
    TestBed.configureTestingModule({
        imports: [CdkTreeModule],
        declarations: [mockComponent, TreeNavChildPaddingDirective],
    });
}

describe('ChildNavPaddingDirective', () => {
    let fixture: ComponentFixture<BaseMockComponent>;
    let component: BaseMockComponent;

    describe('creation', () => {
        @Component({
            template: `
                <cdk-tree [dataSource]="treeData" [treeControl]="treeControl">
                    <cdk-tree-node
                        *cdkTreeNodeDef="let node"
                        dshTreeNavChildPadding="10"
                        dshTreeNavChildPaddingLevelSwitch="20"
                    ></cdk-tree-node>
                </cdk-tree>
            `,
        })
        class MockComponent extends BaseMockComponent {
            @ViewChild(TreeNavChildPaddingDirective) directive: TreeNavChildPaddingDirective;
            @Input() treeData: NavigationFlatNode[];
        }

        beforeEach(() => {
            configureModule(MockComponent);

            fixture = TestBed.createComponent(MockComponent);
            component = fixture.componentInstance;

            component.treeData = [
                {
                    id: 'any',
                    level: 0,
                },
            ];

            fixture.detectChanges();
        });

        it('should create an instance', () => {
            expect(component.directive).toBeTruthy();
        });
    });

    describe('ngOnInit', () => {
        @Component({
            template: `
                <cdk-tree [dataSource]="treeData" [treeControl]="treeControl">
                    <cdk-tree-node
                        *cdkTreeNodeDef="let node"
                        dshTreeNavChildPadding="10"
                        dshTreeNavChildPaddingLevelSwitch="20"
                    ></cdk-tree-node>
                </cdk-tree>
            `,
        })
        class MockComponent extends BaseMockComponent {
            @Input() treeData: NavigationFlatNode[];
        }

        let nodes: DebugElement[];

        beforeEach(() => {
            configureModule(MockComponent);
            fixture = TestBed.createComponent(MockComponent);
            component = fixture.componentInstance;
            component.treeData = [
                { id: 'one', level: 0 },
                { id: 'two', level: 0 },
            ];

            fixture.detectChanges();
        });

        it('should update padding values on treeData changes', () => {
            nodes = fixture.debugElement.queryAll(By.css('cdk-tree-node'));

            expect(nodes.length).toBe(2);

            component.treeData = [
                { id: 'one', level: 0 },
                { id: 'two', level: 0, isExpanded: true },
                { id: 'two one', level: 1 },
                { id: 'two two', level: 1 },
                { id: 'two three', level: 1 },
                { id: 'two four', level: 1 },
                { id: 'three', level: 0 },
            ];

            fixture.detectChanges();

            nodes = fixture.debugElement.queryAll(By.css('cdk-tree-node'));

            expect(nodes.length).toBe(7);
        });
    });

    describe('inputs', () => {
        let nodes: DebugElement[];

        function createComponent(mockComponent: Type<BaseMockComponent>, treeData: NavigationFlatNode[]) {
            configureModule(mockComponent);
            fixture = TestBed.createComponent(mockComponent);
            component = fixture.componentInstance;
            component.treeData = treeData;

            fixture.detectChanges();

            nodes = fixture.debugElement.queryAll(By.css('cdk-tree-node'));
        }

        describe('dshTreeNavChildPadding', () => {
            it('should use px for default padding metric', () => {
                @Component({
                    template: `
                        <cdk-tree [dataSource]="treeData" [treeControl]="treeControl">
                            <cdk-tree-node *cdkTreeNodeDef="let node" dshTreeNavChildPadding="10"></cdk-tree-node>
                        </cdk-tree>
                    `,
                })
                class MockComponent extends BaseMockComponent {
                    @Input() treeData: NavigationFlatNode[];
                }

                createComponent(MockComponent, [
                    { id: 'one', level: 0, isExpanded: true },
                    { id: 'one one', level: 1 },
                    { id: 'one four', level: 1 },
                ]);

                expect(nodes[2].nativeElement.style.paddingTop).toBe('10px');
                expect(nodes[2].nativeElement.style.paddingBottom).toBe('10px');
            });

            it('should work with custom units for padding metric', () => {
                @Component({
                    template: `
                        <cdk-tree [dataSource]="treeData" [treeControl]="treeControl">
                            <cdk-tree-node *cdkTreeNodeDef="let node" dshTreeNavChildPadding="1.2em"></cdk-tree-node>
                        </cdk-tree>
                    `,
                })
                class MockComponent extends BaseMockComponent {
                    @Input() treeData: NavigationFlatNode[];
                }

                createComponent(MockComponent, [
                    { id: 'one', level: 0, isExpanded: true },
                    { id: 'one one', level: 1 },
                    { id: 'one four', level: 1 },
                ]);

                expect(nodes[2].nativeElement.style.paddingTop).toBe('1.2em');
                expect(nodes[2].nativeElement.style.paddingBottom).toBe('1.2em');
            });
        });

        describe('dshTreeNavChildPaddingLevelSwitch', () => {
            it('should change paddingTop for first child item using provided value', () => {
                @Component({
                    template: `
                        <cdk-tree [dataSource]="treeData" [treeControl]="treeControl">
                            <cdk-tree-node
                                *cdkTreeNodeDef="let node"
                                dshTreeNavChildPadding="10"
                                dshTreeNavChildPaddingLevelSwitch="20"
                            ></cdk-tree-node>
                        </cdk-tree>
                    `,
                })
                class MockComponent extends BaseMockComponent {
                    @Input() treeData: NavigationFlatNode[];
                }

                createComponent(MockComponent, [
                    { id: 'one', level: 0, isExpanded: true },
                    { id: 'one one', level: 1 },
                    { id: 'one four', level: 1 },
                ]);

                expect(nodes[1].nativeElement.style.paddingTop).toBe('20px');
                expect(nodes[1].nativeElement.style.paddingBottom).toBe('10px');
            });

            it('should change paddingBottom for last child in the row item using provided value', () => {
                @Component({
                    template: `
                        <cdk-tree [dataSource]="treeData" [treeControl]="treeControl">
                            <cdk-tree-node
                                *cdkTreeNodeDef="let node"
                                dshTreeNavChildPadding="10"
                                dshTreeNavChildPaddingLevelSwitch="20"
                            ></cdk-tree-node>
                        </cdk-tree>
                    `,
                })
                class MockComponent extends BaseMockComponent {
                    @Input() treeData: NavigationFlatNode[];
                }

                createComponent(MockComponent, [
                    { id: 'one', level: 0, isExpanded: true },
                    { id: 'one one', level: 1 },
                    { id: 'one four', level: 1 },
                    { id: 'two', level: 0 },
                ]);

                expect(nodes[2].nativeElement.style.paddingTop).toBe('10px');
                expect(nodes[2].nativeElement.style.paddingBottom).toBe('20px');
            });

            it('should not change paddingBottom for last child in the row if there is no parent after it', () => {
                @Component({
                    template: `
                        <cdk-tree [dataSource]="treeData" [treeControl]="treeControl">
                            <cdk-tree-node
                                *cdkTreeNodeDef="let node"
                                dshTreeNavChildPadding="10"
                                dshTreeNavChildPaddingLevelSwitch="20"
                            ></cdk-tree-node>
                        </cdk-tree>
                    `,
                })
                class MockComponent extends BaseMockComponent {
                    @Input() treeData: NavigationFlatNode[];
                }

                createComponent(MockComponent, [
                    { id: 'one', level: 0, isExpanded: true },
                    { id: 'one one', level: 1 },
                    { id: 'one four', level: 1 },
                ]);

                expect(nodes[2].nativeElement.style.paddingTop).toBe('10px');
                expect(nodes[2].nativeElement.style.paddingBottom).toBe('10px');
            });

            it('should support non px units', () => {
                @Component({
                    template: `
                        <cdk-tree [dataSource]="treeData" [treeControl]="treeControl">
                            <cdk-tree-node
                                *cdkTreeNodeDef="let node"
                                dshTreeNavChildPadding="10"
                                dshTreeNavChildPaddingLevelSwitch="2em"
                            ></cdk-tree-node>
                        </cdk-tree>
                    `,
                })
                class MockComponent extends BaseMockComponent {
                    @Input() treeData: NavigationFlatNode[];
                }

                createComponent(MockComponent, [
                    { id: 'one', level: 0, isExpanded: true },
                    { id: 'one one', level: 1 },
                    { id: 'one four', level: 1 },
                ]);

                expect(nodes[1].nativeElement.style.paddingTop).toBe('2em');
                expect(nodes[1].nativeElement.style.paddingBottom).toBe('10px');
            });
        });
    });
});
