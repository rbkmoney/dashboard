import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'dsh-panel-content',
    template: `<ng-content></ng-content>`,
})
export class PanelContentComponent {
    @HostBinding('class.dsh-panel-content') class = true;
}

@Component({
    selector: 'dsh-panel-header-icon',
    template: ` <dsh-bi class="dsh-panel-header-icon" [icon]="icon"></dsh-bi> `,
})
export class PanelHeaderIconComponent {
    @Input() icon: string;
}

@Component({
    selector: 'dsh-panel-header',
    template: `
        <div class="dsh-panel-header-content">
            <ng-content></ng-content>
        </div>
    `,
})
export class PanelHeaderComponent {
    @HostBinding('class.dsh-panel-header') class = true;
}

@Component({
    selector: 'dsh-panel',
    templateUrl: 'panel.component.html',
    styleUrls: ['panel.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelComponent {
    @Input() color: 'primary' | 'accent';
}
