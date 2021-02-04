import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslocoTestingModule } from '@ngneat/transloco';

import { LimitedListItemComponent } from './components/limited-list-item/limited-list-item.component';
import { LimitedListComponent } from './limited-list.component';
import { LimitedListModule } from './limited-list.module';

@Component({
    template: `
        <dsh-limited-list title="Title">
            <dsh-limited-list-item>item 1</dsh-limited-list-item>
            <dsh-limited-list-item>item 2</dsh-limited-list-item>
            <dsh-limited-list-item>item 3</dsh-limited-list-item>
            <dsh-limited-list-item>item 4</dsh-limited-list-item>
            <dsh-limited-list-item>item 5</dsh-limited-list-item>
            <dsh-limited-list-item>item 6</dsh-limited-list-item>
        </dsh-limited-list>
    `,
})
class MockLimitedListComponent {}

describe('LimitedListComponent', () => {
    class Selector {
        constructor(private _fixture: ComponentFixture<MockLimitedListComponent>) {}

        selectList = () => this._fixture.debugElement.query(By.directive(LimitedListComponent));
        selectTitle = () => this.selectList().query(By.css('.dsh-limited-list-title'));
        selectItems = () => this.selectList().queryAll(By.directive(LimitedListItemComponent));
        selectShowMore = () => this.selectList().query(By.css('.dsh-limited-list-show-more'));
    }

    let component: MockLimitedListComponent;
    let fixture: ComponentFixture<MockLimitedListComponent>;
    let selector: Selector;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                LimitedListModule,
                TranslocoTestingModule.withLangs({
                    en: {
                        showMore: 'Show more',
                    },
                }),
            ],
            declarations: [MockLimitedListComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MockLimitedListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        selector = new Selector(fixture);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('template', () => {
        it('should render title', () => {
            const title = selector.selectTitle();
            expect(title.nativeElement.textContent).toBe('Title');
        });
        it('should render first 5 items', () => {
            const items = selector.selectItems();
            expect(items.map((item) => item.nativeElement.textContent).filter((t) => t).length).toBe(5);
        });
        describe('items', () => {
            it('should render show more', () => {
                const showMore = selector.selectShowMore();
                expect(showMore.nativeElement.textContent.trim()).toBe('en.showMore');
            });
            it('should render all items when on click', () => {
                const showMore = selector.selectShowMore();
                const items = selector.selectItems();
                showMore.nativeElement.click();
                fixture.detectChanges();
                expect(items.map((item) => item.nativeElement.textContent).filter((t) => t).length).toBe(6);
            });
        });
    });
});
