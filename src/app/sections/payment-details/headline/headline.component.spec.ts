import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HeadlineComponent } from './headline.component';
import { LocalePipe } from '../../../locale/locale.pipe';
import { LocaleDictionaryService } from '../../../locale/locale-dictionary';

describe('HeadlineComponent', () => {
    let component: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, FlexLayoutModule, MatIconModule],
            declarations: [HeadlineComponent, TestHeadlineComponent, LocalePipe],
            providers: [{ provide: LocaleDictionaryService, useValue: { mapDictionaryKey: value => value } }]
        });

        const fixture = TestBed.createComponent(TestHeadlineComponent);
        fixture.detectChanges();
        component = fixture.nativeElement.querySelector('dsh-headline');
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    it('should contain payment id', () => {
        const title = component.querySelector('#secondaryTitle');
        expect(title.innerHTML).toContain('#test');
    });
});

@Component({
    template: '<dsh-headline paymentID="test"></dsh-headline>'
})
class TestHeadlineComponent {}
