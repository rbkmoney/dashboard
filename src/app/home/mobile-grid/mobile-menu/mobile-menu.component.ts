import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { SectionsLinksService, SectionLink } from '@dsh/app/shared/services/sections-links';

@Component({
    selector: 'dsh-mobile-menu',
    templateUrl: './mobile-menu.component.html',
    styleUrls: ['./mobile-menu.component.scss'],
})
export class MobileMenuComponent {
    @Output() menuItemSelected: EventEmitter<void> = new EventEmitter<void>();

    sectionLinks$: Observable<SectionLink[]> = this.sectionsLinksService.sectionLinks$;

    constructor(private sectionsLinksService: SectionsLinksService) {}
}
