import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTab } from '@angular/material';

@Component({
    selector: 'dsh-tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TabComponent {
    @Input() label: string;

    @ViewChild(MatTab)
    public matTab: MatTab;
}
