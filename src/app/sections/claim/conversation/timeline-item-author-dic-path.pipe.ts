import { Pipe, PipeTransform } from '@angular/core';

import { Author } from './to-timeline-info';

@Pipe({ name: 'timelineItemAuthorDicPath' })
export class TimelineItemAuthorDicPathPipe implements PipeTransform {
    transform(value: Author): string {
        const authorTitleDicPathPart = Author[value];
        return (
            authorTitleDicPathPart && `sections.claim.conversation.to-timeline-info.author.${authorTitleDicPathPart}`
        );
    }
}
