import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { SectionsLinksService, SectionLink } from '@dsh/app/shared/services/sections-links';

import { NavigationFlatNode } from '../types/navigation-flat-node';

@Component({
    selector: 'dsh-mobile-menu',
    templateUrl: './mobile-menu.component.html',
    styleUrls: ['./mobile-menu.component.scss'],
})
export class MobileMenuComponent {
    @Input() menu: NavigationFlatNode[];
    @Input() activeId: string;

    @Output() navigationChanged = new EventEmitter<void>();

    sectionLinks$: Observable<SectionLink[]> = this.sectionsLinksService.sectionLinks$;

    constructor(private sectionsLinksService: SectionsLinksService) {}

    navigated(): void {
        this.navigationChanged.emit();
    }
}
