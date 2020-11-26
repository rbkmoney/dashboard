import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslocoTestingModule } from '@ngneat/transloco';

import { ListItemComponent } from './components/list-item/list-item.component';
import { ListComponent } from './list.component';
import { ListModule } from './list.module';

@Component({
    template: `
        <dsh-list title="Title">
            <dsh-list-item>item 1</dsh-list-item>
            <dsh-list-item>item 2</dsh-list-item>
            <dsh-list-item>item 3</dsh-list-item>
            <dsh-list-item>item 4</dsh-list-item>
            <dsh-list-item>item 5</dsh-list-item>
            <dsh-list-item>item 6</dsh-list-item>
        </dsh-list>
    `,
})
class MockCollapseComponent {}

describe('ListComponent', () => {
    class Selector {
        constructor(private _fixture: ComponentFixture<MockCollapseComponent>) {}

        selectList = () => this._fixture.debugElement.query(By.directive(ListComponent));
        selectTitle = () => this.selectList().query(By.css('.dsh-list-title'));
        selectItems = () => this.selectList().queryAll(By.directive(ListItemComponent));
        selectShowMore = () => this.selectList().query(By.css('.dsh-list-show-more'));
    }

    let component: MockCollapseComponent;
    let fixture: ComponentFixture<MockCollapseComponent>;
    let selector: Selector;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ListModule,
                TranslocoTestingModule.withLangs({
                    en: {
                        showMore: 'Show more',
                    },
                }),
            ],
            declarations: [MockCollapseComponent],
        }).compileComponents();
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
