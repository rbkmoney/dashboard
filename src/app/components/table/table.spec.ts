import { async, ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DshTableModule } from './index';
import { MatPaginatorModule, MatSortModule, MatTableDataSource } from '@angular/material';
import { expectTableTodshChContent } from './table-utils.spec';
import {
    ArrayDataSourceDshTableAppComponent,
    DshTableAppComponent,
    DshTableWithPaginatorAppComponent,
    DshTableWithSortAppComponent,
    DshTableWithWhenRowAppComponent,
    NativeHtmlTableAppComponent,
    StickyTableAppComponent,
    TableWithNgContainerRowComponent,
    TestData
} from './components.spec';

describe('DshTable', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [DshTableModule, MatPaginatorModule, MatSortModule, NoopAnimationsModule],
            declarations: [
                DshTableAppComponent,
                DshTableWithWhenRowAppComponent,
                ArrayDataSourceDshTableAppComponent,
                NativeHtmlTableAppComponent,
                DshTableWithSortAppComponent,
                DshTableWithPaginatorAppComponent,
                StickyTableAppComponent,
                TableWithNgContainerRowComponent
            ]
        }).compileComponents();
    }));

    describe('with basic data source', () => {
        it('should be able to create a table with the right content and without when row', () => {
            const fixture = TestBed.createComponent(DshTableAppComponent);
            fixture.detectChanges();

            const tableElement = fixture.nativeElement.querySelector('.dsh-table')!;
            const data = fixture.componentInstance.dataSource.data;
            expectTableTodshChContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                [data[0].a, data[0].b, data[0].c],
                [data[1].a, data[1].b, data[1].c],
                [data[2].a, data[2].b, data[2].c],
                ['fourth_row'],
                ['Footer A', 'Footer B', 'Footer C']
            ]);
        });

        it('should create a table with special when row', () => {
            const fixture = TestBed.createComponent(DshTableWithWhenRowAppComponent);
            fixture.detectChanges();

            const tableElement = fixture.nativeElement.querySelector('.dsh-table');
            expectTableTodshChContent(tableElement, [
                ['Column A'],
                ['a_1'],
                ['a_2'],
                ['a_3'],
                ['fourth_row'],
                ['Footer A']
            ]);
        });

        it('should create a table with multiTemplateDataRows true', () => {
            const fixture = TestBed.createComponent(DshTableWithWhenRowAppComponent);
            fixture.componentInstance.multiTemplateDataRows = true;
            fixture.detectChanges();

            const tableElement = fixture.nativeElement.querySelector('.dsh-table');
            expectTableTodshChContent(tableElement, [
                ['Column A'],
                ['a_1'],
                ['a_2'],
                ['a_3'],
                ['a_4'], // With multiple rows, this row shows up along with the special 'when' fourth_row
                ['fourth_row'],
                ['Footer A']
            ]);
        });
    });

    it('should be able to render a table correctly with native elements', () => {
        const fixture = TestBed.createComponent(NativeHtmlTableAppComponent);
        fixture.detectChanges();

        const tableElement = fixture.nativeElement.querySelector('table');
        const data = fixture.componentInstance.dataSource.data;
        expectTableTodshChContent(tableElement, [
            ['Column A', 'Column B', 'Column C'],
            [data[0].a, data[0].b, data[0].c],
            [data[1].a, data[1].b, data[1].c],
            [data[2].a, data[2].b, data[2].c],
            [data[3].a, data[3].b, data[3].c]
        ]);
    });

    it('should render with DshTableDataSource and sort', () => {
        const fixture = TestBed.createComponent(DshTableWithSortAppComponent);
        fixture.detectChanges();

        const tableElement = fixture.nativeElement.querySelector('.dsh-table')!;
        const data = fixture.componentInstance.dataSource.data;
        expectTableTodshChContent(tableElement, [
            ['Column A', 'Column B', 'Column C'],
            [data[0].a, data[0].b, data[0].c],
            [data[1].a, data[1].b, data[1].c],
            [data[2].a, data[2].b, data[2].c]
        ]);
    });

    it('should render with DshTableDataSource and pagination', () => {
        const fixture = TestBed.createComponent(DshTableWithPaginatorAppComponent);
        fixture.detectChanges();

        const tableElement = fixture.nativeElement.querySelector('.dsh-table')!;
        const data = fixture.componentInstance.dataSource.data;
        expectTableTodshChContent(tableElement, [
            ['Column A', 'Column B', 'Column C'],
            [data[0].a, data[0].b, data[0].c],
            [data[1].a, data[1].b, data[1].c],
            [data[2].a, data[2].b, data[2].c]
        ]);
    });

    it('should apply custom sticky CSS class to sticky cells', () => {
        const fixture = TestBed.createComponent(StickyTableAppComponent);
        fixture.detectChanges();

        const stuckCellElement = fixture.nativeElement.querySelector('.dsh-table th')!;
        expect(stuckCellElement.classList).toContain('dsh-table-sticky');
    });

    // Note: needs to be fakeAsync so it catches the error.
    it('should not throw when a row definition is on an ng-container', fakeAsync(() => {
        const fixture = TestBed.createComponent(TableWithNgContainerRowComponent);

        expect(() => {
            fixture.detectChanges();
            tick();
        }).not.toThrow();
    }));

    describe('with DshTableDataSource and sort/pagination/filter', () => {
        let tableElement: HTMLElement;
        let fixture: ComponentFixture<ArrayDataSourceDshTableAppComponent>;
        let dataSource: MatTableDataSource<TestData>;
        let component: ArrayDataSourceDshTableAppComponent;

        beforeEach(fakeAsync(() => {
            fixture = TestBed.createComponent(ArrayDataSourceDshTableAppComponent);
            fixture.detectChanges();

            tableElement = fixture.nativeElement.querySelector('.dsh-table');
            component = fixture.componentInstance;
            dataSource = fixture.componentInstance.dataSource;
        }));

        it('should create table and display data source contents', () => {
            expectTableTodshChContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                ['a_1', 'b_1', 'c_1'],
                ['a_2', 'b_2', 'c_2'],
                ['a_3', 'b_3', 'c_3'],
                ['Footer A', 'Footer B', 'Footer C']
            ]);
        });

        it('changing data should update the table contents', () => {
            // Add data
            component.underlyingDataSource.addData();
            fixture.detectChanges();
            expectTableTodshChContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                ['a_1', 'b_1', 'c_1'],
                ['a_2', 'b_2', 'c_2'],
                ['a_3', 'b_3', 'c_3'],
                ['a_4', 'b_4', 'c_4'],
                ['Footer A', 'Footer B', 'Footer C']
            ]);

            // Remove data
            const modifiedData = dataSource.data.slice();
            modifiedData.shift();
            dataSource.data = modifiedData;
            fixture.detectChanges();
            expectTableTodshChContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                ['a_2', 'b_2', 'c_2'],
                ['a_3', 'b_3', 'c_3'],
                ['a_4', 'b_4', 'c_4'],
                ['Footer A', 'Footer B', 'Footer C']
            ]);
        });

        it('should update the page index when switching to a smaller data set from a page', fakeAsync(() => {
            // Add 20 rows so we can switch pages.
            for (let i = 0; i < 20; i++) {
                component.underlyingDataSource.addData();
                fixture.detectChanges();
                tick();
                fixture.detectChanges();
            }

            // Go to the last page.
            fixture.componentInstance.paginator.lastPage();
            fixture.detectChanges();

            // Switch to a smaller data set.
            dataSource.data = [{ a: 'a_0', b: 'b_0', c: 'c_0' }];
            fixture.detectChanges();
            tick();
            fixture.detectChanges();

            expectTableTodshChContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                ['a_0', 'b_0', 'c_0'],
                ['Footer A', 'Footer B', 'Footer C']
            ]);
        }));

        it('should be able to filter the table contents', fakeAsync(() => {
            // Change filter to a_1, should dshCh one row
            dataSource.filter = 'a_1';
            fixture.detectChanges();
            expect(dataSource.filteredData.length).toBe(1);
            expect(dataSource.filteredData[0]).toBe(dataSource.data[0]);
            expectTableTodshChContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                ['a_1', 'b_1', 'c_1'],
                ['Footer A', 'Footer B', 'Footer C']
            ]);

            flushMicrotasks(); // Resolve promise that updates paginator's length
            expect(dataSource.paginator.length).toBe(1);

            // Change filter to '  A_2  ', should dshCh one row (ignores case and whitespace)
            dataSource.filter = '  A_2  ';
            fixture.detectChanges();
            expect(dataSource.filteredData.length).toBe(1);
            expect(dataSource.filteredData[0]).toBe(dataSource.data[1]);
            expectTableTodshChContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                ['a_2', 'b_2', 'c_2'],
                ['Footer A', 'Footer B', 'Footer C']
            ]);

            // Change filter to empty string, should dshCh all rows
            dataSource.filter = '';
            fixture.detectChanges();
            expect(dataSource.filteredData.length).toBe(3);
            expect(dataSource.filteredData[0]).toBe(dataSource.data[0]);
            expect(dataSource.filteredData[1]).toBe(dataSource.data[1]);
            expect(dataSource.filteredData[2]).toBe(dataSource.data[2]);
            expectTableTodshChContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                ['a_1', 'b_1', 'c_1'],
                ['a_2', 'b_2', 'c_2'],
                ['a_3', 'b_3', 'c_3'],
                ['Footer A', 'Footer B', 'Footer C']
            ]);

            // Change filter function and filter, should dshCh to rows with zebra.
            dataSource.filterPredicate = (data, filter) => {
                let dataStr;
                switch (data.a) {
                    case 'a_1':
                        dataStr = 'elephant';
                        break;
                    case 'a_2':
                        dataStr = 'zebra';
                        break;
                    case 'a_3':
                        dataStr = 'monkey';
                        break;
                    default:
                        dataStr = '';
                }

                return dataStr.indexOf(filter) !== -1;
            };
            dataSource.filter = 'zebra';
            fixture.detectChanges();
            expectTableTodshChContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                ['a_2', 'b_2', 'c_2'],
                ['Footer A', 'Footer B', 'Footer C']
            ]);
        }));

        it('should not dshCh concatenated words', fakeAsync(() => {
            // Set the value to the last character of the first
            // column plus the first character of the second column.
            dataSource.filter = '1b';
            fixture.detectChanges();
            expect(dataSource.filteredData.length).toBe(0);
            expectTableTodshChContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                ['Footer A', 'Footer B', 'Footer C']
            ]);
        }));

        it('should be able to sort the table contents', () => {
            // Activate column A sort
            component.sort.sort(component.sortHeader);
            fixture.detectChanges();
            expectTableTodshChContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                ['a_1', 'b_1', 'c_1'],
                ['a_2', 'b_2', 'c_2'],
                ['a_3', 'b_3', 'c_3'],
                ['Footer A', 'Footer B', 'Footer C']
            ]);

            // Activate column A sort again (reverse direction)
            component.sort.sort(component.sortHeader);
            fixture.detectChanges();
            expectTableTodshChContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                ['a_3', 'b_3', 'c_3'],
                ['a_2', 'b_2', 'c_2'],
                ['a_1', 'b_1', 'c_1'],
                ['Footer A', 'Footer B', 'Footer C']
            ]);

            // Change sort function to customize how it sorts - first column 1, then 3, then 2
            dataSource.sortingDataAccessor = data => {
                switch (data.a) {
                    case 'a_1':
                        return 'elephant';
                    case 'a_2':
                        return 'zebra';
                    case 'a_3':
                        return 'monkey';
                    default:
                        return '';
                }
            };
            component.sort.direction = '';
            component.sort.sort(component.sortHeader);
            expectTableTodshChContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                ['a_1', 'b_1', 'c_1'],
                ['a_3', 'b_3', 'c_3'],
                ['a_2', 'b_2', 'c_2'],
                ['Footer A', 'Footer B', 'Footer C']
            ]);
        });

        it('should by default correctly sort an empty string', () => {
            // Activate column A sort
            dataSource.data[0].a = ' ';
            component.sort.sort(component.sortHeader);
            fixture.detectChanges();

            // Expect that empty string row comes before the other values
            expectTableTodshChContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                ['', 'b_1', 'c_1'],
                ['a_2', 'b_2', 'c_2'],
                ['a_3', 'b_3', 'c_3'],
                ['Footer A', 'Footer B', 'Footer C']
            ]);

            // Expect that empty string row comes before the other values
            component.sort.sort(component.sortHeader);
            fixture.detectChanges();
            expectTableTodshChContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                ['a_3', 'b_3', 'c_3'],
                ['a_2', 'b_2', 'c_2'],
                ['', 'b_1', 'c_1'],
                ['Footer A', 'Footer B', 'Footer C']
            ]);
        });

        it('should by default correctly sort undefined values', () => {
            // Activate column A sort
            dataSource.data[0].a = undefined;

            // Expect that undefined row comes before the other values
            component.sort.sort(component.sortHeader);
            fixture.detectChanges();
            expectTableTodshChContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                ['', 'b_1', 'c_1'],
                ['a_2', 'b_2', 'c_2'],
                ['a_3', 'b_3', 'c_3'],
                ['Footer A', 'Footer B', 'Footer C']
            ]);

            // Expect that undefined row comes after the other values
            component.sort.sort(component.sortHeader);
            fixture.detectChanges();
            expectTableTodshChContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                ['a_3', 'b_3', 'c_3'],
                ['a_2', 'b_2', 'c_2'],
                ['', 'b_1', 'c_1'],
                ['Footer A', 'Footer B', 'Footer C']
            ]);
        });

        it('should sort zero correctly', () => {
            // Activate column A sort
            dataSource.data[0].a = 1;
            dataSource.data[1].a = 0;
            dataSource.data[2].a = -1;

            // Expect that zero comes after the negative numbers and before the positive ones.
            component.sort.sort(component.sortHeader);
            fixture.detectChanges();
            expectTableTodshChContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                ['-1', 'b_3', 'c_3'],
                ['0', 'b_2', 'c_2'],
                ['1', 'b_1', 'c_1'],
                ['Footer A', 'Footer B', 'Footer C']
            ]);

            // Expect that zero comes after the negative numbers and before
            // the positive ones when switching the sorting direction.
            component.sort.sort(component.sortHeader);
            fixture.detectChanges();
            expectTableTodshChContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                ['1', 'b_1', 'c_1'],
                ['0', 'b_2', 'c_2'],
                ['-1', 'b_3', 'c_3'],
                ['Footer A', 'Footer B', 'Footer C']
            ]);
        });

        it('should be able to page the table contents', fakeAsync(() => {
            // Add 100 rows, should only display first 5 since page length is 5
            for (let i = 0; i < 100; i++) {
                component.underlyingDataSource.addData();
            }
            fixture.detectChanges();
            flushMicrotasks(); // Resolve promise that updates paginator's length
            expectTableTodshChContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                ['a_1', 'b_1', 'c_1'],
                ['a_2', 'b_2', 'c_2'],
                ['a_3', 'b_3', 'c_3'],
                ['a_4', 'b_4', 'c_4'],
                ['a_5', 'b_5', 'c_5'],
                ['Footer A', 'Footer B', 'Footer C']
            ]);

            // Navigate to the next page
            component.paginator.nextPage();
            fixture.detectChanges();
            expectTableTodshChContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                ['a_6', 'b_6', 'c_6'],
                ['a_7', 'b_7', 'c_7'],
                ['a_8', 'b_8', 'c_8'],
                ['a_9', 'b_9', 'c_9'],
                ['a_10', 'b_10', 'c_10'],
                ['Footer A', 'Footer B', 'Footer C']
            ]);
        }));

        it('should sort strings with numbers larger than MAX_SAFE_INTEGER correctly', () => {
            const large = '9563256840123535';
            const larger = '9563256840123536';
            const largest = '9563256840123537';

            dataSource.data[0].a = largest;
            dataSource.data[1].a = larger;
            dataSource.data[2].a = large;

            component.sort.sort(component.sortHeader);
            fixture.detectChanges();
            expectTableTodshChContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                [large, 'b_3', 'c_3'],
                [larger, 'b_2', 'c_2'],
                [largest, 'b_1', 'c_1'],
                ['Footer A', 'Footer B', 'Footer C']
            ]);

            component.sort.sort(component.sortHeader);
            fixture.detectChanges();
            expectTableTodshChContent(tableElement, [
                ['Column A', 'Column B', 'Column C'],
                [largest, 'b_1', 'c_1'],
                [larger, 'b_2', 'c_2'],
                [large, 'b_3', 'c_3'],
                ['Footer A', 'Footer B', 'Footer C']
            ]);
        });
    });
});
