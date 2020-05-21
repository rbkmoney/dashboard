import { Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-company-detail-item',
    templateUrl: 'company-detail-item.component.html',
    styleUrls: ['company-detail-item.component.scss'],
})
export class CompanyDetailItemComponent {
    @Input() label: string;
    @Input() value: string;
}
