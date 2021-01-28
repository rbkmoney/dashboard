import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NoContentDirective } from '@dsh/app/shared/directives/no-content/no-content.directive';

@Component({
    selector: 'dsh-content-container',
    template: `
        <div [dshNoContent]="myTemplate">
            <ng-content></ng-content>
        </div>
        <ng-template #myTemplate>
            <div>my template value</div>
        </ng-template>
    `,
})
class TestContentContainerComponent {}

@Component({
    selector: 'dsh-test-content',
    template: `
        <dsh-content-container>
            <div>my own content</div>
        </dsh-content-container>
    `,
})
class TestContentComponent {}

@Component({
    selector: 'dsh-test-no-content',
    template: ` <dsh-content-container></dsh-content-container> `,
})
class TestNoContentComponent {}

describe('NoContentDirective', () => {
    let directiveElement: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                NoContentDirective,
                TestContentContainerComponent,
                TestContentComponent,
                TestNoContentComponent,
            ],
        }).compileComponents();
    });

    describe('bind to component', () => {
        let fixture: ComponentFixture<TestContentContainerComponent>;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestContentContainerComponent);
            directiveElement = fixture.debugElement.query(By.directive(NoContentDirective));
            fixture.detectChanges();
        });

        it('should created and bind to element', () => {
            expect(directiveElement).toBeTruthy();
        });
    });

    describe('with custom content', () => {
        let fixture: ComponentFixture<TestContentComponent>;

        beforeEach(() => {
            fixture = TestBed.createComponent(TestContentComponent);
            directiveElement = fixture.debugElement.query(By.directive(NoContentDirective));
            fixture.detectChanges();
        });

        it('should render provided content', () => {
            expect(directiveElement.nativeElement.textContent.trim()).toBe('my own content');
        });
    });

    describe('no content', () => {
        let fixture: ComponentFixture<TestNoContentComponent>;

        beforeEach(async () => {
            fixture = TestBed.createComponent(TestNoContentComponent);
            directiveElement = fixture.debugElement.query(By.directive(NoContentDirective));
            fixture.detectChanges();

            await Promise.resolve();
        });

        it('should render default template that was bound to directive', () => {
            expect(fixture.debugElement.nativeElement.textContent.trim()).toBe('my template value');
        });

        it('should display none on directive element if there is no content provided', () => {
            expect(directiveElement.nativeElement.textContent.trim()).toBe('');
            expect(directiveElement.nativeElement.style.display).toBe('none');
        });
    });
});
