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
import { ExpandableRadioChoice, isExpandableRadioObjectChoice } from './types/expandable-radio-choice';
import { ExpandableRadioChoiceId } from './types/expandable-radio-choice-id';

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

    displayedChoices: ExpandableRadioChoice[];
    isAllChoicesVisible: boolean;

    @ContentChildren(ExpandableRadioGroupItemDirective)
    private itemsQuery: QueryList<ExpandableRadioGroupItemDirective>;

    private itemsDict: Dict<TemplateRef<ExpandableRadioGroupItemDirective>>;

    get isValidPreviewCount(): boolean {
        return isNumber(this.previewCount) && this.previewCount >= 0;
    }

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

    getChoiceId(choice: ExpandableRadioChoice): ExpandableRadioChoiceId {
        return isExpandableRadioObjectChoice(choice) ? choice.id : choice;
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

    getChoiceLabel(choice: ExpandableRadioChoice): string {
        return isExpandableRadioObjectChoice(choice) ? choice.label : choice;
    }

    protected showAllChoices(): void {
        this.displayedChoices = this.choices.slice();
        this.checkIsAllStatusesAvailable();
    }

    protected hideChoices(): void {
        if (this.isValidPreviewCount) {
            this.displayedChoices = this.choices.slice(0, this.previewCount);
        } else {
            this.displayedChoices = this.choices.slice();
        }
        this.checkIsAllStatusesAvailable();
    }

    private checkIsAllStatusesAvailable(): void {
        this.isAllChoicesVisible = this.displayedChoices.length === this.choices.length;
    }
}
