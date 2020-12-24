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

@Component({ template: '<dsh-collapse title="Title Up" expandDirection="up">Test Up</dsh-collapse>' })
class MockCollapseUpComponent {}

describe('CollapseComponent', () => {
    class Selector {
        constructor(private _fixture: ComponentFixture<MockCollapseComponent>) {}

        selectCollapse = () => this._fixture.debugElement.query(By.directive(CollapseComponent));
        selectCollapseInstance = (): CollapseComponent => this.selectCollapse().componentInstance;
        selectHeader = () => this.selectCollapse().query(By.css('.dsh-collapse-header'));
        selectIndicator = () => this.selectCollapse().query(By.directive(MatIcon));
        selectBody = () => this.selectCollapse().query(By.css('.dsh-collapse-body'));
        selectWrapper = () => this.selectCollapse().query(By.css('.dsh-collapse'));
        selectChildren = () => Array.from((this.selectWrapper().nativeElement as HTMLElement).children);
    }

    let component: MockCollapseComponent;
    let fixture: ComponentFixture<MockCollapseComponent>;
    let selector: Selector;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CollapseModule, NoopAnimationsModule, HttpClientTestingModule],
            declarations: [MockCollapseComponent, MockCollapseUpComponent],
        }).compileComponents();
    }));

    beforeEach(inject([MatIconRegistry, DomSanitizer], (mir: MatIconRegistry, sanitizer: DomSanitizer) => {
        const sanitizedUrl = sanitizer.bypassSecurityTrustResourceUrl('./test.svg');
        mir.addSvgIcon('keyboard_arrow_up', sanitizedUrl);
    }));

    describe('collapse down', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(MockCollapseComponent);
            component = fixture.componentInstance;
            selector = new Selector(fixture);
            fixture.detectChanges();
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
            it("shouldn't render content", () => {
                const body = selector.selectBody();
                expect(body).toBeNull();
            });
            it('should init collapsed', () => {
                const collapseComponent = selector.selectCollapseInstance();
                expect(collapseComponent.expanded).toBeFalsy();
            });
            it('should expand on click', () => {
                const collapseComponent = selector.selectCollapseInstance();
                const header = selector.selectHeader();
                header.nativeElement.click();
                fixture.detectChanges();
                const body = selector.selectBody();
                expect(collapseComponent.expanded).toBeTruthy();
                expect(body).toBeTruthy();
            });
            it('should collapse after second click', () => {
                const collapseComponent = selector.selectCollapseInstance();
                const header = selector.selectHeader();
                header.nativeElement.click();
                header.nativeElement.click();
                expect(collapseComponent.expanded).toBeFalsy();
            });
            it('should expand on click down', () => {
                selector.selectHeader().nativeElement.click();
                fixture.detectChanges();
                const body = selector.selectBody();
                const children = selector.selectChildren();
                expect(children[1]).toEqual(body.nativeElement);
            });
        });
    });
    describe('collapse up', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(MockCollapseUpComponent);
            component = fixture.componentInstance;
            selector = new Selector(fixture);
            fixture.detectChanges();
        });
        it('should create', () => {
            expect(component).toBeTruthy();
        });
        describe('template', () => {
            it('should expand on click upward', () => {
                selector.selectHeader().nativeElement.click();
                fixture.detectChanges();
                const body = selector.selectBody();
                const children = selector.selectChildren();
                expect(children[0]).toEqual(body.nativeElement);
            });
        });
    });
});