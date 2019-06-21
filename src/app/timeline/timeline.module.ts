import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';

import { TimelineComponent } from './timeline.component';
import { TimelineItemComponent } from './timeline-item';
import { TimelineItemTitleComponent } from './timeline-item/timeline-item-title.component';
import { TimelineItemBadgeComponent } from './timeline-item/timeline-item-badge.component';

@NgModule({
    imports: [FlexLayoutModule, CommonModule],
    declarations: [TimelineComponent, TimelineItemComponent, TimelineItemTitleComponent, TimelineItemBadgeComponent],
    exports: [TimelineComponent, TimelineItemComponent, TimelineItemTitleComponent, TimelineItemBadgeComponent]
})
export class TimelineModule {}
