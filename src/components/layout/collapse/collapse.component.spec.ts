import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { MatIcon, MatIconRegistry } from '@angular/material/icon';
import { By, DomSanitizer } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CollapseComponent } from './collapse.component';
import { CollapseModule } from './collapse.module';

@Component({ template: '<dsh-collapse title="Title">Test</dsh-collapse>' })
class MockCollapseComponent {}

describe('CollapseComponent', () => {
    class Selector {
        constructor(private _fixture: ComponentFixture<MockCollapseComponent>) {}

        selectCollapse = () => fixture.debugElement.query(By.directive(CollapseComponent));
        selectCollapseInstance = (): CollapseComponent => this.selectCollapse().componentInstance;
        selectHeader = () => this.selectCollapse().query(By.css('.dsh-collapse-header'));
        selectIndicator = () => this.selectCollapse().query(By.directive(MatIcon));
        selectContent = () => {
            const elements = this._fixture.debugElement.queryAll(By.css('div'));
            return elements[elements.length - 1];
        };
    }

    let component: MockCollapseComponent;
    let fixture: ComponentFixture<MockCollapseComponent>;
    let selector: Selector;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CollapseModule, NoopAnimationsModule, HttpClientTestingModule],
            declarations: [MockCollapseComponent],
        }).compileComponents();
    }));

    beforeEach(inject([MatIconRegistry, DomSanitizer], (mir: MatIconRegistry, sanitizer: DomSanitizer) => {
        const sanitizedUrl = sanitizer.bypassSecurityTrustResourceUrl('./test.svg');
        mir.addSvgIcon('keyboard_arrow_up', sanitizedUrl);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MockCollapseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        selector = new Selector(fixture);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('template', () => {
        it('should render title', () => {
            const header = selector.selectHeader();
            expect(header.nativeElement.textContent).toBe('Title');
        });
        it('should render indicator', () => {
            const icon = selector.selectIndicator();
            expect(icon).toBeTruthy();
        });
        it('should render content', () => {
            const content = selector.selectContent();
            expect(content.nativeElement.textContent).toBe('Test');
        });
        it('should init collapsed', () => {
            const collapseComponent = selector.selectCollapseInstance();
            expect(collapseComponent.expanded).toBeFalsy();
        });
        it('should expand on click', () => {
            const collapseComponent = selector.selectCollapseInstance();
            const header = selector.selectHeader();
            header.nativeElement.click();
            expect(collapseComponent.expanded).toBeTruthy();
        });
        it('should collapse after second click', () => {
            const collapseComponent = selector.selectCollapseInstance();
            const header = selector.selectHeader();
            header.nativeElement.click();
            header.nativeElement.click();
            expect(collapseComponent.expanded).toBeFalsy();
        });
    });
});
