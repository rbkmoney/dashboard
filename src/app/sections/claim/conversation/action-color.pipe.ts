import { Pipe, PipeTransform } from '@angular/core';

import { StatusColor } from '../../../theme-manager';
import { TimelineAction } from './to-timeline-info';

@Pipe({
    name: 'actionColor',
})
export class ActionColorPipe implements PipeTransform {
    transform(action: TimelineAction): StatusColor | null {
        switch (action) {
            case TimelineAction.StatusAccepted:
                return StatusColor.success;
            case TimelineAction.StatusDenied:
            case TimelineAction.StatusRevoked:
                return StatusColor.warn;
        }
        return null;
    }
}
