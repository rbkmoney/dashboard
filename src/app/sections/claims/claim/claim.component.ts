import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'dsh-claim',
    templateUrl: 'claim.component.html',
    styleUrls: ['claim.component.scss']
})
export class ClaimComponent implements OnInit {
    id: number;

    links = [
        {
            path: '',
            label: 'sections.claim.conversation.label'
        },
        {
            path: 'changes',
            label: 'sections.claim.changes.label'
        },
        {
            path: 'documents',
            label: 'sections.claim.documents.label'
        }
    ];

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.id = parseInt(params.get('id'), 10);
        });
    }
}
