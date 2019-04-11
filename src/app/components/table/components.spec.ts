import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DshTableComponent } from './table';
import { MatPaginator, MatSort, MatSortHeader, MatTableDataSource } from '@angular/material';

export interface TestData {
    a: string | number | undefined;
    b: string | number | undefined;
    c: string | number | undefined;
}

class FakeDataSource extends DataSource<TestData> {
    _dataChange = new BehaviorSubject<TestData[]>([]);

    get data() {
        return this._dataChange.getValue();
    }

    set data(data: TestData[]) {
        this._dataChange.next(data);
    }

    constructor() {
        super();
        for (let i = 0; i < 4; i++) {
            this.addData();
        }
    }

    connect(): Observable<TestData[]> {
        return this._dataChange;
    }

    disconnect() {}

    addData() {
        const nextIndex = this.data.length + 1;

        const copiedData = this.data.slice();
        copiedData.push({
            a: `a_${nextIndex}`,
            b: `b_${nextIndex}`,
            c: `c_${nextIndex}`
        });

        this.data = copiedData;
    }
}

@Component({
    template: `
        <dsh-table [dataSource]="dataSource">
            <ng-container dshColumnDef="column_a">
                <th dshHeaderCell *dshHeaderCellDef>Column A</th>
                <td dshCell *dshCellDef="let row">{{ row.a }}</td>
                <td dshFooterCell *dshFooterCellDef>Footer A</td>
            </ng-container>

            <ng-container dshColumnDef="column_b">
                <th dshHeaderCell *dshHeaderCellDef>Column B</th>
                <td dshCell *dshCellDef="let row">{{ row.b }}</td>
                <td dshFooterCell *dshFooterCellDef>Footer B</td>
            </ng-container>

            <ng-container dshColumnDef="column_c">
                <th dshHeaderCell *dshHeaderCellDef>Column C</th>
                <td dshCell *dshCellDef="let row">{{ row.c }}</td>
                <td dshFooterCell *dshFooterCellDef>Footer C</td>
            </ng-container>

            <ng-container dshColumnDef="special_column">
                <td dshCell *dshCellDef="let row">fourth_row</td>
            </ng-container>

            <tr dsh-header-row *dshHeaderRowDef="columnsToRender"></tr>
            <tr dsh-row *dshRowDef="let row; columns: columnsToRender"></tr>
            <tr dsh-row *dshRowDef="let row; columns: ['special_column']; when: isFourthRow"></tr>
            <tr dsh-footer-row *dshFooterRowDef="columnsToRender"></tr>
        </dsh-table>
    `
})
export class DshTableAppComponent {
    @ViewChild(DshTableComponent, { static: true }) table: DshTableComponent<TestData>;

    dataSource: FakeDataSource | null = new FakeDataSource();
    columnsToRender = ['column_a', 'column_b', 'column_c'];
    isFourthRow = (i: number, _rowData: TestData) => i === 3;
}

@Component({
    template: `
        <table dshTable [dataSource]="dataSource">
            <ng-container dshColumnDef="column_a">
                <th th dshHeaderCell *dshHeaderCellDef>Column A</th>
                <td td dshCell *dshCellDef="let row">{{ row.a }}</td>
            </ng-container>

            <ng-container dshColumnDef="column_b">
                <th th dshHeaderCell *dshHeaderCellDef>Column B</th>
                <td td dshCell *dshCellDef="let row">{{ row.b }}</td>
            </ng-container>

            <ng-container dshColumnDef="column_c">
                <th th dshHeaderCell *dshHeaderCellDef>Column C</th>
                <td td dshCell *dshCellDef="let row">{{ row.c }}</td>
            </ng-container>

            <tr tr dsh-header-row *dshHeaderRowDef="columnsToRender"></tr>
            <tr tr dsh-row *dshRowDef="let row; columns: columnsToRender"></tr>
        </table>
    `
})
export class NativeHtmlTableAppComponent {
    @ViewChild(DshTableComponent, { static: true }) table: DshTableComponent<TestData>;

    dataSource: FakeDataSource | null = new FakeDataSource();
    columnsToRender = ['column_a', 'column_b', 'column_c'];
}

