import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteVirtualScrollComponent } from './autocomplete-virtual-scroll.component';

describe('AutocompleteVirtualScrollComponent', () => {
    let component: AutocompleteVirtualScrollComponent;
    let fixture: ComponentFixture<AutocompleteVirtualScrollComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AutocompleteVirtualScrollComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AutocompleteVirtualScrollComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
