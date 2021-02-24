import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { MatRadioModule } from '@angular/material/radio';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl } from '@ngneat/reactive-forms';

import { getTextContent } from '@dsh/app/shared/tests/get-text-content';
import { getTranslocoModule } from '@dsh/app/shared/tests/get-transloco-module';
import { createArrayOfLength } from '@dsh/app/shared/utils';

import { InlineShowAllToggleModule } from '../../buttons/inline-show-all-toggle';
import { ExpandableRadioGroupItemDirective } from './directives/expandable-radio-group-item/expandable-radio-group-item.directive';
import { ExpandableRadioGroupComponent } from './expandable-radio-group.component';

describe('ExpandableRadioGroupComponent', () => {
    let component: ExpandableRadioGroupComponent;
    let fixture: ComponentFixture<ExpandableRadioGroupComponent>;

    async function createComponent(components: any[] = []) {
        await TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                getTranslocoModule(),
                MatRadioModule,
                InlineShowAllToggleModule,
                ReactiveFormsModule,
                MatIconTestingModule,
            ],
            declarations: [ExpandableRadioGroupComponent, ExpandableRadioGroupItemDirective, MatIcon, ...components],
        }).compileComponents();

        fixture = TestBed.createComponent(ExpandableRadioGroupComponent);
        component = fixture.componentInstance;
    }

    describe('creation', () => {
        it('should create', async () => {
            await createComponent();
            component.choices = [];
            component.control = new FormControl();

            fixture.detectChanges();

            expect(component).toBeTruthy();
        });
    });

    describe('isValidPreviewCount', () => {
        beforeEach(async () => {
            await createComponent();

            component.control = new FormControl();
            component.choices = [];
        });

        it('should be true if preview count more than 0', () => {
            component.previewCount = 1;
            expect(component.isValidPreviewCount).toBe(true);
        });

        it('should be true if preview count equals to 0', () => {
            component.previewCount = 0;
            expect(component.isValidPreviewCount).toBe(true);
        });

        it('should be false if preview count less than 0', () => {
            component.previewCount = -1;
            expect(component.isValidPreviewCount).toBe(false);
        });

        it('should be false if preview count was not provided', () => {
            component.previewCount = undefined;
            expect(component.isValidPreviewCount).toBe(false);
        });

        it('should render toggle button toggle if previewCount is valid', () => {
            component.previewCount = 2;

            fixture.detectChanges();

            const toggleButton = fixture.debugElement.query(By.css('dsh-inline-show-all-toggle'));
            expect(toggleButton).toBeTruthy();
        });

        it('should not render toggle button if preview in invalid', () => {
            component.previewCount = -2;

            fixture.detectChanges();

            const toggleButton = fixture.debugElement.query(By.css('dsh-inline-show-all-toggle'));
            expect(toggleButton).toBeFalsy();
        });
    });

    describe('ngOnInit', () => {
        const choices = ['mine', 'another_mine', 'third_one'];

        beforeEach(async () => {
            await createComponent();
            component.control = new FormControl();
            component.choices = choices.slice();
        });

        it('should slice choices using valid previewCount', () => {
            component.previewCount = 2;

            fixture.detectChanges();

            expect(component.displayedChoices).toEqual(choices.slice(0, 2));
        });

        it('should slice all choices if previewCount is invalid', () => {
            component.previewCount = -2;

            fixture.detectChanges();

            expect(component.displayedChoices).toEqual(choices);
        });

        it('should init isAllChoicesVisible in true if previewCount is valid', () => {
            component.previewCount = 2;

            fixture.detectChanges();

            expect(component.isAllChoicesVisible).toBe(false);
        });

        it('should init isAllChoicesVisible in false previewCount is invalid', () => {
            component.previewCount = -2;

            fixture.detectChanges();

            expect(component.isAllChoicesVisible).toBe(true);
        });
    });

    describe('getChoiceId', () => {
        beforeEach(async () => {
            await createComponent();
        });

        it('should return choice id as the same string if choice is a string', () => {
            expect(component.getChoiceId('mine')).toBe('mine');
        });

        it('should return choice id field if choice is an object', () => {
            expect(component.getChoiceId({ id: 'mine', label: 'MineLabel' })).toBe('mine');
        });
    });

    describe('getChoiceTemplate', () => {
        class BaseHostComponent {
            control = new FormControl();
        }

        let testFixture: ComponentFixture<BaseHostComponent>;

        function getButtons(): DebugElement[] {
            return testFixture.debugElement.queryAll(By.css('dsh-expandable-radio-group mat-radio-button'));
        }

        function getButtonsNames(): string[] {
            return getButtons().map((radioButtonEl: DebugElement) => getTextContent(radioButtonEl.nativeElement));
        }

        it('should render template item if it was provided for id', async () => {
            @Component({
                template: `
                    <dsh-expandable-radio-group [control]="control" [choices]="choices">
                        <ng-container *ngFor="let choice of choices">
                            <ng-template [dshExpandableRadioGroupItem]="choice">
                                <div>{{ getFormattedChoice(choice) }}</div>
                            </ng-template>
                        </ng-container>
                    </dsh-expandable-radio-group>
                `,
            })
            class HostComponent extends BaseHostComponent {
                choices = ['mine', 'another_mine', 'alternative'];

                getFormattedChoice(choice: string): string {
                    return `Formatted: "${choice}"`;
                }
            }

            await createComponent([HostComponent]);
            testFixture = TestBed.createComponent(HostComponent);
            testFixture.detectChanges();

            const radioButtons = getButtons();
            const radioNames = getButtonsNames();

            expect(radioButtons.length).toBe(3);
            expect(radioNames).toEqual(['Formatted: "mine"', 'Formatted: "another_mine"', 'Formatted: "alternative"']);
        });

        it('should render item label instead of custom template using id', async () => {
            @Component({
                template: `
                    <dsh-expandable-radio-group [control]="control" [choices]="choices">
                        <ng-container *ngFor="let choice of choices; let i = index">
                            <ng-template [dshExpandableRadioGroupItem]="i === 1 ? 'never' : choice">
                                <div>{{ getFormattedChoice(choice) }}</div>
                            </ng-template>
                        </ng-container>
                    </dsh-expandable-radio-group>
                `,
            })
            class HostComponent extends BaseHostComponent {
                choices = ['mine', 'another_mine', 'alternative'];

                getFormattedChoice(choice: string): string {
                    return `Formatted: "${choice}"`;
                }
            }

            await createComponent([HostComponent]);
            testFixture = TestBed.createComponent(HostComponent);
            testFixture.detectChanges();

            const radioButtons = getButtons();
            const radioNames = getButtonsNames();

            expect(radioButtons.length).toBe(3);
            expect(radioNames).toEqual(['Formatted: "mine"', 'another_mine', 'Formatted: "alternative"']);
        });
    });

    describe('toggleStatusesVisibility', () => {
        let allChoices: string[];

        beforeEach(async () => {
            await createComponent();

            allChoices = createArrayOfLength(5).map((_: null, index: number) => {
                return `mock_choice_${index + 1}`;
            });

            component.control = new FormControl();
            component.choices = allChoices.slice();
            component.previewCount = 2;

            fixture.detectChanges();
        });

        it('should show all choices if itemsList was not fully shown', () => {
            expect(component.isAllChoicesVisible).toBe(false);
            expect(component.displayedChoices).toEqual(['mock_choice_1', 'mock_choice_2']);

            component.toggleStatusesVisibility();

            expect(component.isAllChoicesVisible).toBe(true);
            expect(component.displayedChoices).toEqual(allChoices);
        });

        it('should show only first few choices using previewCount value', () => {
            component.toggleStatusesVisibility();

            expect(component.isAllChoicesVisible).toBe(true);
            expect(component.displayedChoices).toEqual(allChoices);

            component.toggleStatusesVisibility();

            expect(component.isAllChoicesVisible).toBe(false);
            expect(component.displayedChoices).toEqual(['mock_choice_1', 'mock_choice_2']);
        });
    });

    describe('getChoiceLabel', () => {
        beforeEach(async () => {
            await createComponent();
        });

        it('should return choice label as the same string if choice is a string', () => {
            expect(component.getChoiceLabel('mine')).toBe('mine');
        });

        it('should return choice label field if choice is an object', () => {
            expect(component.getChoiceLabel({ id: 'mine', label: 'MineLabel' })).toBe('MineLabel');
        });
    });
});
