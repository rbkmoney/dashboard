import { toTimelineInfo } from './to-timeline-info';
import { DocumentModificationUnit } from '../../../../api-codegen/claim-management';
import { SpecificModificationUnit } from '../../../../api/claims/utils';
import { Author } from './author';
import { TimelineAction } from './timeline-action';
import { TimelineItemInfo } from './timeline-item-info';

describe('toTimelineInfo', () => {
    function createModificationUnit(
        createdAt: string
    ): [SpecificModificationUnit<DocumentModificationUnit>, TimelineItemInfo] {
        return [
            {
                modificationID: 1,
                createdAt: createdAt as any,
                modification: {
                    modificationType: 'ClaimModification',
                    claimModificationType: 'DocumentModificationUnit',
                    id: '1',
                    modification: {
                        documentModificationType: 'DocumentCreated'
                    }
                }
            },
            {
                action: TimelineAction.claimCreated,
                author: Author.manager,
                createdAt,
                color: undefined
            }
        ];
    }

    it('empty array should return empty array', () => {
        expect(toTimelineInfo([])).toEqual([]);
    });

    it('should be sorted', () => {
        const [oldestUnit, oldestExpected] = createModificationUnit('2018-08-08T10:30:30Z');
        const [oldUnit, oldExpected] = createModificationUnit('2019-08-08T10:00:30Z');
        const [newestUnit, newestExpected] = createModificationUnit('2019-08-08T10:30:30Z');
        expect(toTimelineInfo([newestUnit, oldestUnit, oldUnit])).toEqual([
            oldestExpected,
            oldExpected,
            newestExpected
        ]);
    });
});
