import { Pipe, PipeTransform } from '@angular/core';

import { Author } from './to-timeline-info';
import { LocaleDictionaryService } from '../../../locale';

@Pipe({ name: 'timelineItemAuthorName' })
export class TimelineItemAuthorNamePipe implements PipeTransform {
    constructor(private localeDictionaryService: LocaleDictionaryService) {}

    transform(value: Author): string {
        return this.localeDictionaryService.mapDictionaryKey(this.getAuthorTitle(value));
    }

    getAuthorTitle(author: Author): string {
        const authorTitle = Author[author];
        return authorTitle && `sections.claim.conversation.to-timeline-info.author.${authorTitle}`;
    }
}
