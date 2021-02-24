import { TemplateRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { instance, mock } from 'ts-mockito';

import { ExpandableRadioGroupItemDirective } from './expandable-radio-group-item.directive';

describe('ExpandableRadioGroupItemDirective', () => {
    let directive: ExpandableRadioGroupItemDirective;
    let mockTemplateRef: TemplateRef<unknown>;

    beforeEach(() => {
        mockTemplateRef = mock(TemplateRef);
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ExpandableRadioGroupItemDirective,
                {
                    provide: TemplateRef,
                    useFactory: () => instance(mockTemplateRef),
                },
            ],
        });
        directive = TestBed.inject(ExpandableRadioGroupItemDirective);
    });

    describe('creation', () => {
        it('should create', () => {
            expect(directive).toBeTruthy();
        });
    });

    describe('templateRef', () => {
        it('should return template ref of a directive', () => {
            expect(directive.templateRef).toEqual(instance(mockTemplateRef));
        });
    });
});
