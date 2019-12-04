import { Pipe, PipeTransform } from '@angular/core';

import { TimelineAction } from './to-timeline-info';
import { StatusColor } from '../../../theme-manager';

@Pipe({
    name: 'actionColor'
})
export class ActionColorPipe implements PipeTransform {
    transform(action: TimelineAction): StatusColor | null {
        switch (action) {
            case TimelineAction.statusAccepted:
                return StatusColor.success;
            case TimelineAction.statusDenied:
            case TimelineAction.statusRevoked:
                return StatusColor.warn;
        }
        return null;
    }
}
