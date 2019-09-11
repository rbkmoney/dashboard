import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DetailsItemComponent } from './details-item.component';


describe('DetailsItemComponent', () => {

    let component: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, FlexLayoutModule],
            declarations: [DetailsItemComponent, TestDetailsItemComponent]
        });

        const fixture = TestBed.createComponent(TestDetailsItemComponent);
        fixture.detectChanges();
        component = fixture.nativeElement.querySelector('dsh-details-item');
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    it('should contain title', () => {
        const title = component.querySelector('.dsh-payment-details-item-title');
        expect(title.innerHTML).toEqual('Test title');
    });

    it('should contain content', () => {
        const item = component.children[0].innerHTML;
        expect(item).toContain('Test content');
    });

});

@Component({
    template: '<dsh-details-item title="Test title">Test content</dsh-details-item>'
})
class TestDetailsItemComponent {}