@Component({
    template: `
        <table dshTable [dataSource]="dataSource">
            <ng-container dshColumnDef="column_a">
                <th th dshHeaderCell *dshHeaderCellDef>Column A</th>
                <td td dshCell *dshCellDef="let row">{{ row.a }}</td>
            </ng-container>

            <tr tr dsh-header-row *dshHeaderRowDef="columnsToRender; sticky: true"></tr>
            <tr tr dsh-row *dshRowDef="let row; columns: columnsToRender"></tr>
        </table>
    `
})
export class StickyTableAppComponent {
    @ViewChild(DshTableComponent, { static: true }) table: DshTableComponent<TestData>;

    dataSource = new FakeDataSource();
    columnsToRender = ['column_a'];
}

@Component({
    template: `
        <dsh-table [dataSource]="dataSource" [multiTemplateDataRows]="multiTemplateDataRows">
            <ng-container dshColumnDef="column_a">
                <th dshHeaderCell *dshHeaderCellDef>Column A</th>
                <td dshCell *dshCellDef="let row">{{ row.a }}</td>
                <td dshFooterCell *dshFooterCellDef>Footer A</td>
            </ng-container>

            <ng-container dshColumnDef="special_column">
                <td dshCell *dshCellDef="let row">fourth_row</td>
            </ng-container>

            <tr dsh-header-row *dshHeaderRowDef="['column_a']"></tr>
            <tr dsh-row *dshRowDef="let row; columns: ['column_a']"></tr>
            <tr dsh-row *dshRowDef="let row; columns: ['special_column']; when: isFourthRow"></tr>
            <tr dsh-footer-row *dshFooterRowDef="['column_a']"></tr>
        </dsh-table>
    `
})
export class DshTableWithWhenRowAppComponent {
    @ViewChild(DshTableComponent) table: DshTableComponent<TestData>;

    multiTemplateDataRows = false;
    dataSource: FakeDataSource | null = new FakeDataSource();
    isFourthRow = (i: number, _rowData: TestData) => i === 3;
}

@Component({
    template: `
        <dsh-table [dataSource]="dataSource" matSort>
            <ng-container dshColumnDef="column_a">
                <th dshHeaderCell *dshHeaderCellDef dsh-sort-header="a">Column A</th>
                <td dshCell *dshCellDef="let row">{{ row.a }}</td>
                <td dshFooterCell *dshFooterCellDef>Footer A</td>
            </ng-container>

            <ng-container dshColumnDef="column_b">
                <th dshHeaderCell *dshHeaderCellDef>Column B</th>
                <td dshCell *dshCellDef="let row">{{ row.b }}</td>
                <td dshFooterCell *dshFooterCellDef>Footer B</td>
            </ng-container>

            <ng-container dshColumnDef="column_c">
                <th dshHeaderCell *dshHeaderCellDef>Column C</th>
                <td dshCell *dshCellDef="let row">{{ row.c }}</td>
                <td dshFooterCell *dshFooterCellDef>Footer C</td>
            </ng-container>

            <tr dsh-header-row *dshHeaderRowDef="columnsToRender"></tr>
            <tr dsh-row *dshRowDef="let row; columns: columnsToRender"></tr>
            <tr dsh-footer-row *dshFooterRowDef="columnsToRender"></tr>
        </dsh-table>

        <mat-paginator [pageSize]="5"></mat-paginator>
    `
})
export class ArrayDataSourceDshTableAppComponent implements AfterViewInit {
    @ViewChild(DshTableComponent, { static: true }) table: DshTableComponent<TestData>;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatSortHeader) sortHeader: MatSortHeader;

    underlyingDataSource = new FakeDataSource();
    dataSource = new MatTableDataSource<TestData>();
    columnsToRender = ['column_a', 'column_b', 'column_c'];

    constructor() {
        this.underlyingDataSource.data = [];

        // Add three rows of data
        this.underlyingDataSource.addData();
        this.underlyingDataSource.addData();
        this.underlyingDataSource.addData();

        this.underlyingDataSource.connect().subscribe(data => {
            this.dataSource.data = data;
        });
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }
}

