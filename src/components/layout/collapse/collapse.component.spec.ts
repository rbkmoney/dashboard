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
    let component: MockCollapseComponent;
    let fixture: ComponentFixture<MockCollapseComponent>;

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
    });

    function selectCollapse() {
        return fixture.debugElement.query(By.directive(CollapseComponent));
    }

    function selectCollapseInstance(): CollapseComponent {
        return selectCollapse().componentInstance;
    }

    function selectHeader() {
        return selectCollapse().query(By.css('.dsh-collapse-header'));
    }

    function selectIndicator() {
        return selectCollapse().query(By.directive(MatIcon));
    }

    function selectContent() {
        const elements = fixture.debugElement.queryAll(By.css('div'));
        return elements[elements.length - 1];
    }

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('template', () => {
        it('should render title', () => {
            const header = selectHeader();
            expect(header.nativeElement.textContent).toBe('Title');
        });
        it('should render indicator', () => {
            const icon = selectIndicator();
            expect(icon).toBeTruthy();
        });
        it('should render content', () => {
            const content = selectContent();
            expect(content.nativeElement.textContent).toBe('Test');
        });
        it('should init collapsed', () => {
            const collapseComponent = selectCollapseInstance();
            expect(collapseComponent.expanded).toBeFalsy();
        });
        it('should expand on click', () => {
            const collapseComponent = selectCollapseInstance();
            const header = selectHeader();
            header.nativeElement.click();
            expect(collapseComponent.expanded).toBeTruthy();
        });
        it('should collapse after second click', () => {
            const collapseComponent = selectCollapseInstance();
            const header = selectHeader();
            header.nativeElement.click();
            header.nativeElement.click();
            expect(collapseComponent.expanded).toBeFalsy();
        });
    });
});
