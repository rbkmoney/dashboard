import { toTimelineItemInfo } from './to-timeline-item-info';

describe('toTimelineItemInfo', () => {
    beforeEach(() => {
        spyOn(console, 'error');
    });

    it('empty modifications', () => {
        expect(toTimelineItemInfo([])).toBeUndefined();
    });

    it('not specific ClaimModification modification', () => {
        const timelineItemInfo = toTimelineItemInfo([
            {
                modificationID: 1,
                createdAt: ('01-01-2019' as any) as Date,
                modification: {
                    modificationType: 'ClaimModification',
                    modification: {}
                }
            }
        ]);
        expect(console.error).toHaveBeenCalled();
        expect(timelineItemInfo).toBeUndefined();
    });
});
