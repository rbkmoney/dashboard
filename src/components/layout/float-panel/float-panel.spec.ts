import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, Provider, Type, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SettingsModule } from '../../../app/settings';
import { FloatPanelComponent } from './float-panel.component';
import { FloatPanelModule } from './float-panel.module';

@Component({
    template: `
        <dsh-float-panel [pinned]="pinned" [expanded]="expanded" #floatPanel>
            Базовый фильтр
            <dsh-float-panel-actions>
                <button>Сбросить</button>
            </dsh-float-panel-actions>
            <dsh-float-panel-more>
                Фильтр
            </dsh-float-panel-more>
        </dsh-float-panel>
    `,
})
class SimpleFloatPanelComponent {
    @ViewChild('floatPanel') floatPanel: FloatPanelComponent;
    pinned = true;
    expanded = true;
}

const WRAPPER = By.css('.dsh-float-panel-more');

describe('FloatPanelComponent', () => {
    function createComponent<T>(
        component: Type<T>,
        providers: Provider[] = [],
        declarations: any[] = []
    ): ComponentFixture<T> {
        TestBed.configureTestingModule({
            imports: [FloatPanelModule, NoopAnimationsModule, HttpClientTestingModule, SettingsModule],
            declarations: [component, ...declarations],
            providers,
        }).compileComponents();

        return TestBed.createComponent<T>(component);
    }

    describe('Pinned expand/collapse', () => {
        it('should expanded', () => {
            const fixture = createComponent(SimpleFloatPanelComponent);
            fixture.detectChanges();
            expect(fixture.debugElement.query(WRAPPER)).toBeDefined();
        });

        it('should collapsed', () => {
            const fixture = createComponent(SimpleFloatPanelComponent);
            fixture.componentInstance.expanded = false;
            fixture.detectChanges();
            expect(fixture.debugElement.query(WRAPPER)).toBeNull();
        });
    });

    describe('Float expand/collapse', () => {
        it('should expanded', () => {
            const fixture = createComponent(SimpleFloatPanelComponent);
            fixture.componentInstance.pinned = false;
            fixture.detectChanges();
            expect(fixture.debugElement.query(WRAPPER)).toBeDefined();
        });

        it('should collapsed', () => {
            const fixture = createComponent(SimpleFloatPanelComponent);
            fixture.componentInstance.pinned = false;
            fixture.componentInstance.expanded = false;
            fixture.detectChanges();
            expect(fixture.debugElement.query(WRAPPER)).toBeNull();
        });
    });
});
