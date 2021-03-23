import { CdkTree, CdkTreeNode } from '@angular/cdk/tree';
import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isObject from 'lodash-es/isObject';

import { ROOT_NODE_LEVEL } from '../../../../consts';
import { NavigationFlatNode } from '../../../../types/navigation-flat-node';
import { parseIndentValue } from '../../utils/parse-indent-value';

@UntilDestroy()
@Directive({
    selector: '[dshTreeNavChildPadding]',
})
export class TreeNavChildPaddingDirective<T extends NavigationFlatNode = NavigationFlatNode, K = T> implements OnInit {
    @Input('dshTreeNavChildPadding')
    get indent(): number | string {
        return this.elPadding;
    }
    set indent(value: number | string) {
        this.setPadding(value);
    }

    @Input('dshTreeNavChildPaddingLevelSwitch')
    get levelIndent(): number | string {
        return this.elLevelPadding;
    }
    set levelIndent(value: number | string) {
        this.setLevelPadding(value);
    }

    private elPadding: number;
    private elPaddingUnit: string;
    private elLevelPadding: number;
    private elLevelPaddingUnit: string;

    constructor(
        private treeNode: CdkTreeNode<T, K>,
        private tree: CdkTree<T, K>,
        private element: ElementRef<HTMLElement>
    ) {}

    ngOnInit(): void {
        this.tree.viewChange.pipe(untilDestroyed(this)).subscribe(() => {
            this.updateElementIndents();
        });
    }

    private updateElementIndents(): void {
        const nodeData = this.treeNode.data;
        const hasParents = nodeData.level > ROOT_NODE_LEVEL;

        if (!hasParents) {
            return;
        }

        const dataSource = this.tree.dataSource as T[];
        const positionIndex = dataSource.map(({ id }: T) => id).indexOf(nodeData.id);

        const elBefore = dataSource[positionIndex - 1];
        const elAfter = dataSource[positionIndex + 1];
        const hasParentBefore = isObject(elBefore) && elBefore.level === nodeData.level - 1;
        const hasParentAfter = isObject(elAfter) && elAfter.level === nodeData.level - 1;

        const elementDomRef = this.element.nativeElement;

        const childPadding = `${this.elPadding}${this.elPaddingUnit}`;
        const levelPadding = `${this.elLevelPadding * nodeData.level}${this.elLevelPaddingUnit}`;

        elementDomRef.style.paddingTop = childPadding;
        elementDomRef.style.paddingBottom = childPadding;

        if (hasParentBefore) {
            elementDomRef.style.paddingTop = levelPadding;
        }

        if (hasParentAfter) {
            elementDomRef.style.paddingBottom = levelPadding;
        }
    }

    private setPadding(value: number | string): void {
        const [indent, units] = parseIndentValue(value);

        this.elPadding = indent;
        this.elPaddingUnit = units;
    }

    private setLevelPadding(value: number | string): void {
        const [indent, units] = parseIndentValue(value);

        this.elLevelPadding = indent;
        this.elLevelPaddingUnit = units;
    }
}
