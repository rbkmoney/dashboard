import { Component, DebugElement } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { TestBed } from '@angular/core/testing';
import { CommonModule, Location } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { By } from '@angular/platform-browser';

import { HeadlineComponent } from './headline.component';
import { LocalePipe } from '../../../locale/locale.pipe';
import { LocaleDictionaryService } from '../../../locale/locale-dictionary';
import { SecondaryTitleDirective } from '../secondary-title';

@Component({
    template: '<dsh-headline paymentID="test"></dsh-headline>'
})
class TestHeadlineComponent {}

describe('HeadlineComponent', () => {
    let component: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, FlexLayoutModule, MatIconModule],
            declarations: [HeadlineComponent, TestHeadlineComponent, LocalePipe, SecondaryTitleDirective],
            providers: [
                { provide: Location, useValue: {} },
                { provide: LocaleDictionaryService, useValue: { mapDictionaryKey: value => value } }
            ]
        });

        const fixture = TestBed.createComponent(TestHeadlineComponent);
        fixture.detectChanges();
        component = fixture.debugElement.query(By.directive(HeadlineComponent));
    });

    it('should create component', () => {
        expect(component.nativeElement).toBeTruthy();
    });

    it('should contain payment id', () => {
        const title = component.query(By.directive(SecondaryTitleDirective)).nativeElement;
        expect(title.innerHTML).toContain('#test');
    });
});
