import { Component, Type, Provider } from '@angular/core';
import { ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';

import { StateNavModule } from './state-nav.module';

@Component({
    template: `
        <dsh-state-nav (select)="selectItem($event)">
            <dsh-state-nav-item>First</dsh-state-nav-item>
            <dsh-state-nav-item>Second</dsh-state-nav-item>
            <dsh-state-nav-item>Last</dsh-state-nav-item>
        </dsh-state-nav>
    `
})
class SimpleStateNavComponent {}

describe('DshStateNav', () => {
    function createComponent<T>(
        component: Type<T>,
        providers: Provider[] = [],
        declarations: any[] = []
    ): ComponentFixture<T> {
        TestBed.configureTestingModule({
            imports: [StateNavModule],
            declarations: [component, ...declarations],
            providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }, ...providers]
        }).compileComponents();

        return TestBed.createComponent<T>(component);
    }

    it('should open the dropdown', () => {
        const fixture = createComponent(SimpleStateNavComponent);
        expect(fixture).toBe('');
    });
});
