export const getOffsetBySelectedPanelPosition = (idx: number, limit: number): number => {
    if (idx === -1) {
        return limit;
    }
    return Math.ceil((idx + 1) / limit) * limit;
};
