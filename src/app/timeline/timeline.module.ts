import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';

import { TimelineComponent } from './timeline.component';
import { TimelineItemComponent } from './timeline-item';
import { TimelineItemTitleComponent } from './timeline-item/timeline-item-title';
import { TimelineItemBadgeComponent } from './timeline-item/timeline-item-badge';
import { TimelineItemContentComponent } from './timeline-item/timeline-item-content';

@NgModule({
    imports: [FlexLayoutModule, CommonModule],
    declarations: [
        TimelineComponent,
        TimelineItemComponent,
        TimelineItemTitleComponent,
        TimelineItemBadgeComponent,
        TimelineItemContentComponent
    ],
    exports: [
        TimelineComponent,
        TimelineItemComponent,
        TimelineItemTitleComponent,
        TimelineItemBadgeComponent,
        TimelineItemContentComponent
    ]
})
export class TimelineModule {}