@Component({
    template: `
        <dsh-table [dataSource]="dataSource" matSort>
            <ng-container dshColumnDef="column_a">
                <th dshHeaderCell *dshHeaderCellDef dsh-sort-header="a">Column A</th>
                <td dshCell *dshCellDef="let row">{{ row.a }}</td>
            </ng-container>

            <ng-container dshColumnDef="column_b">
                <th dshHeaderCell *dshHeaderCellDef>Column B</th>
                <td dshCell *dshCellDef="let row">{{ row.b }}</td>
            </ng-container>

            <ng-container dshColumnDef="column_c">
                <th dshHeaderCell *dshHeaderCellDef>Column C</th>
                <td dshCell *dshCellDef="let row">{{ row.c }}</td>
            </ng-container>

            <tr dsh-header-row *dshHeaderRowDef="columnsToRender"></tr>
            <tr dsh-row *dshRowDef="let row; columns: columnsToRender"></tr>
        </dsh-table>
    `
})
export class DshTableWithSortAppComponent implements OnInit {
    @ViewChild(DshTableComponent, { static: true }) table: DshTableComponent<TestData>;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    underlyingDataSource = new FakeDataSource();
    dataSource = new MatTableDataSource<TestData>();
    columnsToRender = ['column_a', 'column_b', 'column_c'];

    constructor() {
        this.underlyingDataSource.data = [];

        // Add three rows of data
        this.underlyingDataSource.addData();
        this.underlyingDataSource.addData();
        this.underlyingDataSource.addData();

        this.underlyingDataSource.connect().subscribe(data => {
            this.dataSource.data = data;
        });
    }

    ngOnInit() {
        this.dataSource!.sort = this.sort;
    }
}

@Component({
    template: `
        <dsh-table [dataSource]="dataSource">
            <ng-container dshColumnDef="column_a">
                <th dshHeaderCell *dshHeaderCellDef>Column A</th>
                <td dshCell *dshCellDef="let row">{{ row.a }}</td>
            </ng-container>

            <ng-container dshColumnDef="column_b">
                <th dshHeaderCell *dshHeaderCellDef>Column B</th>
                <td dshCell *dshCellDef="let row">{{ row.b }}</td>
            </ng-container>

            <ng-container dshColumnDef="column_c">
                <th dshHeaderCell *dshHeaderCellDef>Column C</th>
                <td dshCell *dshCellDef="let row">{{ row.c }}</td>
            </ng-container>

            <tr dsh-header-row *dshHeaderRowDef="columnsToRender"></tr>
            <tr dsh-row *dshRowDef="let row; columns: columnsToRender"></tr>
        </dsh-table>

        <mat-paginator [pageSize]="5"></mat-paginator>
    `
})
export class DshTableWithPaginatorAppComponent implements OnInit {
    @ViewChild(DshTableComponent, { static: true }) table: DshTableComponent<TestData>;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    underlyingDataSource = new FakeDataSource();
    dataSource = new MatTableDataSource<TestData>();
    columnsToRender = ['column_a', 'column_b', 'column_c'];

    constructor() {
        this.underlyingDataSource.data = [];

        // Add three rows of data
        this.underlyingDataSource.addData();
        this.underlyingDataSource.addData();
        this.underlyingDataSource.addData();

        this.underlyingDataSource.connect().subscribe(data => {
            this.dataSource.data = data;
        });
    }

    ngOnInit() {
        this.dataSource!.paginator = this.paginator;
    }
}

@Component({
    template: `
        <dsh-table [dataSource]="dataSource">
            <ng-container dshColumnDef="column_a">
                <th dshHeaderCell *dshHeaderCellDef>Column A</th>
                <td dshCell *dshCellDef="let row">{{ row.a }}</td>
            </ng-container>

            <tr dsh-header-row *dshHeaderRowDef="columnsToRender"></tr>
            <ng-container *dshRowDef="let row; columns: columnsToRender"> <tr dsh-row></tr> </ng-container>
        </dsh-table>
    `
})
export class TableWithNgContainerRowComponent {
    dataSource: FakeDataSource | null = new FakeDataSource();
    columnsToRender = ['column_a'];
}
