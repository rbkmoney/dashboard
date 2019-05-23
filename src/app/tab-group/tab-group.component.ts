import { AfterViewInit, Component, ContentChildren, QueryList, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material';
import { TabComponent } from './tab/tab.component';



@Component({
    selector: 'dsh-tab-group',
    templateUrl: './tab-group.component.html',
    styleUrls: ['./tab-group.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TabGroupComponent implements AfterViewInit {
    @ViewChild(MatTabGroup)
    public tabGroup: MatTabGroup;

    @ContentChildren(TabComponent)
    protected tabs: QueryList<TabComponent>;

    public ngAfterViewInit() {
        const matTabsFromQueryList = this.tabs.map((tab) => tab.matTab);
        const list = new QueryList<MatTab>();
        list.reset([matTabsFromQueryList]);
        this.tabGroup._tabs = list;
        this.tabGroup.ngAfterContentInit();
    }
}
