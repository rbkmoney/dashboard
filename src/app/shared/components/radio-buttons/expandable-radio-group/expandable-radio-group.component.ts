import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    OnInit,
    Output,
    QueryList,
    TemplateRef,
} from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';

import { isNumber } from '@dsh/app/shared/utils';
import { Dict } from '@dsh/type-utils';
import { coerceBoolean } from '@dsh/utils';

import { ExpandableRadioGroupItemDirective } from './directives/expandable-radio-group-item/expandable-radio-group-item.directive';
import { ExpandableRadioChoice } from './types/expandable-radio-choice';

@Component({
    selector: 'dsh-expandable-radio-group',
    templateUrl: './expandable-radio-group.component.html',
    styleUrls: ['./expandable-radio-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandableRadioGroupComponent implements OnInit, AfterContentInit {
    @Input() control: FormControl;
    @Input() choices: ExpandableRadioChoice[];
    @Input() previewCount?: number;
    @Input() isOpen?: boolean;

    @coerceBoolean
    @Input()
    anyResponse: boolean;

    @Output() opened = new EventEmitter<void>();
    @Output() closed = new EventEmitter<void>();

    itemsList: ExpandableRadioChoice[];
    isAllChoicesVisible: boolean;

    @ContentChildren(ExpandableRadioGroupItemDirective)
    private itemsQuery: QueryList<ExpandableRadioGroupItemDirective>;

    private itemsDict: Dict<TemplateRef<ExpandableRadioGroupItemDirective>>;

    ngOnInit(): void {
        this.hideChoices();
    }

    ngAfterContentInit(): void {
        this.itemsDict = Array.from(this.itemsQuery).reduce(
            (acc: Dict<TemplateRef<ExpandableRadioGroupItemDirective>>, item: ExpandableRadioGroupItemDirective) => {
                acc[item.dshExpandableRadioGroupItem] = item.template;
                return acc;
            },
            {}
        );
    }

    getChoiceId(choice: ExpandableRadioChoice): string {
        return (choice as any)?.id || choice;
    }

    getChoiceTemplate(choice: ExpandableRadioChoice): TemplateRef<ExpandableRadioGroupItemDirective> | null {
        return this.itemsDict[this.getChoiceId(choice)] ?? null;
    }

    toggleStatusesVisibility(): void {
        if (this.isAllChoicesVisible) {
            this.hideChoices();
            this.closed.emit();
        } else {
            this.showAllChoices();
            this.opened.emit();
        }
    }

    getChoiceLabel(choiceItem: ExpandableRadioChoice): string {
        return (choiceItem as any)?.label || choiceItem;
    }

    protected showAllChoices(): void {
        this.itemsList = this.choices.slice();
        this.checkIsAllStatusesAvailable();
    }

    protected hideChoices(): void {
        if (isNumber(this.previewCount) && this.previewCount > 0) {
            this.itemsList = this.choices.slice(0, this.previewCount);
        } else {
            this.itemsList = this.choices.slice();
        }
        this.checkIsAllStatusesAvailable();
    }

    private checkIsAllStatusesAvailable(): void {
        this.isAllChoicesVisible = this.itemsList.length === this.choices.length;
    }
}
