import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDividerModule } from '@angular/material/divider';

import { NavigationFlatNode } from '../types/navigation-flat-node';
import { MobileMenuComponent } from './mobile-menu.component';

@Component({
    selector: 'dsh-mobile-navigation',
    template: '',
})
class MockNavComponent {
    @Input() menu: NavigationFlatNode[];
    @Input() activeId: string;
}

@Component({
    selector: 'dsh-mobile-user-bar',
    template: '',
})
class MockUserBarComponent {}

describe('MobileMenuComponent', () => {
    let component: MobileMenuComponent;
    let fixture: ComponentFixture<MobileMenuComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatDividerModule],
            declarations: [MobileMenuComponent, MockNavComponent, MockUserBarComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MobileMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('navigated', () => {
        it('should emit navigationChanged event', () => {
            const spyOnNavigationChanged = spyOn(component.navigationChanged, 'emit');

            component.navigated();

            expect(spyOnNavigationChanged).toHaveBeenCalledTimes(1);
        });
    });
});
