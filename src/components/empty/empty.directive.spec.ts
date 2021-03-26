import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoModule } from '@ngneat/transloco';

import { TextComponent } from '@dsh/components/empty/components/text/text.component';

import { EmptyDirective } from './empty.directive';

@Component({
    selector: 'dsh-host',
    template: `<div *dshEmpty="true"></div>`,
})
class HostComponent {}

describe('EmptyComponent', () => {
    let fixture: ComponentFixture<HostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TranslocoModule],
            declarations: [HostComponent, EmptyDirective, TextComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);

        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(fixture.debugElement.componentInstance).toBeTruthy();
    });
});
