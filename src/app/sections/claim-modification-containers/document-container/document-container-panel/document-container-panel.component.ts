import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'dsh-document-container-panel',
    templateUrl: 'document-container-panel.component.html',
    styleUrls: ['document-container-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentContainerPanelComponent {
    @Input() title: string;

    opened = false;
}
